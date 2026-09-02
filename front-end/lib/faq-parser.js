/**
 * Parses raw text input (e.g. from WordPress ACF text area) into structured FAQ items.
 * Handles formats like:
 *   q: Question text?
 *   a: Answer text...
 * 
 *   Q: Question?
 *   A: Multi-line answer line 1
 *      Answer line 2
 * 
 * @param {string|Array<{question: string, answer: string}>} input
 * @returns {Array<{question: string, answer: string}>}
 */
export function parseFaqs(input) {
  if (!input) return [];

  // If already an array of FAQ objects
  if (Array.isArray(input)) {
    return input.filter(
      (item) => item && typeof item.question === "string" && typeof item.answer === "string" && item.question.trim() && item.answer.trim()
    ).map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));
  }

  if (typeof input !== "string") return [];

  const trimmed = input.trim();
  if (!trimmed) return [];

  const lines = trimmed.split(/\r?\n/);
  const results = [];
  let currentQ = null;
  let currentA = [];

  const qPrefixRegex = /^(?:q|question)\s*:\s*(.*)/i;
  const aPrefixRegex = /^(?:a|answer)\s*:\s*(.*)/i;

  for (const line of lines) {
    const qMatch = line.match(qPrefixRegex);
    const aMatch = line.match(aPrefixRegex);

    if (qMatch) {
      // Save previous FAQ if complete
      if (currentQ && currentA.length > 0) {
        results.push({
          question: currentQ.trim(),
          answer: currentA.join("\n").trim(),
        });
      }
      currentQ = qMatch[1];
      currentA = [];
    } else if (aMatch) {
      currentA.push(aMatch[1]);
    } else if (currentA.length > 0) {
      // Continuation line for answer
      currentA.push(line);
    } else if (currentQ !== null) {
      // Continuation line for question
      if (line.trim()) {
        currentQ += " " + line.trim();
      }
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
