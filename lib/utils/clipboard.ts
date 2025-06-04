export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "absolute"
      textArea.style.left = "-999999px"
      document.body.prepend(textArea)
      textArea.select()
      document.execCommand("copy")
      textArea.remove()
      return true
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error)
    return false
  }
}
