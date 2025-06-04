export function addToGoogleCalendar(title: string, description: string, bestTime?: string): void {
  try {
    const encodedTitle = encodeURIComponent(`Publish: ${title}`)
    const encodedDetails = encodeURIComponent(`${description}${bestTime ? `\n\nBest time: ${bestTime}` : ""}`)
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}`
    window.open(url, "_blank", "noopener,noreferrer")
  } catch (error) {
    console.error("Failed to add to calendar:", error)
  }
}
