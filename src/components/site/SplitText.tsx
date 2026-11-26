import type { ElementType, ReactNode } from "react";

type Part = string | { em: string };

/** Headline revealed word by word through a mask. `{ em }` parts get the gradient accent. */
export function SplitText({ as: Tag = "h2", parts, className = "", delay = 0 }: { as?: ElementType; parts: Part[]; className?: string; delay?: number }) {
  let i = 0;
  const nodes: ReactNode[] = [];
  parts.forEach((p, pi) => {
    const isEm = typeof p !== "string";
    const words = (isEm ? p.em : p).split(" ").filter(Boolean);
    words.forEach((w, wi) => {
      nodes.push(
        <span key={`${pi}-${wi}`} className="w">
          <span
            style={{ ["--i" as string]: i++ }}
            className={[
              isEm && w !== "&" ? "text-gradient italic" : "",
              w === "&" ? "font-display not-italic font-normal text-current" : "",
            ].filter(Boolean).join(" ")}
          >
            {w}
          </span>
        </span>,
        " ",
      );
    });
  });
  const text = parts.map((p) => (typeof p === "string" ? p : p.em)).join(" ");
  return (
    <Tag className={`split ${className}`} style={{ ["--d" as string]: `${delay}ms` }} aria-label={text}>
      <span aria-hidden="true">{nodes}</span>
    </Tag>
  );
}
