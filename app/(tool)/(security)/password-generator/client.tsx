"use client";

import { useState, useCallback, useEffect } from "react";
import {
  LuCopy,
  LuRefreshCw,
  LuShieldCheck,
  LuShieldAlert,
  LuShield,
} from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function PasswordGeneratorClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState(0);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      setStrength(0);
      return;
    }

    let validPassword = "";
    const len = length[0];

    // Ensure at least one character from each selected set is included
    const requiredChars = [];
    if (includeLower)
      requiredChars.push(
        "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)],
      );
    if (includeUpper)
      requiredChars.push(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)],
      );
    if (includeNumbers)
      requiredChars.push("0123456789"[Math.floor(Math.random() * 10)]);
    if (includeSymbols)
      requiredChars.push(
        "!@#$%^&*()_+~`|}{[]:;?><,./-="[Math.floor(Math.random() * 30)],
      );

    for (let i = 0; i < len - requiredChars.length; i++) {
      validPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    // Add required characters and shuffle
    validPassword += requiredChars.join("");
    validPassword = validPassword
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(validPassword);
    calculateStrength(validPassword);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return setStrength(0);

    if (pwd.length > 8) score += 20;
    if (pwd.length > 12) score += 20;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    setStrength(Math.min(100, score));
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  const getStrengthColor = (s: number) => {
    if (s < 40) return "bg-red-500";
    if (s < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (s: number) => {
    if (s < 40) return "Weak";
    if (s < 70) return "Moderate";
    return "Strong";
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Password Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create strong, secure, and random passwords instantly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border-muted-foreground/20 shadow-sm overflow-visible">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Generated Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-xl md:text-2xl h-14 tracking-wide bg-muted/20"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-300 ${getStrengthColor(strength)}`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
                <Button
                  onClick={generatePassword}
                  size="icon"
                  className="h-14 w-14 shrink-0"
                  variant="outline"
                  title="Regenerate"
                >
                  <LuRefreshCw className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleCopy}
                  size="icon"
                  className="h-14 w-14 shrink-0"
                  title="Copy"
                >
                  <LuCopy className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  {strength >= 70 ? (
                    <LuShieldCheck className="w-4 h-4 text-green-500" />
                  ) : strength >= 40 ? (
                    <LuShield className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <LuShieldAlert className="w-4 h-4 text-red-500" />
                  )}
                  <span className="font-medium text-muted-foreground">
                    Strength:{" "}
                    <span className="text-foreground">
                      {getStrengthLabel(strength)}
                    </span>
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {password.length} characters
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
              <CardDescription>
                Customize your password requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Length Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="length" className="text-base">
                    Password Length
                  </Label>
                  <span className="font-mono font-bold text-lg bg-muted px-2 rounded-md">
                    {length[0]}
                  </span>
                </div>
                <Slider
                  id="length"
                  value={length}
                  onValueChange={setLength}
                  min={6}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl">
                  <Label
                    htmlFor="uppercase"
                    className="flex flex-col space-y-1 cursor-pointer"
                  >
                    <span className="font-medium">Uppercase</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      A B C D E
                    </span>
                  </Label>
                  <Switch
                    id="uppercase"
                    checked={includeUpper}
                    onCheckedChange={(c) => {
                      if (
                        !c &&
                        !includeLower &&
                        !includeNumbers &&
                        !includeSymbols
                      )
                        return;
                      setIncludeUpper(c);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl">
                  <Label
                    htmlFor="lowercase"
                    className="flex flex-col space-y-1 cursor-pointer"
                  >
                    <span className="font-medium">Lowercase</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      a b c d e
                    </span>
                  </Label>
                  <Switch
                    id="lowercase"
                    checked={includeLower}
                    onCheckedChange={(c) => {
                      if (
                        !c &&
                        !includeUpper &&
                        !includeNumbers &&
                        !includeSymbols
                      )
                        return;
                      setIncludeLower(c);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl">
                  <Label
                    htmlFor="numbers"
                    className="flex flex-col space-y-1 cursor-pointer"
                  >
                    <span className="font-medium">Numbers</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      1 2 3 4 5
                    </span>
                  </Label>
                  <Switch
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(c) => {
                      if (
                        !c &&
                        !includeUpper &&
                        !includeLower &&
                        !includeSymbols
                      )
                        return;
                      setIncludeNumbers(c);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl">
                  <Label
                    htmlFor="symbols"
                    className="flex flex-col space-y-1 cursor-pointer"
                  >
                    <span className="font-medium">Symbols</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      ! @ # $ %
                    </span>
                  </Label>
                  <Switch
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(c) => {
                      if (
                        !c &&
                        !includeUpper &&
                        !includeLower &&
                        !includeNumbers
                      )
                        return;
                      setIncludeSymbols(c);
                    }}
                  />
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
