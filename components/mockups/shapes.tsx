// Minimal product silhouettes used inside the retail mockups.

export type Shape = "shirt" | "trousers" | "dress" | "bag" | "sandal" | "hat" | "tote" | "top";

const paths: Record<Shape, string> = {
  shirt:
    "M35 14 L22 20 L10 38 L20 45 L27 36 L27 88 L73 88 L73 36 L80 45 L90 38 L78 20 L65 14 C62 20 56 23 50 23 C44 23 38 20 35 14 Z",
  trousers: "M28 10 L72 10 L76 90 L58 90 L50 40 L42 90 L24 90 Z",
  dress:
    "M40 8 L60 8 L58 24 L64 38 L80 90 L20 90 L36 38 L42 24 Z",
  bag: "M22 38 L78 38 L84 88 L16 88 Z M36 38 C36 18 64 18 64 38 L58 38 C58 26 42 26 42 38 Z",
  sandal:
    "M12 70 C12 60 30 58 48 60 L86 64 C92 65 92 76 86 77 L20 80 C14 80 12 76 12 70 Z M40 60 L50 44 L58 44 L54 62 Z",
  hat: "M8 66 C8 58 30 56 50 56 C70 56 92 58 92 66 C92 72 70 74 50 74 C30 74 8 72 8 66 Z M30 58 C30 36 38 28 50 28 C62 28 70 36 70 58 Z",
  tote: "M20 34 L80 34 L80 90 L20 90 Z M34 34 L38 12 L44 12 L42 34 Z M58 34 L56 12 L62 12 L66 34 Z",
  top: "M30 16 L42 16 C44 22 56 22 58 16 L70 16 L74 48 L70 90 L30 90 L26 48 Z",
};

export function ProductShape({ shape, color }: { shape: Shape; color: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d={paths[shape]} fill={color} fillRule="evenodd" />
    </svg>
  );
}
