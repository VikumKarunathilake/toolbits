"use client";

import { useState, useMemo, useEffect } from "react";
import { LuCopy, LuTrash2, LuClock, LuCalendarDays, LuCircleAlert } from "react-icons/lu";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import cronParser from "cron-parser";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CronParserClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  // Common default: "*/5 * * * *" (Every 5 minutes)
  const [expression, setExpression] = useState("*/5 * * * *");
  const [error, setError] = useState<string | null>(null);

  // Parse result states
  const [description, setDescription] = useState("");
  const [nextRuns, setNextRuns] = useState<Date[]>([]);

  useEffect(() => {
    if (!expression.trim()) {
      setDescription("");
      setNextRuns([]);
      setError(null);
      return;
    }

    try {
      // 1. Get human readable description
      const desc = cronstrue.toString(expression, {
        use24HourTimeFormat: true,
        verbose: true,
      });
      setDescription(desc);
      setError(null);

      // 2. Calculate next 5 run times
      try {
        const interval = cronParser.parse(expression);
        const runs: Date[] = [];
        for (let i = 0; i < 5; i++) {
          runs.push(interval.next().toDate());
        }
        setNextRuns(runs);
      } catch (err) {
        // Sometimes cronstrue is more lenient than cron-parser
        console.error("cron-parser error:", err);
        setNextRuns([]);
        // We might want to show this error if description parsing succeeded but schedule failed
        // But usually if one fails the other likely will too or it's a specific syntax issue
      }

    } catch (err: any) {
      setError(err.toString().replace("Error: ", ""));
      setDescription("");
      setNextRuns([]);
    }
  }, [expression]);

  const handleCopy = () => {
    if (!expression) return;
    navigator.clipboard.writeText(expression);
    toast.success("Cron expression copied to clipboard");
  };

  const handleCopyDescription = () => {
    if (!description) return;
    navigator.clipboard.writeText(description);
    toast.success("Description copied to clipboard");
  };

  const clearInput = () => {
    setExpression("");
    toast.info("Cleared");
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cron Parser</h1>
            <p className="text-muted-foreground mt-1">
              Translate cron expressions into human-readable schedules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearInput}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Clear Input"
            >
              <LuTrash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Start Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Input and Interpretation */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Input Card */}
            <Card className="border-muted-foreground/20 shadow-sm overflow-visible">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuClock className="w-4 h-4" /> Expression
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="* * * * *"
                    className="font-mono text-xl h-14 text-center tracking-widest"
                  />
                  <Button variant="outline" size="icon" className="h-14 w-14 shrink-0" onClick={handleCopy}>
                    <LuCopy className="w-5 h-5" />
                  </Button>
                </div>
                
                {error && (
                   <Alert variant="destructive" className="py-2">
                     <LuCircleAlert className="h-4 w-4" />
                    <AlertTitle>Invalid Cron Expression</AlertTitle>
                    <AlertDescription className="text-xs font-mono">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {!error && description && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-2xl font-serif text-primary mb-2 leading-relaxed">
                      "{description}"
                    </p>
                     <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleCopyDescription}
                      className="text-muted-foreground hover:text-primary h-8 text-xs"
                    >
                      <LuCopy className="w-3 h-3 mr-1" /> Copy Description
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Scheduled Dates */}
             <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuCalendarDays className="w-4 h-4" /> Upcoming Execution Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                {nextRuns.length > 0 ? (
                  <div className="space-y-0 divide-y">
                    {nextRuns.map((date, i) => (
                      <div key={i} className="py-3 flex items-center justify-between group hover:bg-muted/50 transition-colors px-2 rounded-sm">
                        <span className="font-mono text-sm text-muted-foreground">
                          Run #{i + 1}
                        </span>
                        <div className="flex items-center gap-4">
                           <span className="font-medium">
                            {format(date, "PPP")}
                          </span>
                          <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                             {format(date, "HH:mm:ss")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground italic">
                    {error ? "Fix the expression to see scheduled times" : "Enter a valid cron expression"}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Cheatsheet / Reference */}
          <div className="space-y-6">
             <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader className="pb-3">
                 <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                   Quick Reference
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <ScrollArea className="h-[500px]">
                   <div className="divide-y text-sm">
                     <div className="p-4 space-y-2">
                       <span className="font-semibold block mb-1">Structure</span>
                       <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs text-muted-foreground">
                         <div className="bg-muted/50 p-1 rounded">Min</div>
                         <div className="bg-muted/50 p-1 rounded">Hour</div>
                         <div className="bg-muted/50 p-1 rounded">Day</div>
                         <div className="bg-muted/50 p-1 rounded">Mon</div>
                         <div className="bg-muted/50 p-1 rounded">Week</div>
                       </div>
                       <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs mt-1">
                         <div>0-59</div>
                         <div>0-23</div>
                         <div>1-31</div>
                         <div>1-12</div>
                         <div>0-6</div>
                       </div>
                     </div>
                     
                     <div className="p-4 space-y-3">
                       <span className="font-semibold block text-xs uppercase tracking-wider text-muted-foreground">Special Characters</span>
                       <div className="grid gap-2">
                         <div className="flex justify-between">
                           <code className="text-primary font-bold">*</code>
                           <span className="text-muted-foreground text-right">any value</span>
                         </div>
                         <div className="flex justify-between">
                           <code className="text-primary font-bold">,</code>
                           <span className="text-muted-foreground text-right">value list separator</span>
                         </div>
                         <div className="flex justify-between">
                           <code className="text-primary font-bold">-</code>
                           <span className="text-muted-foreground text-right">range of values</span>
                         </div>
                         <div className="flex justify-between">
                           <code className="text-primary font-bold">/</code>
                           <span className="text-muted-foreground text-right">step values</span>
                         </div>
                       </div>
                     </div>

                     <div className="p-4 space-y-3">
                        <span className="font-semibold block text-xs uppercase tracking-wider text-muted-foreground">Examples</span>
                        <div className="space-y-3">
                           <div className="group cursor-pointer" onClick={() => setExpression("0 0 * * *")}>
                             <div className="flex justify-between items-center mb-1">
                               <span className="text-xs font-medium">Daily at midnight</span>
                             </div>
                             <code className="bg-muted block w-full p-1.5 rounded text-xs font-mono group-hover:bg-primary/10 transition-colors">0 0 * * *</code>
                           </div>
                           
                           <div className="group cursor-pointer" onClick={() => setExpression("*/15 * * * *")}>
                             <div className="flex justify-between items-center mb-1">
                               <span className="text-xs font-medium">Every 15 minutes</span>
                             </div>
                             <code className="bg-muted block w-full p-1.5 rounded text-xs font-mono group-hover:bg-primary/10 transition-colors">*/15 * * * *</code>
                           </div>

                           <div className="group cursor-pointer" onClick={() => setExpression("0 9-17 * * 1-5")}>
                             <div className="flex justify-between items-center mb-1">
                               <span className="text-xs font-medium">9-to-5 on weekdays</span>
                             </div>
                             <code className="bg-muted block w-full p-1.5 rounded text-xs font-mono group-hover:bg-primary/10 transition-colors">0 9-17 * * 1-5</code>
                           </div>
                        </div>
                     </div>
                   </div>
                 </ScrollArea>
              </CardContent>
             </Card>
          </div>

        </div>

        {children}
      </div>
    </div>
  );
}
