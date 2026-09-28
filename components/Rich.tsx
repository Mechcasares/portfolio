import { Fragment } from "react";

/** Renders copy where **keywords** become bold with a soft highlighter stroke. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <strong key={i} className="kw">{part}</strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text version, for alt text, metadata and keys. */
export const plain = (text: string) => text.replace(/\*\*(.+?)\*\*/g, "$1");
