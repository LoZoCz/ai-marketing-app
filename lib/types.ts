export interface PostContent {
  title: string
  caption: string
  hashtags: string[]
  bestTimeToPost: string
  contentStrategy: string
  targetAudience: string
  callToAction: string
}

export interface GeneratedPost {
  image: string
  content: PostContent
  marketingInsights: string
  imagePrompt: string
}

export interface Topic {
  title: string
  description: string
  bestDays: string[]
  hashtags: string[]
  contentType: string
}

export interface FormData {
  topic: string
  platform: string
  tone: string
  industry: string
  context: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type Language = "en" | "pl"
