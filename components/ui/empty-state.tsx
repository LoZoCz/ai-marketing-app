"use client"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { translations } from "@/lib/translations"
import type { Language } from "@/lib/types"

interface EmptyStateProps {
  language: Language
}

export function EmptyState({ language }: EmptyStateProps) {
  const t = translations[language]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-12 text-center shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4">{t.readyToCreate}</h3>
        <p className="text-muted-foreground text-lg leading-relaxed">{t.readyToCreateDesc}</p>
      </Card>
    </div>
  )
}
