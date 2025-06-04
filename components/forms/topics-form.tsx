"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, Lightbulb } from "lucide-react"
import type { FormData, Topic } from "@/lib/types"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface TopicsFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  monthlyTopics: Topic[]
  onGenerateTopics: () => void
  isGeneratingTopics: boolean
  language: Language
}

export function TopicsForm({
  formData,
  setFormData,
  selectedMonth,
  setSelectedMonth,
  monthlyTopics,
  onGenerateTopics,
  isGeneratingTopics,
  language,
}: TopicsFormProps) {
  const t = translations[language]

  return (
    <Card className="animate-slide-up shadow-2xl border-0 bg-card/90 backdrop-blur-sm h-fit">
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
          onClick={onGenerateTopics}
          disabled={isGeneratingTopics || !selectedMonth || !formData.industry || !formData.platform}
          className="w-full h-12"
          variant="outline"
        >
          {isGeneratingTopics ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t.generating}...
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
                onClick={() => setFormData({ ...formData, topic: topic.title })}
              >
                <h4 className="font-semibold text-base mb-2">{topic.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.hashtags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
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
  )
}
