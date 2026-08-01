export function parseHeadingsAndInjectIds(html = "") {
  if (!html) return { modifiedHtml: "", headings: [] };

  const headings = [];
  const slugCounts = {};

  const headingRegex = /<h([1-4])([^>]*)>([\s\S]*?)<\/h\1>/gi;

  const modifiedHtml = html.replace(
    headingRegex,
    (fullMatch, levelStr, attrs, innerContent) => {
      const level = Number.parseInt(levelStr, 10);
      const rawText = innerContent
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#039;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/\s+/g, " ")
        .trim();

      if (!rawText) return fullMatch;

      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      let id = idMatch ? idMatch[1] : null;

      if (!id) {
        let slug = rawText
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        if (!slug) slug = `section-${headings.length + 1}`;

        if (slugCounts[slug]) {
          slugCounts[slug]++;
          id = `${slug}-${slugCounts[slug]}`;
        } else {
          slugCounts[slug] = 1;
          id = slug;
        }

        attrs = ` id="${id}"${attrs}`;
      }

      headings.push({ id, text: rawText, level });
      return `<h${level}${attrs}>${innerContent}</h${level}>`;
    }
  );

  return { modifiedHtml, headings };
}
