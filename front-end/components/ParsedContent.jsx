import Image from "next/image";

export default function ParsedContent({ html }) {
  if (!html) return null;

  // Regex to match <img> tags with attributes
  const imgRegex = /<img\s+([^>]*)\/?>/gi;
  const elements = [];
  let lastIndex = 0;
  let match;

  while (true) {
    match = imgRegex.exec(html);
    if (match === null) break;

    const textBefore = html.substring(lastIndex, match.index);
    if (textBefore) {
      elements.push(
        <div
          key={`text-${lastIndex}`}
          dangerouslySetInnerHTML={{ __html: textBefore }}
        />
      );
    }

    const attrString = match[1];

    // Helper function to parse HTML attributes safely
    const getAttr = (name) => {
      const attrRegex = new RegExp(
        `${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
        "i"
      );
      const attrMatch = attrString.match(attrRegex);
      return attrMatch ? attrMatch[1] || attrMatch[2] || attrMatch[3] : null;
    };

    const src = getAttr("src");
    const alt = getAttr("alt") || "";
    const width = getAttr("width");
    const height = getAttr("height");
    const className = getAttr("class") || getAttr("className") || "";

    if (src) {
      const parsedWidth = width ? Number.parseInt(width, 10) : 1200;
      const parsedHeight = height ? Number.parseInt(height, 10) : 675;

      elements.push(
        <div
          key={`img-block-${match.index}`}
          className="block w-full clear-both"
        >
          <Image
            src={src}
            alt={alt}
            width={Number.isNaN(parsedWidth) ? 1200 : parsedWidth}
            height={Number.isNaN(parsedHeight) ? 675 : parsedHeight}
            className={`block w-full h-auto object-cover rounded-3xl border border-brandborder/60 shadow-sm ${className}`}
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 896px"
          />
        </div>
      );
    }

    lastIndex = imgRegex.lastIndex;
  }

  const remainingText = html.substring(lastIndex);
  if (remainingText) {
    elements.push(
      <div
        key={`text-${lastIndex}`}
        dangerouslySetInnerHTML={{ __html: remainingText }}
      />
    );
  }

  return <>{elements}</>;
}
