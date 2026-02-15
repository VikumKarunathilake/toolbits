"use client";

import { useState, useEffect } from "react";
import { LuCopy, LuRefreshCw, LuPalette, LuArrowRightLeft } from "react-icons/lu";
import { toast } from "sonner";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
import hwbPlugin from "colord/plugins/hwb";
import cmykPlugin from "colord/plugins/cmyk";

extend([namesPlugin, a11yPlugin, hwbPlugin, cmykPlugin]);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

export default function ColorConverterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [color, setColor] = useState(colord("#3b82f6"));
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [rgbInput, setRgbInput] = useState({ r: 59, g: 130, b: 246 });
  const [hslInput, setHslInput] = useState({ h: 217, s: 91, l: 60 });
  const [cmykInput, setCmykInput] = useState({ c: 76, m: 47, y: 0, k: 4 });

  // Update all states when master color changes (except the source of change)
  const updateStates = (newColor: any, source: string) => {
    if (!newColor.isValid()) return;

    setColor(newColor);

    if (source !== "hex") setHexInput(newColor.toHex());
    if (source !== "rgb") setRgbInput(newColor.toRgb());
    if (source !== "hsl") setHslInput(newColor.toHsl());
    // CMYK is an object from colord now
    if (source !== "cmyk") setCmykInput(newColor.toCmyk());
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    const newColor = colord(val);
    if (newColor.isValid()) {
      updateStates(newColor, "hex");
    }
  };

  const handleRgbChange = (key: "r" | "g" | "b", val: string) => {
    const num = parseInt(val) || 0;
    const newRgb = { ...rgbInput, [key]: num };
    setRgbInput(newRgb);
    const newColor = colord(newRgb);
    if (newColor.isValid()) {
      updateStates(newColor, "rgb");
    }
  };

  // Helper for copying
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  // Format Helpers
  const formatHwb = () => {
    const hwb = color.toHwb();
    return `hwb(${Math.round(hwb.h)}, ${Math.round(hwb.w)}%, ${Math.round(hwb.b)}%)`;
  };

  const formatCmyk = () => {
    const cmyk = color.toCmyk();
    return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  };

  const formatNCol = () => {
    // Custom logic to approximate NCol format (HueLetter+Percent, White%, Black%)
    const hwb = color.toHwb();
    const h = hwb.h;
    let letter = "R";
    let offset = 0;

    if (h < 60) {
      letter = "R";
      offset = h;
    } else if (h < 120) {
      letter = "Y";
      offset = h - 60;
    } else if (h < 180) {
      letter = "G";
      offset = h - 120;
    } else if (h < 240) {
      letter = "C";
      offset = h - 180;
    } else if (h < 300) {
      letter = "B";
      offset = h - 240;
    } else {
      letter = "M";
      offset = h - 300;
    }

    const percent = Math.round((offset / 60) * 100);
    return `${letter}${percent}, ${Math.round(hwb.w)}%, ${Math.round(hwb.b)}%`;
  };

  const allFormats = [
    {
      label: "Name",
      value: color.toName({ closest: true }) || "Unknown",
      copyValue: color.toName({ closest: true }) || "",
    },
    {
      label: "Rgb",
      value: color.toRgbString(),
      copyValue: color.toRgbString(),
    },
    { label: "Hex", value: color.toHex(), copyValue: color.toHex() },
    {
      label: "Hsl",
      value: color.toHslString(),
      copyValue: color.toHslString(),
    },
    { label: "Hwb", value: formatHwb(), copyValue: formatHwb() },
    { label: "Cmyk", value: formatCmyk(), copyValue: formatCmyk() },
    { label: "NCol", value: formatNCol(), copyValue: formatNCol() },
  ];

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Color Converter
            </h1>
            <p className="text-muted-foreground mt-1">
              Convert between HEX, RGB, HSL, CMYK, and more.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Master Hex Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pick a Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border shadow-sm shrink-0 relative overflow-hidden">
                    <input
                      type="color"
                      value={color.toHex()}
                      onChange={(e) => {
                        const newColor = colord(e.target.value);
                        updateStates(newColor, "picker");
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: color.toHex() }}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Hex Color</Label>
                    <Input
                      value={hexInput}
                      onChange={handleHexChange}
                      className="font-mono text-lg uppercase"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Formats List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Color Formats</CardTitle>
                <CardDescription>
                  Copy standard CSS color values
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-0 divide-y">
                {allFormats.map((format) => (
                  <div
                    key={format.label}
                    className="grid grid-cols-12 gap-4 py-3 items-center group"
                  >
                    <label className="col-span-3 md:col-span-2 text-sm font-medium text-muted-foreground italic">
                      {format.label}
                    </label>
                    <div className="col-span-7 md:col-span-9 relative">
                      <Input
                        readOnly
                        value={format.value}
                        className="font-mono bg-muted/20 border-transparent focus-visible:bg-background focus-visible:border-input h-9"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground group-hover:text-foreground"
                        onClick={() =>
                          copyToClipboard(format.copyValue, format.label)
                        }
                        title={`Copy ${format.label}`}
                      >
                        <LuCopy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Tabs defaultValue="manipulate" className="w-full">
              <TabsList>
                <TabsTrigger value="manipulate">Manipulate</TabsTrigger>
                <TabsTrigger value="rgb">RGB Sliders</TabsTrigger>
                <TabsTrigger value="hsl">HSL Sliders</TabsTrigger>
              </TabsList>

              <TabsContent value="manipulate">
                <Card>
                  <CardHeader>
                    <CardTitle>Adjust Color</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Brightness</Label>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(color.brightness() * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[color.brightness() * 100]}
                        max={100}
                        onValueChange={(vals) => {
                          // Colord doesn't have a direct setBrightness, so we approximate with Lightness or use HSL
                          // Actually usually changing Lightness is sufficient for basic manipulation
                          const currentHsl = color.toHsl();
                          updateStates(
                            colord({ ...currentHsl, l: vals[0] }),
                            "hsl",
                          );
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Saturation</Label>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(color.toHsl().s)}%
                        </span>
                      </div>
                      <Slider
                        value={[color.toHsl().s]}
                        max={100}
                        onValueChange={(vals) => {
                          const currentHsl = color.toHsl();
                          updateStates(
                            colord({ ...currentHsl, s: vals[0] }),
                            "hsl",
                          );
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rgb">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">RGB Values</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {["r", "g", "b"].map((channel) => (
                        <div key={channel} className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="uppercase">{channel}</Label>
                            <span className="font-mono text-xs text-muted-foreground">
                              {/* @ts-ignore */}
                              {rgbInput[channel]}
                            </span>
                          </div>
                          <Slider
                            // @ts-ignore
                            value={[rgbInput[channel]]}
                            max={255}
                            step={1}
                            onValueChange={(vals) =>
                              handleRgbChange(
                                channel as "r" | "g" | "b",
                                vals[0].toString(),
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hsl">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">HSL Values</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>Hue ({Math.round(hslInput.h)}°)</Label>
                        <Slider
                          value={[hslInput.h]}
                          max={360}
                          onValueChange={(vals) => {
                            const newHsl = { ...hslInput, h: vals[0] };
                            setHslInput(newHsl);
                            updateStates(colord(newHsl), "hsl");
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Saturation ({Math.round(hslInput.s)}%)</Label>
                        <Slider
                          value={[hslInput.s]}
                          max={100}
                          onValueChange={(vals) => {
                            const newHsl = { ...hslInput, s: vals[0] };
                            setHslInput(newHsl);
                            updateStates(colord(newHsl), "hsl");
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Lightness ({Math.round(hslInput.l)}%)</Label>
                        <Slider
                          value={[hslInput.l]}
                          max={100}
                          onValueChange={(vals) => {
                            const newHsl = { ...hslInput, l: vals[0] };
                            setHslInput(newHsl);
                            updateStates(colord(newHsl), "hsl");
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div
                className="h-48 w-full"
                style={{ backgroundColor: color.toHex() }}
              />
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Color Name
                  </Label>
                  <div className="text-xl font-medium capitalize">
                    {color.toName({ closest: true }) || "Unknown"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                      Brightness
                    </Label>
                    <div className="font-mono">
                      {Math.round(color.brightness() * 100)}%
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                      Luminance
                    </Label>
                    <div className="font-mono">
                      {color.luminance().toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Contrast vs Black/White
                  </Label>
                  <div className="flex gap-2">
                    <div
                      className="flex-1 p-2 text-center rounded text-sm font-medium"
                      style={{
                        backgroundColor: color.toHex(),
                        color: "#000000",
                      }}
                    >
                      AA {color.contrast("#000000") >= 4.5 ? "Yes" : "No"}
                    </div>
                    <div
                      className="flex-1 p-2 text-center rounded text-sm font-medium"
                      style={{
                        backgroundColor: color.toHex(),
                        color: "#ffffff",
                      }}
                    >
                      AA {color.contrast("#ffffff") >= 4.5 ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
