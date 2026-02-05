"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar as CalendarIcon, ArrowRightLeft, Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("@/components/ui/calendar").then((mod) => mod.Calendar), {
  loading: () => <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-md" />,
});

export default function UnixTimestampConverterClient({ children }: { children?: React.ReactNode }) {
  const [timestamp, setTimestamp] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Initialize with current timestamp
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
  }, []);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimestamp(val);
    
    // Attempt to update date if valid
    const ts = parseInt(val);
    if (!isNaN(ts)) {
      // Check if it's seconds or milliseconds (simple heuristic: ms usually 13 digits, sec 10)
      const isMs = val.length > 11;
      setDate(new Date(ts * (isMs ? 1 : 1000)));
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setTimestamp(Math.floor(selectedDate.getTime() / 1000).toString());
    }
  };

  const setNow = () => {
    const now = new Date();
    setDate(now);
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
    toast.success("Updated to current time");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  // Derived values for display
  const currentTs = parseInt(timestamp) || 0;
  // Heuristic for display (treat < 1e11 as seconds)
  const displayDate = new Date(currentTs * (currentTs < 100000000000 ? 1000 : 1));
  const isValid = !isNaN(displayDate.getTime());

  const formats = isValid ? [
    { label: "GMT", value: displayDate.toUTCString() },
    { label: "Your Time Zone", value: displayDate.toString() },
    { label: "ISO 8601", value: displayDate.toISOString() },
    { label: "Relative", value: getRelativeTime(displayDate) },
  ] : [];

  function getRelativeTime(d: Date) {
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Unix Timestamp Converter</h1>
            <p className="text-muted-foreground mt-1">
              Convert between Unix Timestamps and Human Readable Dates.
            </p>
          </div>
          <Button onClick={setNow} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Reset to Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Converter Section */}
            <Card className="border-muted-foreground/20 shadow-sm md:col-span-2 lg:col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5 text-primary" />
                        Converter
                    </CardTitle>
                    <CardDescription>Type a timestamp or pick a date to convert instantly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Unix Timestamp
                        </label>
                        <div className="flex gap-2">
                            <Input 
                                value={timestamp}
                                onChange={handleTimestampChange}
                                placeholder="1707091200"
                                className="font-mono"
                            />
                            <Button variant="secondary" size="icon" onClick={() => copyToClipboard(timestamp, "Timestamp")}>
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-[0.8rem] text-muted-foreground">
                            Supports seconds (10 digits) and milliseconds (13 digits).
                        </p>
                    </div>

                    <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-muted-foreground text-sm font-medium">CONVERTS TO</span>
                        </div>
                    </div>

                     <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Human Readable Date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP pp") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                </CardContent>
            </Card>

            {/* Formats Display */}
            <Card className="border-muted-foreground/20 shadow-sm md:col-span-2 lg:col-span-1">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Formats
                    </CardTitle>
                    <CardDescription>See how this timestamp looks in standard formats.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isValid ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[140px]">Format</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {formats.map((f, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium text-muted-foreground">{f.label}</TableCell>
                                            <TableCell className="font-mono text-sm">{f.value}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(f.value, f.label)}>
                                                    <Copy className="w-3 h-3" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                            Invalid Timestamp
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
        {children}
      </div>
    </div>
  );
}
