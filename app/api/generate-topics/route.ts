import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import type { NextRequest } from "next/server"
import { aiPrompts, monthNames } from "@/lib/ai-prompts"
import { validateTopicsData, topicsResponseSchema } from "@/lib/validation"
import type { Language } from "@/lib/translations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = validateTopicsData(body)
    if (!validation.success) {
      return Response.json({ success: false, error: "Invalid input data" }, { status: 400 })
    }

    const { month, industry, platform, language = "en" } = validation.data
    const prompts = aiPrompts[language as Language]
    const monthName = monthNames[language as Language][month - 1]

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: topicsResponseSchema,
      system: prompts.systemPrompt,
      prompt: prompts.topicsPrompt(monthName, industry, platform),
    })

    return Response.json({ success: true, data: object.topics })
  } catch (error) {
    console.error("Error generating topics:", error)
    return Response.json({ success: false, error: "Failed to generate topics" }, { status: 500 })
  }
}
