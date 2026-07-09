type Block = { type: "h2" | "p"; text: string };

function parse(content: string): Block[] {
  const blocks: Block[] = [];
  let paragraphLines: string[] = [];

  function flushParagraph() {
    const text = paragraphLines.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
    paragraphLines = [];
  }

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line === "") {
      flushParagraph();
    } else {
      paragraphLines.push(line);
    }
  }
  flushParagraph();

  return blocks;
}

export function LiteMarkdown({ content }: { content: string }) {
  const blocks = parse(content);

  return (
    <div className="measure flex flex-col gap-5">
      {blocks.map((block, i) =>
        block.type === "h2" ? (
          <h2 key={i} className="mt-6 font-display text-2xl text-ink first:mt-0">
            {block.text}
          </h2>
        ) : (
          <p key={i} className="text-[15px] leading-relaxed text-ink/70">
            {block.text}
          </p>
        )
      )}
    </div>
  );
}
