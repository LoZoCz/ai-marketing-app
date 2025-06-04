export function downloadImage(base64Data: string, filename?: string): void {
  try {
    const link = document.createElement("a")
    link.href = `data:image/png;base64,${base64Data}`
    link.download = filename || `social-media-post-${Date.now()}.png`
    link.click()
  } catch (error) {
    console.error("Failed to download image:", error)
  }
}

export function downloadJSON(data: object, filename: string): void {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Failed to download JSON:", error)
  }
}
