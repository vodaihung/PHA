// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://swenitnfwfrxxmyuqqma.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZW5pdG5md2ZyeHhteXVxcW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MjQzNjcsImV4cCI6MjA2NzEwMDM2N30.NeJVuf_60_OEs5Fh12kOIpW89kMdoS2YLmeySEp8Blk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});