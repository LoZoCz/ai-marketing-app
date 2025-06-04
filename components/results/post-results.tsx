"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Copy, Share2, Clock, Users, Target, CalendarPlus, FileText, BarChart3, Sparkles } from "lucide-react"
import Image from "next/image"
import { translations } from "@/lib/translations"
import { copyToClipboard } from "@/lib/utils/clipboard"
import { downloadImage, downloadJSON } from "@/lib/utils/download"
import { addToGoogleCalendar } from "@/lib/utils/calendar"
import type { GeneratedPost, Language } from "@/lib/types"

interface PostResultsProps {
  generatedPost: GeneratedPost
  language: Language
}

export function PostResults({ generatedPost, language }: PostResultsProps) {
  const t = translations[language]

  const handleCopyToClipboard = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      alert(t.copiedToClipboard)
    }
  }

  const handleDownloadImage = () => {
    downloadImage(generatedPost.image)
  }

  const handleAddToCalendar = () => {
    addToGoogleCalendar(
      generatedPost.content.title,
      generatedPost.content.caption,
      generatedPost.content.bestTimeToPost,
    )
  }

  const handleExportToNotion = () => {
    const notionData = {
      title: generatedPost.content.title,
      content: generatedPost.content.caption,
      hashtags: generatedPost.content.hashtags.join(", "),
      strategy: generatedPost.content.contentStrategy,
      timing: generatedPost.content.bestTimeToPost,
    }
    downloadJSON(notionData, "notion-post-data.json")
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Generated Image */}
      <Card className="animate-scale-in shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-xl">
            <span className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-500" />
              {t.generatedImage}
            </span>
            <Button
              onClick={handleDownloadImage}
              variant="outline"
              className="hover:scale-105 transition-transform h-10"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.download}
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
              onClick={handleAddToCalendar}
              variant="outline"
              className="h-12 hover:scale-105 transition-transform"
            >
              <CalendarPlus className="w-4 h-4 mr-2" />
              {t.addToCalendar}
            </Button>
            <Button
              onClick={handleExportToNotion}
              variant="outline"
              className="h-12 hover:scale-105 transition-transform"
            >
              <FileText className="w-4 h-4 mr-2" />
              {t.exportToNotion}
            </Button>
            <Button variant="outline" className="h-12 hover:scale-105 transition-transform">
              <Clock className="w-4 h-4 mr-2" />
              {t.schedulePost}
            </Button>
            <Button variant="outline" className="h-12 hover:scale-105 transition-transform">
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
                onClick={() => handleCopyToClipboard(generatedPost.content.title)}
                variant="outline"
                size="sm"
                className="h-12 w-12"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">{t.description}</Label>
            <div className="flex gap-3">
              <Textarea
                value={generatedPost.content.caption}
                readOnly
                className="flex-1 min-h-[140px] text-base bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 resize-none"
              />
              <Button
                onClick={() => handleCopyToClipboard(generatedPost.content.caption)}
                variant="outline"
                size="sm"
                className="h-12 w-12"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">{t.hashtags}</Label>
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
              onClick={() => handleCopyToClipboard(generatedPost.content.hashtags.map((tag) => `#${tag}`).join(" "))}
              variant="outline"
              className="h-10"
            >
              <Copy className="w-4 h-4 mr-2" />
              {t.copyHashtags}
            </Button>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">{t.callToAction}</Label>
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
              <p className="text-green-700 dark:text-green-400 text-base">{generatedPost.content.bestTimeToPost}</p>
            </div>
            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2">
              <Label className="text-base font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                {t.targetAudience}
              </Label>
              <p className="text-blue-700 dark:text-blue-400 text-base">{generatedPost.content.targetAudience}</p>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2">
            <Label className="text-base font-semibold text-purple-800 dark:text-purple-300 mb-2 block">
              {t.contentStrategy}
            </Label>
            <p className="text-purple-700 dark:text-purple-400 text-base">{generatedPost.content.contentStrategy}</p>
          </div>

          <Separator />

          <div>
            <Label className="text-base font-semibold mb-3 block">{t.marketingInsights}</Label>
            <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl border-2">
              <pre className="whitespace-pre-wrap text-base text-foreground leading-relaxed">
                {generatedPost.marketingInsights}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
