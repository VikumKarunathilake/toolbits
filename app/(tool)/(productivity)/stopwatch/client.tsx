"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LuPlay, LuPause, LuRotateCcw, LuFlag, LuClock } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

type Lap = {
  id: number;
  time: number;
  split: number;
};

export default function StopwatchClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  
  const startTimeRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  const animate = useCallback((timeNow: number) => {
    if (startTimeRef.current !== undefined) {
      const deltaTime = timeNow - startTimeRef.current;
      setTime((_prev) => previousTimeRef.current + deltaTime);
      requestRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = time;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, animate]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    previousTimeRef.current = 0;
  };

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[0].split : 0;
    const currentLapTime = time - lastLapTime;
    
    const newLap: Lap = {
      id: laps.length + 1,
      time: currentLapTime,
      split: time,
    };
    
    setLaps([newLap, ...laps]);
  };

  const formatTime = (ms: number) => {
    const date = new Date(ms);
    const m = date.getUTCHours() * 60 + date.getUTCMinutes();
    const s = date.getUTCSeconds();
    const centisecond = Math.floor(date.getUTCMilliseconds() / 10);

    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}.${centisecond.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Stopwatch
            </h1>
            <p className="text-muted-foreground mt-1">
              Track time with precision. Lap splits included.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Timer Display & Controls */}
            <Card className="h-fit shadow-md border-border/60">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                        <LuClock className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">Timer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                     <div className="flex items-center justify-center py-6">
                        <div className="text-7xl font-mono font-bold tracking-tighter tabular-nums text-foreground/90">
                            {formatTime(time)}
                        </div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-14 w-14 rounded-full border-2 hover:border-primary/50"
                            onClick={handleReset}
                            disabled={isRunning}
                        >
                            <LuRotateCcw className="w-5 h-5" />
                        </Button>

                        <Button
                            size="lg"
                            className={`h-20 w-20 rounded-full text-xl shadow-lg transition-all hover:scale-105 ${isRunning ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : ""}`}
                            onClick={handleStartStop}
                        >
                             {isRunning ? (
                                <LuPause className="w-8 h-8 fill-current" />
                             ) : (
                                <LuPlay className="w-8 h-8 fill-current ml-1" />
                             )}
                        </Button>

                         <Button
                            variant="outline"
                            size="icon"
                            className="h-14 w-14 rounded-full border-2 hover:border-primary/50"
                            onClick={handleLap}
                            disabled={!isRunning}
                        >
                            <LuFlag className="w-5 h-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Laps Table */}
            <Card className="h-full shadow-md border-border/60 flex flex-col">
                <CardHeader>
                    <CardTitle className="text-lg">Laps</CardTitle>
                    <CardDescription>Recorded lap times</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 relative min-h-[300px]">
                   {laps.length === 0 ? (
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                           <LuFlag className="w-10 h-10 mb-2" />
                           <p>No laps recorded yet</p>
                       </div>
                   ) : (
                    <ScrollArea className="h-[300px] w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center w-[60px]">#</TableHead>
                                    <TableHead className="text-right">Lap Time</TableHead>
                                    <TableHead className="text-right">Split Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {laps.map((lap) => (
                                    <TableRow key={lap.id}>
                                        <TableCell className="text-center font-medium text-muted-foreground">{lap.id}</TableCell>
                                        <TableCell className="text-right font-mono">{formatTime(lap.time)}</TableCell>
                                        <TableCell className="text-right font-mono text-muted-foreground">{formatTime(lap.split)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                   )}
                </CardContent>
            </Card>
        </div>

        {children}
      </div>
    </div>
  );
}
