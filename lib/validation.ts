import { z } from "zod"

// Input validation schemas
export const generatePostSchema = z.object({
  topic: z.string().min(1, "Topic is required").max(200, "Topic too long"),
  platform: z.enum(["instagram", "facebook", "linkedin", "twitter", "tiktok"]),
  tone: z.enum(["professional", "casual", "friendly", "inspiring", "humorous", "educational"]),
  industry: z.enum([
    "technology",
    "marketing",
    "finance",
    "healthcare",
    "education",
    "ecommerce",
    "fitness",
    "food",
    "travel",
    "fashion",
  ]),
  language: z.enum(["en", "pl"]).default("en"),
  context: z.string().max(500, "Context too long").optional(),
})

export const generateTopicsSchema = z.object({
  month: z.number().min(1).max(12),
  industry: z.enum([
    "technology",
    "marketing",
    "finance",
    "healthcare",
    "education",
    "ecommerce",
    "fitness",
    "food",
    "travel",
    "fashion",
  ]),
  platform: z.enum(["instagram", "facebook", "linkedin", "twitter", "tiktok"]),
  language: z.enum(["en", "pl"]).default("en"),
})

// AI response schemas
export const postContentSchema = z.object({
  title: z.string().describe("Catchy title for the post"),
  caption: z.string().describe("Engaging caption with emojis and hashtags"),
  hashtags: z.array(z.string()).describe("Relevant hashtags without # symbol"),
  bestTimeToPost: z.string().describe('Recommended time to post (e.g., "Tuesday 6-8 PM")'),
  contentStrategy: z.string().describe("Brief strategy note for this type of content"),
  targetAudience: z.string().describe("Who this post targets"),
  callToAction: z.string().describe("Clear call to action for engagement"),
})

export const topicsResponseSchema = z.object({
  topics: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      bestDays: z.array(z.string()),
      hashtags: z.array(z.string()),
      contentType: z.string(),
    }),
  ),
})

// Utility functions for validation
export function validateFormData(data: unknown) {
  return generatePostSchema.safeParse(data)
}

export function validateTopicsData(data: unknown) {
  return generateTopicsSchema.safeParse(data)
}
