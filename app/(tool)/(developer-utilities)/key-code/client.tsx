"use client";

import { useState, useEffect } from "react";
import { LuCopy, LuKeyboard } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type KeyInfo = {
  key: string;
  keyCode: number;
  code: string;
  location: number;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
};

export default function KeyCodeClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [eventInfo, setEventInfo] = useState<KeyInfo | null>(null);
  const [history, setHistory] = useState<KeyInfo[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for some keys to keep focus in window
      // But allow common shortcuts like Copy/Paste/Reload
      if (
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        e.key !== "F12" &&
        e.key !== "F5"
      ) {
        e.preventDefault();
      }

      const info: KeyInfo = {
        key: e.key === " " ? "(Space)" : e.key,
        keyCode: e.keyCode || e.which,
        code: e.code,
        location: e.location,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
      };

      setEventInfo(info);
      setHistory((prev) => [info, ...prev].slice(0, 10)); // Keep last 10
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Key Code & Event Tester
            </h1>
            <p className="text-muted-foreground mt-1">
              Press any key to see its JavaScript event code info.
            </p>
          </div>
        </div>

        {!eventInfo ? (
          <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-muted-foreground/30 rounded-2xl bg-muted/10 animate-pulse">
            <div className="text-center space-y-4">
              <div className="mx-auto bg-background p-4 rounded-full shadow-sm w-fit">
                <LuKeyboard className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Press any key on your keyboard
              </h2>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            {/* Main Big Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="col-span-1 md:col-span-2 lg:col-span-2 shadow-lg border-primary/20 bg-card relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(eventInfo.keyCode.toString(), "Key Code")
                      }
                    >
                      <LuCopy className="w-4 h-4" />
                    </Button>
                </div>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    JavaScript Key Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                  <span className="text-9xl font-bold tracking-tighter text-primary">
                    {eventInfo.keyCode}
                  </span>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    event.key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-semibold truncate" title={eventInfo.key}>
                    {eventInfo.key}
                  </div>
                   <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 w-full h-8 text-xs"
                      onClick={() => copyToClipboard(eventInfo.key, "event.key")}
                    >
                      Copy value
                    </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    event.code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-mono truncate" title={eventInfo.code}>
                     {eventInfo.code}
                  </div>
                   <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 w-full h-8 text-xs"
                      onClick={() => copyToClipboard(eventInfo.code, "event.code")}
                    >
                      Copy value
                    </Button>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Info Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card for Modifiers */}
                 <Card>
                     <CardHeader>
                         <CardTitle className="text-lg">Modifiers</CardTitle>
                     </CardHeader>
                     <CardContent className="flex flex-wrap gap-2">
                         <Badge variant={eventInfo.shiftKey ? "default" : "outline"} className="text-base py-1 px-3">Shift</Badge>
                         <Badge variant={eventInfo.ctrlKey ? "default" : "outline"} className="text-base py-1 px-3">Control</Badge>
                         <Badge variant={eventInfo.altKey ? "default" : "outline"} className="text-base py-1 px-3">Alt</Badge>
                         <Badge variant={eventInfo.metaKey ? "default" : "outline"} className="text-base py-1 px-3">Meta</Badge>
                     </CardContent>
                 </Card>
                
                 {/* Card for Location */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-mono">
                            {eventInfo.location}
                            <span className="text-sm text-muted-foreground ml-2 font-sans">
                                ({eventInfo.location === 0 ? "Standard" : eventInfo.location === 1 ? "Left" : eventInfo.location === 2 ? "Right" : "Numpad"})
                            </span>
                        </div>
                    </CardContent>
                 </Card>

                 {/* History (Recent Keys) */}
                  <Card className="row-span-2">
                     <CardHeader>
                         <CardTitle className="text-lg">Recent Keys</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <div className="space-y-2">
                             {history.slice(1, 6).map((h, i) => (
                                 <div key={i} className="flex justify-between items-center text-sm border-b last:border-0 pb-2 last:pb-0">
                                     <span className="font-medium">{h.key}</span>
                                     <span className="font-mono text-muted-foreground">{h.keyCode}</span>
                                 </div>
                             ))}
                             {history.length <= 1 && <span className="text-muted-foreground text-sm">No history yet</span>}
                         </div>
                     </CardContent>
                 </Card>
             </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
