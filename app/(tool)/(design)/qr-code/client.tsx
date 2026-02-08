"use client";

import { useState, useRef } from "react";
import {
  LuDownload,
  LuRefreshCw,
  LuQrCode,
  LuShare2,
  LuCopy,
  LuSettings2,
} from "react-icons/lu";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QrCodeGeneratorClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [text, setText] = useState("https://toolbits.vercel.app");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [level, setLevel] = useState("L");
  const [includeMargin, setIncludeMargin] = useState(true);

  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      toast.error("Could not generate QR code image");
      return;
    }

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("QR Code downloaded successfully");
  };

  const handleCopy = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard
        .write([item])
        .then(() => {
          toast.success("QR Code copied to clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy image");
        });
    });
  };

  const handleClear = () => {
    setText("");
    toast.info("Cleared text");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              QR Code Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and download custom QR codes for links, text, and more.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setText("https://toolbits.vercel.app");
                setBgColor("#ffffff");
                setFgColor("#000000");
                setSize(256);
              }}
              className="text-muted-foreground hover:text-foreground"
              title="Reset Defaults"
            >
              <LuRefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <LuSettings2 className="w-5 h-5 text-primary" /> Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter URL or text here..."
                    className="font-mono text-sm min-h-[100px]"
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{text.length} characters</span>
                    {text.length === 0 && (
                      <span className="text-destructive">Required</span>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Colors</Label>
                    <div className="flex items-center gap-4">
                      <div className="space-y-1.5 flex-1">
                        <Label
                          htmlFor="fgColor"
                          className="text-xs text-muted-foreground"
                        >
                          Foreground
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded border overflow-hidden shrink-0">
                            <input
                              type="color"
                              id="fgColor"
                              value={fgColor}
                              onChange={(e) => setFgColor(e.target.value)}
                              className="w-[150%] h-[150%] -m-[25%] cursor-pointer"
                            />
                          </div>
                          <Input
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="font-mono uppercase"
                            maxLength={7}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <Label
                          htmlFor="bgColor"
                          className="text-xs text-muted-foreground"
                        >
                          Background
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded border overflow-hidden shrink-0">
                            <input
                              type="color"
                              id="bgColor"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="w-[150%] h-[150%] -m-[25%] cursor-pointer"
                            />
                          </div>
                          <Input
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="font-mono uppercase"
                            maxLength={7}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Size & Error Correction</Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <Label>Size (px)</Label>
                          <span className="text-muted-foreground font-mono">
                            {size}px
                          </span>
                        </div>
                        <Slider
                          value={[size]}
                          onValueChange={(vals) => setSize(vals[0])}
                          min={128}
                          max={1024}
                          step={32}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="level" className="text-xs">
                          Error Correction Level
                        </Label>
                        <Select value={level} onValueChange={setLevel}>
                          <SelectTrigger id="level">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L">Low (7%)</SelectItem>
                            <SelectItem value="M">Medium (15%)</SelectItem>
                            <SelectItem value="Q">Quartile (25%)</SelectItem>
                            <SelectItem value="H">High (30%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <Card className="border-muted-foreground/20 shadow-sm sticky top-6 bg-muted/10">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center justify-center gap-2">
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div
                  ref={qrRef}
                  className="p-4 bg-white rounded-xl shadow-sm border"
                  style={{ backgroundColor: bgColor }}
                >
                  {text ? (
                    <QRCodeCanvas
                      value={text}
                      size={200}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      level={level as "L" | "M" | "Q" | "H"}
                      marginSize={includeMargin ? 4 : 0}
                      className="max-w-full h-auto"
                      style={{ width: "200px", height: "200px" }}
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] flex items-center justify-center text-muted-foreground/50 bg-muted/20">
                      <LuQrCode className="w-16 h-16 opacity-20" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    className="w-full gap-2"
                    variant="outline"
                    onClick={handleCopy}
                    disabled={!text}
                  >
                    <LuCopy className="w-4 h-4" /> Copy
                  </Button>
                  <Button
                    className="w-full gap-2"
                    onClick={handleDownload}
                    disabled={!text}
                  >
                    <LuDownload className="w-4 h-4" /> Download
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground px-4">
                  High-quality PNG format suitable for print and screen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
