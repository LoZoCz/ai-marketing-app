export const aiPrompts = {
  en: {
    systemPrompt: "You are an expert social media marketing strategist and content creator. Always respond in English.",
    generatePrompt: (platform: string, topic: string, industry: string, tone: string, context?: string) =>
      `Create a ${tone} ${platform} post about ${topic} for ${industry} industry.
      ${context ? `Additional context: ${context}` : ""}
      
      Requirements:
      - Platform: ${platform}
      - Topic: ${topic}
      - Industry: ${industry}
      - Tone: ${tone}
      - Include relevant emojis
      - Add 8-12 strategic hashtags
      - Suggest optimal posting time based on platform and audience
      - Provide content strategy insights
      - Include strong call to action
      - IMPORTANT: Respond entirely in English
      
      Make it engaging, authentic, and optimized for ${platform} algorithm.`,
    insightsPrompt: (platform: string, topic: string, industry: string) =>
      `As an AI marketing expert, provide 3-4 strategic insights for this ${platform} post about ${topic} in ${industry}. Include:
      - Content performance predictions
      - Audience engagement tips
      - Cross-platform promotion ideas
      - Metrics to track
      
      IMPORTANT: Respond entirely in English.`,
    imagePrompt: (platform: string, topic: string, industry: string) =>
      `Create a professional, eye-catching ${platform} post image about ${topic} for ${industry} industry. Modern, clean design with vibrant colors. High quality, social media optimized.`,
    topicsPrompt: (month: string, industry: string, platform: string) =>
      `Generate 8-10 best post topics for ${platform} in ${industry} industry for ${month}.
       Consider seasonality, holidays, trends, and events characteristic for this month.
       For each topic provide title, description, best days to post, hashtags, and content type.
       IMPORTANT: Respond entirely in English.`,
  },
  pl: {
    systemPrompt:
      "Jesteś ekspertem od strategii marketingu w mediach społecznościowych i tworzenia treści. Zawsze odpowiadaj w języku polskim.",
    generatePrompt: (platform: string, topic: string, industry: string, tone: string, context?: string) =>
      `Stwórz ${tone} post na ${platform} o temacie ${topic} dla branży ${industry}.
      ${context ? `Dodatkowy kontekst: ${context}` : ""}
      
      Wymagania:
      - Platforma: ${platform}
      - Temat: ${topic}
      - Branża: ${industry}
      - Ton: ${tone}
      - Dodaj odpowiednie emotikony
      - Dodaj 8-12 strategicznych hashtagów
      - Zasugeruj optymalny czas publikacji
      - Podaj insights strategii contentu
      - Dodaj silne call to action
      - WAŻNE: Odpowiedz całkowicie w języku polskim
      
      Zrób to angażujące, autentyczne i zoptymalizowane pod algorytm ${platform}.`,
    insightsPrompt: (platform: string, topic: string, industry: string) =>
      `Jako ekspert AI marketingu, podaj 3-4 strategiczne insights dla tego posta na ${platform} o ${topic} w branży ${industry}. Uwzględnij:
      - Przewidywania wydajności treści
      - Wskazówki dotyczące zaangażowania odbiorców
      - Pomysły na promocję cross-platform
      - Metryki do śledzenia
      
      WAŻNE: Odpowiedz całkowicie w języku polskim.`,
    imagePrompt: (platform: string, topic: string, industry: string) =>
      `Stwórz profesjonalny, przyciągający wzrok obraz posta na ${platform} o temacie ${topic} dla branży ${industry}. Nowoczesny, czysty design z żywymi kolorami. Wysoka jakość, zoptymalizowany pod social media.`,
    topicsPrompt: (month: string, industry: string, platform: string) =>
      `Wygeneruj 8-10 najlepszych tematów postów na ${platform} dla branży ${industry} na miesiąc ${month}. 
       Uwzględnij sezonowość, święta, trendy i wydarzenia charakterystyczne dla tego miesiąca.
       Dla każdego tematu podaj tytuł, opis, najlepsze dni do publikacji, hashtagi i typ contentu.
       WAŻNE: Odpowiedz całkowicie w języku polskim.`,
  },
} as const

export const monthNames = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  pl: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
} as const
