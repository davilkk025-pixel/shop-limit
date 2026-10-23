/**
 * Reading Time Calculation Utility
 * 
 * Computes estimated reading time based on word count and average human reading speed (~200 wpm).
 */
export function calculateReadingTime(
  content: string | (string | undefined | null)[],
  wordsPerMinute = 200
): string {
  let combinedText = '';

  if (Array.isArray(content)) {
    combinedText = content.filter(Boolean).join(' ');
  } else if (typeof content === 'string') {
    combinedText = content;
  }

  // Strip extraneous characters and split on whitespace
  const words = combinedText.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  if (wordCount === 0) {
    return '1 min read';
  }

  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}
