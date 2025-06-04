import { openai } from "@ai-sdk/openai"
import { generateText, generateObject, experimental_generateImage } from "ai"
import type { NextRequest } from "next/server"
import { aiPrompts } from "@/lib/ai-prompts"
import { validateFormData, postContentSchema } from "@/lib/validation"
import type { Language } from "@/lib/translations"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = validateFormData(body)
    if (!validation.success) {
      return Response.json({ success: false, error: "Invalid input data" }, { status: 400 })
    }

    const { topic, platform, tone, industry, language = "en", context } = validation.data
    const prompts = aiPrompts[language as Language]

    // Generate image first
    const imagePrompt = prompts.imagePrompt(platform, topic, industry)

    const { image } = await experimental_generateImage({
      model: openai.image("dall-e-3"),
      prompt: imagePrompt,
      size: platform === "instagram" ? "1024x1024" : "1024x1792",
    })

    // Generate post content
    const { object: postContent } = await generateObject({
      model: openai("gpt-4o"),
      schema: postContentSchema,
      system: prompts.systemPrompt,
      prompt: prompts.generatePrompt(platform, topic, industry, tone, context),
    })

    // Generate additional marketing insights
    const { text: marketingInsights } = await generateText({
      model: openai("gpt-4o"),
      system: prompts.systemPrompt,
      prompt: prompts.insightsPrompt(platform, topic, industry),
    })

    return Response.json({
      success: true,
      data: {
        image: image.base64,
        content: postContent,
        marketingInsights,
        imagePrompt,
      },
    })
  } catch (error) {
    console.error("Error generating post:", error)
    return Response.json({ success: false, error: "Failed to generate post" }, { status: 500 })
  }
}
