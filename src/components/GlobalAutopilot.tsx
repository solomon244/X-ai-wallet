import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RocketIcon } from "@radix-ui/react-icons";

interface GlobalAutopilotProps {
  enabled: boolean;
  onToggle: () => void;
}

export function GlobalAutopilot({ enabled, onToggle }: GlobalAutopilotProps) {
  return (
    <Card className="fixed top-24 right-4 w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <RocketIcon className={`h-4 w-4 ${enabled ? 'text-green-500' : 'text-muted-foreground'}`} />
          Global Autopilot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            id="global-autopilot"
            checked={enabled}
            onCheckedChange={onToggle}
          />
          <Label htmlFor="global-autopilot">Activate AI-powered financial management</Label>
        </div>
      </CardContent>
    </Card>
  );
}