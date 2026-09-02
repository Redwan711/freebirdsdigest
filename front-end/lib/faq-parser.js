/**
 * Parses raw text input (e.g. from WordPress ACF text area) into structured FAQ items.
 * Handles HTML tags, line breaks, and formats like:
 *   q: Question text?
 *   a: Answer text...
 * 
 *   Q1: Question?
 *   A1: Multi-line answer line 1
 *       Answer line 2
 * 
 * @param {string|Array<{question: string, answer: string}>} input
 * @returns {Array<{question: string, answer: string}>}
 */
export function parseFaqs(input) {
  if (!input) return [];

  // If already an array of FAQ objects
  if (Array.isArray(input)) {
    return input
      .filter(
        (item) =>
          item &&
          typeof item.question === "string" &&
          typeof item.answer === "string" &&
          item.question.trim() &&
          item.answer.trim()
      )
      .map((item) => ({
        question: cleanText(item.question),
        answer: cleanText(item.answer),
      }));
  }

  if (typeof input !== "string") return [];

  let text = input;

  // 1. Normalize HTML line breaks and paragraphs
  text = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<div[^>]*>/gi, "\n");

  // 2. Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // 3. Decode common HTML entities
  text = cleanText(text);

  const trimmed = text.trim();
  if (!trimmed) return [];

  const lines = trimmed.split(/\r?\n/);
  const results = [];
  let currentQ = null;
  let currentA = [];

  // Flexible prefix matching: q:, Q:, q1:, 1. Q:, Question:, Question 1:, Q.
  const qPrefixRegex = /^(?:\d+[\.\)]\s*)?(?:q\d*|question\s*\d*)\s*[:\.]\s*(.*)/i;
  // Flexible prefix matching: a:, A:, a1:, Answer:, Answer 1:, A.
  const aPrefixRegex = /^(?:a\d*|answer\s*\d*)\s*[:\.]\s*(.*)/i;

  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;

    const qMatch = cleanLine.match(qPrefixRegex);
    const aMatch = cleanLine.match(aPrefixRegex);

    if (qMatch && qMatch[1] !== undefined) {
      // Save previous FAQ if complete
      if (currentQ && currentA.length > 0) {
        results.push({
          question: currentQ.trim(),
          answer: currentA.join("\n").trim(),
        });
      }
      currentQ = qMatch[1];
      currentA = [];
    } else if (aMatch && aMatch[1] !== undefined) {
      currentA.push(aMatch[1]);
    } else if (currentA.length > 0) {
      // Continuation line for answer
      currentA.push(cleanLine);
    } else if (currentQ !== null) {
      // Continuation line for question
      currentQ += " " + cleanLine;
    }
  }

  // Push last item
  if (currentQ && currentA.length > 0) {
    results.push({
      question: currentQ.trim(),
      answer: currentA.join("\n").trim(),
    });
  }

  return results.filter((item) => item.question && item.answer);
}

function cleanText(str) {
  if (!str) return "";
  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}
