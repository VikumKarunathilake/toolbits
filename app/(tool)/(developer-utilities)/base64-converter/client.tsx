"use client";

import { useState } from "react";
import {
  LuArrowRightLeft,
  LuCopy,
  LuUpload,
  LuFileCode,
  LuCheck,
  LuTrash2,
  LuDownload,
} from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Base64ConverterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fileOutput, setFileOutput] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const handleEncode = () => {
    try {
      if (!inputText) return;
      // Handle simple string encoding
      const encoded = btoa(unescape(encodeURIComponent(inputText)));
      setOutputText(encoded);
      toast.success("Text encoded to Base64");
    } catch (e) {
      toast.error("Encoding failed");
    }
  };

  const handleDecode = () => {
    try {
      if (!inputText) return;
      // Handle simple string conversion
      const decoded = decodeURIComponent(escape(atob(inputText)));
      setOutputText(decoded);
      toast.success("Base64 decoded to text");
    } catch (e) {
      toast.error("Invalid Base64 string");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max 5MB.");
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(2) + " KB");

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFileOutput(result);
      toast.success("File converted to Base64");
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleClearText = () => {
    setInputText("");
    setOutputText("");
  };

  const handleClearFile = () => {
    setFileOutput("");
    setFileName("");
    setFileSize("");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Base64 Converter
            </h1>
            <p className="text-muted-foreground mt-1">
              Encode and decode text or files to Base64 format securely.
            </p>
          </div>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="text">String Converter</TabsTrigger>
            <TabsTrigger value="file">File to Base64</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="text" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <Card className="border-muted-foreground/20 shadow-sm flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <LuArrowRightLeft className="w-4 h-4 text-primary" /> Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Type or paste content here..."
                      className="min-h-[300px] font-mono resize-none"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleEncode} className="flex-1">
                        Encode
                      </Button>
                      <Button
                        onClick={handleDecode}
                        variant="secondary"
                        className="flex-1"
                      >
                        Decode
                      </Button>
                      <Button
                        onClick={handleClearText}
                        variant="ghost"
                        size="icon"
                      >
                        <LuTrash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Output */}
                <Card className="border-muted-foreground/20 shadow-sm flex flex-col h-full bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <LuFileCode className="w-4 h-4 text-primary" /> Output
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(outputText)}
                      disabled={!outputText}
                    >
                      <LuCopy className="w-4 h-4 mr-2" /> Copy
                    </Button>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Textarea
                      readOnly
                      placeholder="Result will appear here..."
                      className="min-h-[300px] font-mono resize-none bg-transparent"
                      value={outputText}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="file">
              <Card className="border-muted-foreground/20 shadow-sm">
                <CardHeader>
                  <CardTitle>File Encoder</CardTitle>
                  <CardDescription>
                    Upload a file to convert it to a Data URI (Base64).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 bg-muted/10 hover:bg-muted/20 transition-colors">
                    <LuUpload className="w-12 h-12 text-muted-foreground mb-4" />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Select File
                      </span>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </Label>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Max file size: 5MB
                    </p>
                  </div>

                  {fileOutput && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <LuFileCode className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {fileSize}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearFile}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Base64 Output</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(fileOutput)}
                          >
                            <LuCopy className="w-3 h-3 mr-2" /> Copy to Clipboard
                          </Button>
                        </div>
                        <Textarea
                          readOnly
                          value={fileOutput}
                          className="font-mono text-xs min-h-[200px]"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {children}
      </div>
    </div>
  );
}
