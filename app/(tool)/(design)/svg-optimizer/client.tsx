"use client";

import { useState, useRef } from "react";
import { optimize } from "svgo/browser";
import { toast } from "sonner";
import {
  LuTrash2,
  LuCopy,
  LuImage,
  LuDownload,
  LuFileCode2,
  LuArrowRight,
  LuZap,
  LuUpload,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SvgOptimizerClient() {
  const [svgInput, setSvgInput] = useState("");
  const [optimizedSvg, setOptimizedSvg] = useState("");
  const [stats, setStats] = useState({ original: 0, optimized: 0, percent: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Optimization settings
  const [settings, setSettings] = useState({
    multipass: true,
    removeDimensions: true,
    removeViewBox: false,
    removeXMLNS: false,
  });

  const handleOptimize = () => {
    if (!svgInput.trim()) {
      toast.error("Please enter SVG code first");
      return;
    }

    try {
      const result = optimize(svgInput, {
        multipass: settings.multipass,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: settings.removeViewBox,
              },
            },
          },
          settings.removeDimensions ? "removeDimensions" : '',
          settings.removeXMLNS ? "removeXMLNS" : '',
        ].filter(Boolean) as any, // Type assertion needed for dynamic plugin array
      });

      const originalSize = new Blob([svgInput]).size;
      const optimizedSize = new Blob([result.data]).size;
      const percent = Math.round(
        ((originalSize - optimizedSize) / originalSize) * 100
      );

      setOptimizedSvg(result.data);
      setStats({
        original: originalSize,
        optimized: optimizedSize,
        percent: percent > 0 ? percent : 0,
      });

      toast.success(`Optimized! Saved ${percent > 0 ? percent : 0}%`);
    } catch (error) {
      toast.error("Error optimizing SVG: " + (error as Error).message);
    }
  };

  const handleCopy = () => {
    if (!optimizedSvg) return;
    navigator.clipboard.writeText(optimizedSvg);
    toast.success("Optimized SVG copied to clipboard");
  };

  const handleDownload = () => {
    if (!optimizedSvg) return;
    const blob = new Blob([optimizedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("SVG downloaded");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const text = await file.text();
        setSvgInput(text);
        toast.success("SVG file loaded");
      } else {
        toast.error("Please drop a valid SVG file");
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const text = await file.text();
        setSvgInput(text);
        toast.success("SVG file loaded");
      } else {
        toast.error("Please select a valid SVG file");
      }
    }
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SVG Optimizer</h1>
            <p className="text-muted-foreground mt-1">
              Minify and optimize your SVG files to reduce file size.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setSvgInput("");
                setOptimizedSvg("");
                setStats({ original: 0, optimized: 0, percent: 0 });
                toast.info("Cleared all content");
              }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
            >
              <LuTrash2 className="w-4 h-4" /> Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="multipass" className="cursor-pointer">
                    Multipass Optimization
                  </Label>
                  <Switch
                    id="multipass"
                    checked={settings.multipass}
                    onCheckedChange={(c) =>
                      setSettings((s) => ({ ...s, multipass: c }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="removeDimensions" className="cursor-pointer">
                    Remove Dimensions
                  </Label>
                  <Switch
                    id="removeDimensions"
                    checked={settings.removeDimensions}
                    onCheckedChange={(c) =>
                      setSettings((s) => ({ ...s, removeDimensions: c }))
                    }
                  />
                </div>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="removeViewBox" className="cursor-pointer">
                    Remove ViewBox (Not Recommended)
                  </Label>
                  <Switch
                    id="removeViewBox"
                    checked={settings.removeViewBox}
                    onCheckedChange={(c) =>
                      setSettings((s) => ({ ...s, removeViewBox: c }))
                    }
                  />
                </div>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="removeXMLNS" className="cursor-pointer">
                    Remove XMLNS
                  </Label>
                  <Switch
                    id="removeXMLNS"
                    checked={settings.removeXMLNS}
                    onCheckedChange={(c) =>
                      setSettings((s) => ({ ...s, removeXMLNS: c }))
                    }
                  />
                </div>

                <Button onClick={handleOptimize} className="w-full gap-2 mt-4">
                  <LuZap className="w-4 h-4" /> Optimize SVG
                </Button>
              </CardContent>
            </Card>

            {stats.original > 0 && (
              <Card className="border-primary/20 bg-primary/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-primary">
                    Optimization Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Original Size:</span>
                    <span className="font-mono">{formatBytes(stats.original)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Optimized Size:</span>
                    <span className="font-mono">{formatBytes(stats.optimized)}</span>
                  </div>
                  <div className="border-t border-primary/10 pt-4 mt-2">
                     <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">Savings:</span>
                    <Badge variant="default" className="text-sm">
                      {stats.percent}% Reduced
                    </Badge>
                  </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
             <Tabs defaultValue="input" className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <TabsList>
                    <TabsTrigger value="input">Input Code</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!optimizedSvg && !svgInput}>Preview</TabsTrigger>
                    {optimizedSvg && <TabsTrigger value="output">Output Code</TabsTrigger>}
                 </TabsList>
                 
                  <div className="flex gap-2">
                    {optimizedSvg && (
                       <>
                        <Button variant="outline" size="sm" onClick={handleCopy} title="Copy Optimized Code">
                            <LuCopy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownload} title="Download Optimized SVG">
                            <LuDownload className="w-4 h-4" />
                        </Button>
                       </>
                    )}
                 </div>
              </div>

              <TabsContent value="input" className="flex-1 mt-0">
                  <Card className="h-[500px] border-muted-foreground/20 shadow-sm flex flex-col">
                     <CardHeader className="py-3 px-4 border-b bg-muted/20">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                           <LuFileCode2 className="w-4 h-4" /> SVG Source
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-0 flex-1 relative overflow-hidden min-h-0">
                        <div
                          className={`relative w-full h-full flex flex-col ${
                            isDragging ? "bg-primary/10" : "bg-transparent"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <Textarea
                            value={svgInput}
                            onChange={(e) => setSvgInput(e.target.value)}
                            placeholder="Paste your SVG code here, or drag & drop an SVG file..."
                            className={`absolute inset-0 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm leading-relaxed bg-transparent z-10 ${
                              isDragging ? "pointer-events-none" : ""
                            }`}
                            spellCheck={false}
                          />
                          
                          {/* Overlay for drag state */}
                          {isDragging && (
                            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-primary m-2 rounded-md pointer-events-none z-20">
                              <div className="bg-background/90 px-6 py-4 rounded-lg shadow-lg text-center">
                                <LuUpload className="w-8 h-8 mx-auto text-primary mb-2" />
                                <p className="font-medium text-primary">Drop SVG file here</p>
                              </div>
                            </div>
                          )}

                          {/* Upload button overlay when empty */}
                          {!svgInput && !isDragging && (
                            <div className="absolute top-2 right-2 z-20">
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".svg"
                                className="hidden"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="gap-2 bg-background/50 hover:bg-background"
                              >
                                <LuUpload className="w-4 h-4" /> Upload File
                              </Button>
                            </div>
                          )}
                        </div>
                     </CardContent>
                  </Card>
              </TabsContent>

               <TabsContent value="output" className="flex-1 mt-0">
                  <Card className="h-[500px] border-muted-foreground/20 shadow-sm flex flex-col">
                     <CardHeader className="py-3 px-4 border-b bg-muted/20">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                           <LuFileCode2 className="w-4 h-4" /> Optimized Source
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-0 flex-1 relative overflow-hidden min-h-0">
                        <Textarea
                           value={optimizedSvg}
                           readOnly
                           className="absolute inset-0 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm leading-relaxed bg-transparent text-primary"
                           spellCheck={false}
                        />
                     </CardContent>
                  </Card>
              </TabsContent>

               <TabsContent value="preview" className="flex-1 mt-0">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
                    <Card className="h-full border-muted-foreground/20 shadow-sm flex flex-col">
                       <CardHeader className="py-3 px-4 border-b bg-muted/20">
                          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                             <LuImage className="w-4 h-4" /> Original
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="p-0 flex-1 relative flex items-center justify-center bg-muted/30">
                          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                          {svgInput ? (
                             <div className="w-full h-full p-4 flex items-center justify-center overflow-auto" dangerouslySetInnerHTML={{ __html: svgInput }} />
                          ) : (
                             <p className="text-muted-foreground text-sm">No SVG input</p>
                          )}
                       </CardContent>
                    </Card>

                    <Card className="h-full border-muted-foreground/20 shadow-sm flex flex-col">
                       <CardHeader className="py-3 px-4 border-b bg-muted/20">
                          <CardTitle className="text-sm font-medium uppercase tracking-wider text-primary flex items-center gap-2">
                             <LuZap className="w-4 h-4" /> Optimized
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="p-0 flex-1 relative flex items-center justify-center bg-muted/30">
                          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                           {optimizedSvg ? (
                             <div className="w-full h-full p-4 flex items-center justify-center overflow-auto" dangerouslySetInnerHTML={{ __html: optimizedSvg }} />
                          ) : (
                             <p className="text-muted-foreground text-sm">Optimize to see preview</p>
                          )}
                       </CardContent>
                    </Card>
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
