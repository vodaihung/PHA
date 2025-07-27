# Thangs API Integration Guide for Next.js

## Overview

This guide provides comprehensive documentation for integrating Thangs Delegated API Access into a Next.js application. Based on actual API testing and findings not covered in the official documentation.

## API Configuration

### Base Configuration
```javascript
const THANGS_API_CONFIG = {
  baseUrl: 'https://production-api.thangs.com',
  apiKey: process.env.THANGS_API_KEY, // Your API key from Thangs team
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
```

### Environment Variables (.env.local)
```bash
THANGS_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Endpoints

### 1. Get Plans
**Purpose**: Retrieve all plans configured for your account. Can be cached as it changes infrequently.

**Endpoint**: `GET /public/plans`

**Response Structure** (corrected from documentation):
```json
{
  "plans": [
    {
      "id": 689,
      "name": "Multi Partner",
      "description": "- Get a **commercial license**...",
      "monthlyPrice": 42,
      "annualPrice": 418.32,
      "published": true,
      "type": "download",
      "downloadLimit": null,
      "allowsCommercialReuse": true,
      "memberLimit": null
    }
  ]
}
```

**Next.js API Route** (`/app/api/thangs/plans/route.ts`):
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.THANGS_API_BASE_URL}/public/plans`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.THANGS_API_KEY}`
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch plans' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Cache for 1 hour
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 2. Initiate Authorization
**Purpose**: Start the OAuth-like flow to get user authorization.

**Endpoint**: `POST /public/auth/initiate`

**Response Structure**:
```json
{
  "authenticateUrl": "https://thangs.com/profile/client-access-grant?verifierCode=...",
  "verifierCode": "very_long_json_encoded_string"
}
```

**Important Findings**:
- The `verifierCode` is a long JSON-encoded string, not a simple token
- The `authenticateUrl` includes `appName` parameter (e.g., `appName=Multiboard`)
- Each verifier code must be associated with only one user in your system

**Next.js API Route** (`/app/api/thangs/auth/initiate/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { redis } from '@/lib/redis'; // Or your preferred session store

export async function POST(request: NextRequest) {
  try {
    // Get current user session
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${process.env.THANGS_API_BASE_URL}/public/auth/initiate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.THANGS_API_KEY}`
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to initiate auth' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Store verifier code associated with user
    await redis.setex(
      `thangs:verifier:${data.verifierCode}`,
      3600, // 1 hour TTL
      JSON.stringify({
        userId: session.user.id,
        createdAt: new Date().toISOString()
      })
    );

    return NextResponse.json({
      authenticateUrl: data.authenticateUrl,
      verifierCode: data.verifierCode
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3. Verify Authorization & Get User Token
**Purpose**: Check if user has authorized and retrieve their access token.

**Endpoint**: `GET /public/auth/access-grant/{verifierCode}/check`

**Response Codes**:
- `200`: User has authorized - returns `userToken`
- `404`: User has not yet authorized (expected initially)
- `401`: Invalid API key

**Next.js API Route** (`/app/api/thangs/auth/verify/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { redis } from '@/lib/redis';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { verifierCode } = await request.json();
    
    // Verify this verifier code belongs to this user
    const storedData = await redis.get(`thangs:verifier:${verifierCode}`);
    if (!storedData) {
      return NextResponse.json({ error: 'Invalid verifier code' }, { status: 400 });
    }
    
    const { userId } = JSON.parse(storedData);
    if (userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.THANGS_API_BASE_URL}/public/auth/access-grant/${verifierCode}/check`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.THANGS_API_KEY}`
        }
      }
    );

    if (response.status === 404) {
      return NextResponse.json({ status: 'pending' }, { status: 202 });
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to verify authorization' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Store user token securely
    await db.user.update({
      where: { id: session.user.id },
      data: {
        thangsUserToken: data.userToken,
        thangsTokenCreatedAt: new Date()
      }
    });
    
    // Clean up verifier code
    await redis.del(`thangs:verifier:${verifierCode}`);

    return NextResponse.json({ status: 'authorized' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 4. Get User Memberships
**Purpose**: Retrieve user's plan subscriptions.

**Endpoint**: `GET /public/user/memberships`

**Headers Required**:
- `Authorization: Bearer {api-key}`
- `x-thangs-user-token: {user-token}`

**Response Codes**:
- `200`: Success - returns array of memberships
- `403`: Invalid or missing user token
- `401`: Invalid API key

**Next.js API Route** (`/app/api/thangs/memberships/route.ts`):
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's Thangs token
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { thangsUserToken: true }
    });

    if (!user?.thangsUserToken) {
      return NextResponse.json(
        { error: 'Thangs authorization required' },
        { status: 403 }
      );
    }

    const response = await fetch(`${process.env.THANGS_API_BASE_URL}/public/user/memberships`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.THANGS_API_KEY}`,
        'x-thangs-user-token': user.thangsUserToken
      }
    });

    if (response.status === 403) {
      // Token expired or invalid - clear it
      await db.user.update({
        where: { id: session.user.id },
        data: { thangsUserToken: null }
      });
      
      return NextResponse.json(
        { error: 'Thangs token expired, please re-authorize' },
        { status: 403 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch memberships' },
        { status: response.status }
      );
    }

    const memberships = await response.json();
    return NextResponse.json(memberships);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Client-Side Implementation

### Authorization Flow Component
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ThangsAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [verifierCode, setVerifierCode] = useState<string | null>(null);

  const initiateAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/thangs/auth/initiate', {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to initiate auth');
      
      const data = await response.json();
      setVerifierCode(data.verifierCode);
      
      // Open auth window
      const authWindow = window.open(
        data.authenticateUrl,
        'thangs-auth',
        'width=600,height=700'
      );
      
      // Poll for completion
      const checkInterval = setInterval(async () => {
        if (authWindow?.closed) {
          clearInterval(checkInterval);
          await checkAuthorization();
        }
      }, 1000);
      
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthorization = async () => {
    if (!verifierCode) return;
    
    try {
      const response = await fetch('/api/thangs/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verifierCode })
      });
      
      const data = await response.json();
      
      if (data.status === 'authorized') {
        // Refresh page or update UI
        window.location.reload();
      } else if (data.status === 'pending') {
        // Still waiting for user to authorize
        setTimeout(() => checkAuthorization(), 2000);
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <Button onClick={initiateAuth} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Connect Thangs Account
    </Button>
  );
}
```

### Display User Memberships
```typescript
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Membership {
  id: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number | null;
}

export function UserMemberships() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await fetch('/api/thangs/memberships');
      
      if (response.status === 403) {
        setError('Please connect your Thangs account');
        return;
      }
      
      if (!response.ok) throw new Error('Failed to fetch memberships');
      
      const data = await response.json();
      setMemberships(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load memberships');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (memberships.length === 0) return <div>No active memberships</div>;

  return (
    <div className="grid gap-4">
      {memberships.map((membership) => (
        <Card key={membership.id} className="p-4">
          <h3 className="font-semibold">{membership.name}</h3>
          <p className="text-sm text-gray-600">{membership.description}</p>
          <p className="mt-2">
            ${membership.monthlyPrice}/month
            {membership.annualPrice && ` or $${membership.annualPrice}/year`}
          </p>
        </Card>
      ))}
    </div>
  );
}
```

## Database Schema (Prisma)

```prisma
model User {
  id                   String    @id @default(cuid())
  email                String    @unique
  thangsUserToken      String?
  thangsTokenCreatedAt DateTime?
  // ... other fields
}
```

## Security Considerations

1. **API Key Protection**
   - Never expose API key to client-side code
   - Always make API calls from server-side routes
   - Use environment variables

2. **User Token Management**
   - Store tokens encrypted in database
   - Implement token refresh logic
   - Clear expired tokens automatically

3. **Rate Limiting**
   - Implement rate limiting on API routes
   - Cache plan data to reduce API calls

## Error Handling

### Common Error Scenarios

1. **401 Unauthorized**
   - Invalid or missing API key
   - Check environment variables

2. **403 Forbidden**
   - Invalid or expired user token
   - Prompt user to re-authorize

3. **404 Not Found**
   - Normal for auth verification before user authorizes
   - Implement polling mechanism

## Testing

### Test Utilities
```typescript
// test/thangs-api-mock.ts
export const mockThangsApi = {
  plans: {
    plans: [
      {
        id: 1,
        name: 'Test Plan',
        monthlyPrice: 10,
        published: true
      }
    ]
  },
  
  initAuth: {
    authenticateUrl: 'https://thangs.com/test-auth',
    verifierCode: 'test-verifier-code'
  },
  
  userToken: {
    userToken: 'test-user-token'
  }
};
```

## Deployment Checklist

- [ ] Set `THANGS_API_KEY` in production environment
- [ ] Configure CORS if needed
- [ ] Set up monitoring for API errors
- [ ] Implement proper error logging
- [ ] Test full auth flow in production
- [ ] Set up alerts for 403 errors (token expiration)

## Additional Notes

1. **Response Headers** (not in documentation):
   - `x-thangs-api-version`: Current API version
   - `x-response-time`: Server processing time
   - Error responses are plain text, not JSON

2. **Verifier Code Format**:
   - Very long JSON-encoded string
   - Contains encrypted content and tag
   - Must be stored temporarily during auth flow

3. **Token Lifetime**:
   - User tokens have "long lifetime" but not permanent
   - Implement refresh mechanism
   - Store token creation date for tracking

4. **Plan Caching**:
   - Plans change infrequently
   - Safe to cache for hours or days
   - Use plan IDs to match with user memberships