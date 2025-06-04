"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import {
  Loader2,
  Download,
  Copy,
  Share2,
  Calendar,
  TrendingUp,
  Sparkles,
  Clock,
  Users,
  Target,
  Lightbulb,
  CalendarPlus,
  FileText,
  Zap,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { Language, translations } from "@/lib/translations";

interface PostContent {
  title: string;
  caption: string;
  hashtags: string[];
  bestTimeToPost: string;
  contentStrategy: string;
  targetAudience: string;
  callToAction: string;
}

interface GeneratedPost {
  image: string;
  content: PostContent;
  marketingInsights: string;
  imagePrompt: string;
}

interface Topic {
  title: string;
  description: string;
  bestDays: string[];
  hashtags: string[];
  contentType: string;
}

export default function SocialMediaGenerator() {
  const [language, setLanguage] = useState<Language>("en");
  const [formData, setFormData] = useState({
    topic: "",
    platform: "",
    tone: "",
    industry: "",
    context: "",
  });
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [monthlyTopics, setMonthlyTopics] = useState<Topic[]>([]);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const t = translations[language as keyof typeof translations];

  const handleGenerate = async () => {
    if (
      !formData.topic ||
      !formData.platform ||
      !formData.tone ||
      !formData.industry
    ) {
      alert("Please fill all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      const result = await response.json();
      if (result.success) {
        setGeneratedPost(result.data);
      } else {
        alert("Error generating post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateTopics = async () => {
    if (!selectedMonth || !formData.industry || !formData.platform) {
      alert("Please select month, industry, and platform");
      return;
    }

    setIsGeneratingTopics(true);
    try {
      const response = await fetch("/api/generate-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: Number.parseInt(selectedMonth),
          industry: formData.industry,
          platform: formData.platform,
          language,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMonthlyTopics(result.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGeneratingTopics(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadImage = () => {
    if (!generatedPost) return;

    const link = document.createElement("a");
    link.href = `data:image/png;base64,${generatedPost.image}`;
    link.download = `social-media-post-${Date.now()}.png`;
    link.click();
  };

  const addToGoogleCalendar = () => {
    if (!generatedPost) return;

    const title = encodeURIComponent(`Publish: ${generatedPost.content.title}`);
    const details = encodeURIComponent(
      `${generatedPost.content.caption}\n\nBest time: ${generatedPost.content.bestTimeToPost}`,
    );
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(url, "_blank");
  };

  const exportToNotion = () => {
    if (!generatedPost) return;

    const notionData = {
      title: generatedPost.content.title,
      content: generatedPost.content.caption,
      hashtags: generatedPost.content.hashtags.join(", "),
      strategy: generatedPost.content.contentStrategy,
      timing: generatedPost.content.bestTimeToPost,
    };

    const blob = new Blob([JSON.stringify(notionData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "notion-post-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-500">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="max-w-8xl mx-auto flex lg:justify-between justify-center items-center flex-col lg:flex-row gap-6">
          <div className="flex justify-center lg:justify-start items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="">
              <h1 className="lg:text-left text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Social Media Generator
              </h1>
              <p className="text-sm text-muted-foreground lg:text-left text-center">
                Powered by OpenAI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector
              language={language}
              onLanguageChange={setLanguage}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-8xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold text-foreground mb-4 leading-tight">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="animate-slide-up shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  {t.postConfig}
                </CardTitle>
                <CardDescription className="text-base">
                  {t.postConfigDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="topic" className="text-base font-medium">
                    {t.topic}
                  </Label>
                  <Input
                    id="topic"
                    placeholder={t.topicPlaceholder}
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500 border-2"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">{t.context}</Label>
                  <Textarea
                    placeholder={t.contextPlaceholder}
                    value={formData.context}
                    onChange={(e) =>
                      setFormData({ ...formData, context: e.target.value })
                    }
                    className="min-h-[100px] text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500 border-2 resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t.contextDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      {t.platform}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, platform: value })
                      }
                    >
                      <SelectTrigger className="h-12 text-base border-2">
                        <SelectValue placeholder={t.selectPlatform} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">📸 Instagram</SelectItem>
                        <SelectItem value="facebook">👥 Facebook</SelectItem>
                        <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                        <SelectItem value="twitter">🐦 Twitter/X</SelectItem>
                        <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">{t.tone}</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, tone: value })
                      }
                    >
                      <SelectTrigger className="h-12 text-base border-2">
                        <SelectValue placeholder={t.selectTone} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.tones).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">{t.industry}</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, industry: value })
                    }
                  >
                    <SelectTrigger className="h-12 text-base border-2">
                      <SelectValue placeholder={t.selectIndustry} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.industries).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      <span className="loading-dots">{t.generating}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-3" />
                      {t.generatePost}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Topics Generator */}
            <Card className="animate-slide-up shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  {t.monthlyTopics}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={setSelectedMonth}>
                  <SelectTrigger className="h-12 text-base border-2">
                    <SelectValue placeholder={t.selectMonth} />
                  </SelectTrigger>
                  <SelectContent>
                    {t.months.map((month, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleGenerateTopics}
                  disabled={
                    isGeneratingTopics ||
                    !selectedMonth ||
                    !formData.industry ||
                    !formData.platform
                  }
                  className="w-full h-12"
                  variant="outline"
                >
                  {isGeneratingTopics ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.generateTopics}
                    </>
                  )}
                </Button>

                {monthlyTopics.length > 0 && (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {monthlyTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="p-4 border-2 rounded-xl cursor-pointer hover:bg-accent transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                        onClick={() =>
                          setFormData({ ...formData, topic: topic.title })
                        }
                      >
                        <h4 className="font-semibold text-base mb-2">
                          {topic.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {topic.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {topic.hashtags.slice(0, 3).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div>
            {generatedPost ? (
              <div className="space-y-8">
                {/* Generated Image */}
                <Card className="animate-scale-in shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-xl">
                      <span className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-purple-500" />
                        {t.generatedImage}
                      </span>
                      <Button
                        onClick={downloadImage}
                        variant="outline"
                        className="hover:scale-105 transition-transform size-10 sm:size-auto flex gap-2"
                      >
                        <Download className="size-4" />
                        <span className="hidden sm:block">{t.download}</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
                      <Image
                        src={`data:image/png;base64,${generatedPost.image}`}
                        alt="Generated post image"
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Post Management */}
                <Card className="animate-scale-in shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <BarChart3 className="w-6 h-6 text-green-500" />
                      {t.postManagement}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button
                        onClick={addToGoogleCalendar}
                        variant="outline"
                        className="h-12 hover:scale-105 transition-transform"
                      >
                        <CalendarPlus className="w-4 h-4 mr-2" />
                        {t.addToCalendar}
                      </Button>
                      <Button
                        onClick={exportToNotion}
                        variant="outline"
                        className="h-12 hover:scale-105 transition-transform"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {t.exportToNotion}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 hover:scale-105 transition-transform"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {t.schedulePost}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 hover:scale-105 transition-transform"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {t.analyzePerformance}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Post Content */}
                <Card className="animate-scale-in shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Share2 className="w-6 h-6 text-blue-500" />
                      {t.postContent}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        {t.title_field}
                      </Label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border-2 text-base">
                          {generatedPost.content.title}
                        </div>
                        <Button
                          onClick={() =>
                            copyToClipboard(generatedPost.content.title)
                          }
                          variant="outline"
                          size="sm"
                          className="h-12 w-12"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t.description}
                      </Label>
                      <div className="flex gap-3">
                        <Textarea
                          value={generatedPost.content.caption}
                          readOnly
                          className="flex-1 min-h-[140px] text-base bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 resize-none"
                        />
                        <Button
                          onClick={() =>
                            copyToClipboard(generatedPost.content.caption)
                          }
                          variant="outline"
                          size="sm"
                          className="h-12 w-12"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t.hashtags}
                      </Label>
                      <div className="flex flex-wrap gap-3">
                        {generatedPost.content.hashtags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="hover:scale-105 transition-transform cursor-pointer text-sm px-3 py-1"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            generatedPost.content.hashtags
                              .map((tag) => `#${tag}`)
                              .join(" "),
                          )
                        }
                        variant="outline"
                        className="h-10"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {t.copyHashtags}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t.callToAction}
                      </Label>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 text-base">
                        {generatedPost.content.callToAction}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Marketing Strategy */}
                <Card className="animate-scale-in shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Users className="w-6 h-6 text-orange-500" />
                      {t.marketingStrategy}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2">
                        <Label className="text-base font-semibold text-green-800 dark:text-green-300 flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5" />
                          {t.bestTime}
                        </Label>
                        <p className="text-green-700 dark:text-green-400 text-base">
                          {generatedPost.content.bestTimeToPost}
                        </p>
                      </div>
                      <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2">
                        <Label className="text-base font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5" />
                          {t.targetAudience}
                        </Label>
                        <p className="text-blue-700 dark:text-blue-400 text-base">
                          {generatedPost.content.targetAudience}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2">
                      <Label className="text-base font-semibold text-purple-800 dark:text-purple-300 mb-2 block">
                        {t.contentStrategy}
                      </Label>
                      <p className="text-purple-700 dark:text-purple-400 text-base">
                        {generatedPost.content.contentStrategy}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        {t.marketingInsights}
                      </Label>
                      <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl border-2">
                        <pre className="whitespace-pre-wrap text-base text-foreground leading-relaxed">
                          {generatedPost.marketingInsights}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Card className="p-12 text-center shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t.tempCard.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t.tempCard.desc}
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
