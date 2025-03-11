import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Toggle } from "../ui/toggle";
import {
  Wand2,
  Image,
  Video,
  RefreshCw,
  Download,
  Undo,
  Redo,
  Sliders,
  Palette,
} from "lucide-react";

interface AIGenerationToolProps {
  onGenerate?: (content: { type: string; url: string; prompt: string }) => void;
  onCancel?: () => void;
  mediaType?: "image" | "video";
}

const AIGenerationTool = ({
  onGenerate = () => {},
  onCancel = () => {},
  mediaType = "image",
}: AIGenerationToolProps) => {
  const [activeTab, setActiveTab] = useState<"image" | "video">(mediaType);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  // Image generation settings
  const [imageStyle, setImageStyle] = useState("photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");

  // Video generation settings
  const [videoDuration, setVideoDuration] = useState(5);
  const [videoStyle, setVideoStyle] = useState("cinematic");

  // Mock function to simulate content generation
  const generateContent = () => {
    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate placeholder content based on the active tab
      const content =
        activeTab === "image"
          ? `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80`
          : "https://example.com/placeholder-video.mp4";

      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const handleGenerate = () => {
    if (prompt.trim() === "") return;
    generateContent();
  };

  const handleSave = () => {
    if (!generatedContent) return;

    onGenerate({
      type: activeTab,
      url: generatedContent,
      prompt: prompt,
    });
  };

  const handleReset = () => {
    setPrompt("");
    setGeneratedContent(null);
  };

  return (
    <div className="w-full h-full bg-background rounded-lg border border-border p-4 flex flex-col">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as "image" | "video")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Image Generation
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video Generation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Create AI Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Style
                  </label>
                  <Select value={imageStyle} onValueChange={setImageStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photorealistic">
                        Photorealistic
                      </SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="3d">3D Render</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="sketch">Sketch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Aspect Ratio
                  </label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">Square (1:1)</SelectItem>
                      <SelectItem value="4:3">Standard (4:3)</SelectItem>
                      <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                      <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {generatedContent && activeTab === "image" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated Image</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <img
                    src={generatedContent}
                    alt="AI Generated"
                    className="w-full h-auto rounded-md object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Toggle aria-label="Adjust colors">
                    <Palette className="h-4 w-4 mr-2" />
                    Colors
                  </Toggle>
                  <Toggle aria-label="Adjust settings">
                    <Sliders className="h-4 w-4 mr-2" />
                    Adjust
                  </Toggle>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Undo className="h-4 w-4 mr-2" />
                    Undo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Redo className="h-4 w-4 mr-2" />
                    Redo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Create AI Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea
                  placeholder="Describe the video you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Style
                  </label>
                  <Select value={videoStyle} onValueChange={setVideoStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="vlog">Vlog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Duration (seconds)
                  </label>
                  <div className="pt-4 px-2">
                    <Slider
                      min={3}
                      max={15}
                      step={1}
                      value={[videoDuration]}
                      onValueChange={(value) => setVideoDuration(value[0])}
                    />
                  </div>
                  <div className="text-center mt-2">
                    {videoDuration} seconds
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {generatedContent && activeTab === "video" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated Video</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Placeholder for video - in a real app, this would be a video element */}
                  <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      Video Preview
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Toggle aria-label="Adjust colors">
                    <Palette className="h-4 w-4 mr-2" />
                    Colors
                  </Toggle>
                  <Toggle aria-label="Adjust settings">
                    <Sliders className="h-4 w-4 mr-2" />
                    Adjust
                  </Toggle>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Undo className="h-4 w-4 mr-2" />
                    Undo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Redo className="h-4 w-4 mr-2" />
                    Redo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-auto pt-4 flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex gap-2">
          {generatedContent && (
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          )}
          {!generatedContent ? (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || prompt.trim() === ""}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate {activeTab === "image" ? "Image" : "Video"}
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleSave}>Save & Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerationTool;
