# 🚀 AI Social Media Generator

> **Generate professional social media posts with artificial intelligence**

A modern web application using OpenAI to automatically generate social media content along with images, marketing strategies, and insights. The perfect tool for marketers, entrepreneurs, and content creators.

## ✨ Features

### 🎯 **Post Generation**

- **Automated content creation** - AI generates titles, descriptions, and call-to-actions
- **Image generation** - DALL-E 3 creates professional graphics
- **Strategic hashtags** - 8-12 optimized hashtags
- **Timing recommendations** - best posting hours
- **Marketing insights** - analysis and strategic tips

### 🌍 **Multilingual Support**

- **English and Polish** - full support for both languages
- **Native AI prompts** - AI responds in the selected language
- **UI localization** - all interface elements translated

### 📱 **Social Media Platforms**

- 📸 **Instagram** - square posts 1024x1024
- 👥 **Facebook** - algorithm-optimized content
- 💼 **LinkedIn** - professional business tone
- 🐦 **Twitter/X** - short, engaging content
- 🎵 **TikTok** - trends and viral content

### 🎨 **Personalization**

- **6 communication tones** - professional, casual, friendly, inspiring, humorous, educational
- **10 industries** - technology, marketing, finance, healthcare, education, e-commerce, fitness, food, travel, fashion
- **Additional context** - personalized prompts for better results

### 📅 **Monthly Topics**

- **Seasonal suggestions** - topics adapted to the month
- **Holidays and events** - consideration of marketing calendar
- **Industry trends** - current topics for each industry

### 🛠️ **Productivity Tools**

- **Copy to clipboard** - quick copying of content and hashtags
- **Image download** - high-quality PNG
- **Export to Google Calendar** - publication planning
- **Export to Notion** - JSON with post data
- **Dark/Light Mode** - theme switching

## 🚀 Quick Start

### Requirements

- **Node.js** 18.0 or newer
- **npm** or **yarn**
- **OpenAI API Key** (required!)

### 1. Clone the Repository

```bash
git clone https://github.com/LoZoCz/ai-marketing-app.git
cd ai-social-media-generator
```

### 2. Install Dependencies

```bash
npm install

# or

yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env

# REQUIRED: OpenAI API Key

OPENAI_API_KEY=sk-your-openai-api-key-here

# OPTIONAL: Other configurations

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **IMPORTANT**: You must add your own OpenAI API key! The application won't work without it.

### 4. Run the Application

```bash
npm run dev

# or

yarn dev
```

The application will be available at: `http://localhost:3000`

## 🔑 How to Get an OpenAI API Key

1. **Register** at [platform.openai.com](https://platform.openai.com)
2. **Go to API Keys** in account settings
3. **Create a new key** - click "Create new secret key"
4. **Copy the key** and add it to your `.env.local` file
5. **Add funds** to your OpenAI account (required to use the API)

> 💡 **Tip**: The API key starts with `sk-` and is about 50 characters long.

## 📁 Project Structure

```
ai-social-media-generator/
├── app/ # Next.js App Router
│ ├── api/ # API Routes
│ │ ├── generate-post/ # Post generation
│ │ └── generate-topics/ # Topics generation
│ ├── globals.css # Global styles
│ ├── layout.tsx # Main layout
│ └── page.tsx # Main page
├── components/ # React components
│ ├── forms/ # Forms
│ │ ├── post-form.tsx # Post form
│ │ └── topics-form.tsx # Topics form
│ ├── results/ # Results
│ │ └── post-results.tsx # Results display
│ ├── ui/ # UI components (shadcn/ui)
│ └── theme-provider.tsx # Theme provider
├── lib/ # Libraries and utilities
│ ├── utils/ # Helper functions
│ │ ├── clipboard.ts # Copy to clipboard
│ │ ├── download.ts # File downloads
│ │ └── calendar.ts # Calendar integration
│ ├── ai-prompts.ts # AI prompts
│ ├── translations.ts # Translations
│ ├── types.ts # TypeScript types
│ └── validation.ts # Data validation
├── .env.local # Environment variables (create this!)
├── package.json # Dependencies
└── README.md # This file
```

## 🔧 Technologies

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **next-themes** - Dark/Light mode

### Backend

- **Next.js API Routes** - Serverless functions
- **AI SDK** - OpenAI integration
- **Zod** - Schema validation
- **OpenAI API** - GPT-4 and DALL-E 3

### Security

- **Input validation** - Validation of all input data
- **Rate limiting** - API time constraints
- **Error handling** - Error management
- **Type safety** - Full TypeScript typing

## 📖 How to Use

### 1. Fill Out the Form

- **Post topic** - describe what the post should be about
- **Platform** - choose the target platform
- **Communication tone** - select the style of communication
- **Industry** - specify the business sector
- **Context** (optional) - add details about the brand

### 2. Generate Post

- Click **"Generate Post"**
- Wait for the AI (30-60 seconds)
- Receive a complete post with an image

### 3. Manage Results

- **Copy content** - quick copy to clipboard
- **Download image** - high-quality PNG
- **Add to calendar** - schedule publication
- **Export data** - JSON for Notion

### 4. Monthly Topics

- Select **month** and **industry**
- Generate **8-10 topics**
- Click a topic to **fill the form**

## 🎯 Usage Examples

### Marketing Agency

```
Topic: "Digital Marketing Trends 2024"
Platform: LinkedIn
Tone: Professional
Industry: Marketing
Context: "B2B marketing agency specializing in tech"
```

### Restaurant

```
Topic: "New seasonal pumpkin dish"
Platform: Instagram
Tone: Friendly
Industry: Food
Context: "Italian restaurant in downtown area"
```

### Tech Startup

```
Topic: "How AI is changing the future of work"
Platform: Twitter
Tone: Inspiring
Industry: Technology
Context: "Startup developing AI tools for business"
```

## 🔒 Security and Privacy

- **API Key** - stored locally in `.env.local`
- **No logging** - we don't store user data
- **Validation** - all data is validated
- **HTTPS** - secure connections (in production)
- **Rate limiting** - protection against abuse

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub** - push your code to a repository
2. **Connect to Vercel** - import the project
3. **Add variables** - set `OPENAI_API_KEY` in settings
4. **Deploy** - automatic deployment

### Other Platforms

- **Netlify** - supports Next.js
- **Railway** - simple deployment
- **DigitalOcean** - App Platform

## 📊 Costs

### OpenAI API

- **GPT-4** - ~$0.03 per 1K tokens (input)
- **DALL-E 3** - ~$0.04 per 1024x1024 image
- **Average cost** - ~$0.10-0.15 per complete post

### Hosting

- **Vercel** - free tier for personal projects

## 🤝 Support

### Installation Issues

1. **Check Node.js** - `node --version` (min. 18.0)
2. **Check API key** - is it set correctly
3. **Check funds** - do you have credits on your OpenAI account
4. **Check logs** - `npm run dev` will show errors

### Common Problems

**"Failed to generate post"**

- Check your OpenAI API key
- Check your OpenAI account balance
- Check your internet connection

**"Please fill all required fields"**

- Fill in all required fields
- Check if platform, tone, and industry are selected

**TypeScript errors**

- Run `npm run build` to check for errors
- Check if all types are correct

## 📝 License

MIT License - you can freely use, modify, and distribute.

## 🙏 Acknowledgements

- **OpenAI** - for the amazing API
- **Vercel** - for Next.js and hosting
- **shadcn** - for beautiful UI components
- **Tailwind CSS** - for the great styling system

---

**Created with ❤️ for the marketing and content creator community**

> 💡 **Tip**: If you like the project, leave a ⭐ on GitHub!

## 🔗 Links

- [OpenAI Platform](https://platform.openai.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel](https://vercel.com)

---

**Last updated**: June 2025
**Version**: 1.0.0
**Author**: Mateusz Czernik
