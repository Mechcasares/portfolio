// Stickers for project highlights. "Y Combinator S22" renders as a YC sticker.
export function Badge({ label }: { label: string }) {
  const yc = label.match(/^Y Combinator\s+(\S+)$/);
  if (!yc) return <span className="sticker sticker--warm">{label}</span>;
  return (
    <span className="yc-sticker" aria-label={`Y Combinator, batch ${yc[1]}`}>
      <svg className="yc-logo" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="4" fill="#f26522" />
        <path d="M9.6 8.2h3.1l3.3 6.6 3.3-6.6h3l-4.9 9.2v6.4h-2.8v-6.4z" fill="#fff" />
      </svg>
      <span className="yc-text">
        <span className="yc-small">Backed by</span>
        <span className="yc-name">Y Combinator</span>
      </span>
      <span className="yc-batch hand">{yc[1]}</span>
    </span>
  );
}
