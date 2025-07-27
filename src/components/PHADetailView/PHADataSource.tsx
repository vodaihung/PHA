
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const PHADataSource: React.FC = () => {
  return (
    <Card className="shadow-sm border-0 bg-slate-800/50 border-slate-700/50">
      <CardContent className="p-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Shield className="w-3 h-3" />
          <span>Data sourced from HUD PHA Contact Information API</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PHADataSource;
