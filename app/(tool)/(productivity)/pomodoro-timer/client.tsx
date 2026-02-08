"use client";

import { useState, useEffect, useRef } from "react";
import { LuPlay, LuPause, LuRotateCcw, LuCoffee, LuBriefcase, LuBell } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TimerMode = "work" | "shortBreak" | "longBreak";

const MODES: Record<
  TimerMode,
  { label: string; minutes: number; color: string }
> = {
  work: { label: "Work", minutes: 25, color: "bg-primary" },
  shortBreak: { label: "Short Break", minutes: 5, color: "bg-green-500" },
  longBreak: { label: "Long Break", minutes: 15, color: "bg-blue-500" },
};

export default function PomodoroTimerClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(MODES.work.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  // Use a ref for the interval so we can clear it easily
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission();
      }
    }
  }, []);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].minutes * 60);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const sendNotification = (title: string, body: string) => {
    toast.info(title, { description: body });

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico" });
    }

    // Play a sound if available (optional enhancement)
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
    );
    audio.play().catch((e) => console.log("Audio play failed", e));
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Timer finished
      setIsActive(false);
      if (mode === "work") {
        setCycles((c) => c + 1);
        sendNotification(
          "Work Session Complete!",
          "Great job! Take a short break.",
        );
        switchMode("shortBreak");
      } else {
        sendNotification("Break Over!", "Time to get back to focus.");
        switchMode("work");
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  // Update document title
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - ${MODES[mode].label}`;
  }, [timeLeft, mode]);

  // Calculate progress for the bar (inverse, filling up or emptying?)
  // Usually emptying looks better for a countdown.
  const totalSeconds = MODES[mode].minutes * 60;
  // Progress value should be 100% at start, 0% at end.
  const progressValue = (timeLeft / totalSeconds) * 100;

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Pomodoro Timer
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay focused with 25/5 or custom intervals.
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <Card className="shadow-sm border-border">
            <CardHeader className="text-center pb-2">
              <div
                className={`mx-auto p-3 rounded-full mb-4 w-fit ${
                  isActive ? "bg-primary/10 animate-pulse" : "bg-muted"
                }`}
              >
                {mode === "work" ? (
                  <LuBriefcase
                    className={`w-8 h-8 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                ) : (
                  <LuCoffee
                    className={`w-8 h-8 ${
                      isActive ? "text-green-500" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                {MODES[mode].label}
              </CardTitle>
              <CardDescription>
                {mode === "work" ? "Focus time" : "Time to recharge"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Tabs
                defaultValue="work"
                value={mode}
                onValueChange={(v) => switchMode(v as TimerMode)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="work">Work</TabsTrigger>
                  <TabsTrigger value="shortBreak">Short</TabsTrigger>
                  <TabsTrigger value="longBreak">Long</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col items-center justify-center py-4 relative">
                <div className="text-8xl font-mono font-bold tracking-tighter tabular-nums text-foreground/90">
                  {formatTime(timeLeft)}
                </div>
                <Badge
                  variant="secondary"
                  className="mt-4 text-sm font-normal px-4 py-1"
                >
                  {cycles > 0
                    ? `${cycles} ${cycles === 1 ? "cycle" : "cycles"} completed`
                    : "Ready to start"}
                </Badge>
              </div>

              <div className="space-y-4">
                <Progress value={progressValue} className="h-2" />

                <div className="flex justify-center gap-6 items-center pt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full border-2 hover:border-primary/50 transition-colors"
                    onClick={resetTimer}
                    disabled={isActive && timeLeft === totalSeconds}
                  >
                    <LuRotateCcw className="w-5 h-5" />
                  </Button>

                  <Button
                    size="lg"
                    className={`h-24 w-24 rounded-full text-xl shadow-lg transition-all hover:scale-105 hover:shadow-primary/25 ${
                      isActive
                        ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        : ""
                    }`}
                    onClick={toggleTimer}
                  >
                    {isActive ? (
                      <LuPause className="w-8 h-8 fill-current" />
                    ) : (
                      <LuPlay className="w-8 h-8 fill-current ml-1" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-muted-foreground hover:bg-muted"
                    onClick={() => {
                      toast.info("Notifications Enabled", {
                        description: "You'll be notified when the timer ends.",
                      });
                      Notification.requestPermission();
                    }}
                  >
                    <LuBell className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {children}
      </div>
    </div>
  );
}
