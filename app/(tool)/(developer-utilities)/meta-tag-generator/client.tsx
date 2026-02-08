"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  RefreshCw,
  FileCode,
  Search,
  Share2,
  Settings2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MetaTagGeneratorClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    viewport: "width=device-width, initial-scale=1.0",
    charset: "UTF-8",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogType: "website",
    twitterCard: "summary_large_image",
  });

  const [generatedCode, setGeneratedCode] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const {
      title,
      description,
      keywords,
      author,
      viewport,
      charset,
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ogType,
      twitterCard,
    } = formData;

    const finalTitle = ogTitle || title;
    const finalDesc = ogDescription || description;

    const code = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
${keywords ? `<meta name="keywords" content="${keywords}" />` : ""}
${author ? `<meta name="author" content="${author}" />` : ""}
<meta name="viewport" content="${viewport}" />
<meta charset="${charset}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogType}" />
<meta property="og:url" content="${ogUrl}" />
<meta property="og:title" content="${finalTitle}" />
<meta property="og:description" content="${finalDesc}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="${twitterCard}" />
<meta property="twitter:url" content="${ogUrl}" />
<meta property="twitter:title" content="${finalTitle}" />
<meta property="twitter:description" content="${finalDesc}" />
<meta property="twitter:image" content="${ogImage}" />`
      .trim()
      .replace(/^\s*[\r\n]/gm, ""); // Remove empty lines from conditional rendering

    setGeneratedCode(code);
  }, [formData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Meta tags copied to clipboard");
  };

  const handleClear = () => {
    setFormData({
      title: "",
      description: "",
      keywords: "",
      author: "",
      viewport: "width=device-width, initial-scale=1.0",
      charset: "UTF-8",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      ogUrl: "",
      ogType: "website",
      twitterCard: "summary_large_image",
    });
    toast.info("All fields cleared");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Meta Tag Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create essential meta tags for SEO and social media sharing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Clear All"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="border-muted-foreground/20 shadow-sm overflow-hidden flex flex-col h-full">
            <Tabs defaultValue="basic" className="flex flex-col h-full">
              <div className="px-6 pt-6 pb-0">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic" className="gap-2">
                    <Search className="w-4 h-4" /> SEO
                  </TabsTrigger>
                  <TabsTrigger value="social" className="gap-2">
                    <Share2 className="w-4 h-4" /> Social
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="gap-2">
                    <Settings2 className="w-4 h-4" /> Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <Separator className="mt-6" />

              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent
                  value="basic"
                  className="space-y-4 data-[state=inactive]:hidden mt-0"
                >
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Meta Tag Generator - Toolbits"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.title.length}/60
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Meta Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Overview of your page content..."
                      maxLength={160}
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.description.length}/160
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords (Comma separated)</Label>
                    <Input
                      id="keywords"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                      placeholder="seo, meta tags, generator"
                    />
                  </div>
                </TabsContent>

                <TabsContent
                  value="social"
                  className="space-y-6 data-[state=inactive]:hidden mt-0"
                >
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      Open Graph (Facebook, LinkedIn)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ogUrl">Canonical URL</Label>
                        <Input
                          id="ogUrl"
                          name="ogUrl"
                          value={formData.ogUrl}
                          onChange={handleChange}
                          placeholder="https://example.com/page"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ogType">Result Type</Label>
                        <Select
                          value={formData.ogType}
                          onValueChange={(v) => handleSelectChange("ogType", v)}
                        >
                          <SelectTrigger id="ogType">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogImage">Image URL (Thumbnail)</Label>
                      <Input
                        id="ogImage"
                        name="ogImage"
                        value={formData.ogImage}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogTitle">Social Title (Optional)</Label>
                      <Input
                        id="ogTitle"
                        name="ogTitle"
                        value={formData.ogTitle}
                        onChange={handleChange}
                        placeholder="Different title for social media..."
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave blank to use Page Title.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogDescription">
                        Social Description (Optional)
                      </Label>
                      <Textarea
                        id="ogDescription"
                        name="ogDescription"
                        value={formData.ogDescription}
                        onChange={handleChange}
                        placeholder="Different description for social media..."
                        className="min-h-[80px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave blank to use Meta Description.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      Twitter Card
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="twitterCard">Card Type</Label>
                      <Select
                        value={formData.twitterCard}
                        onValueChange={(v) =>
                          handleSelectChange("twitterCard", v)
                        }
                      >
                        <SelectTrigger id="twitterCard">
                          <SelectValue placeholder="Select card type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="summary_large_image">
                            Summary Large Image
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="advanced"
                  className="space-y-4 data-[state=inactive]:hidden mt-0"
                >
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="viewport">Viewport</Label>
                    <Input
                      id="viewport"
                      name="viewport"
                      value={formData.viewport}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="charset">Charset</Label>
                    <Input
                      id="charset"
                      name="charset"
                      value={formData.charset}
                      onChange={handleChange}
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>

          {/* Output Section */}
          <Card className="flex flex-col h-full border-muted-foreground/20 shadow-sm bg-muted/30">
            <CardHeader className="pb-3 px-6 pt-6 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FileCode className="w-4 h-4" /> Generated HTML
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1 p-0 overflow-hidden relative min-h-[500px] lg:min-h-0">
              <Textarea
                value={generatedCode}
                readOnly
                className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm bg-transparent text-muted-foreground"
              />
            </CardContent>
          </Card>
        </div>

        {children}
      </div>
    </div>
  );
}
