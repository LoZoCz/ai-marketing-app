"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp, Zap } from "lucide-react"
import type { FormData } from "@/lib/types"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface PostFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  onGenerate: () => void
  isGenerating: boolean
  language: Language
}

export function PostForm({ formData, setFormData, onGenerate, isGenerating, language }: PostFormProps) {
  const t = translations[language]

  return (
    <Card className="animate-slide-up shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          {t.postConfig}
        </CardTitle>
        <CardDescription className="text-base">{t.postConfigDesc}</CardDescription>
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
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500 border-2"
            maxLength={200}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">{t.context}</Label>
          <Textarea
            placeholder={t.contextPlaceholder}
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            className="min-h-[100px] text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500 border-2 resize-none"
            maxLength={500}
          />
          <p className="text-sm text-muted-foreground">{t.contextDesc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">{t.platform}</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, platform: value })}>
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
            <Select onValueChange={(value) => setFormData({ ...formData, tone: value })}>
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

          <div className="space-y-3">
            <Label className="text-base font-medium">{t.industry}</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
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
        </div>

        <Button
          onClick={onGenerate}
          disabled={isGenerating || !formData.topic || !formData.platform || !formData.tone || !formData.industry}
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
  )
}
