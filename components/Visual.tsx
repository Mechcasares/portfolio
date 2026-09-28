import Image from "next/image";
import type { Visual as VisualType } from "@/content/projects";
import { Mock } from "./mockups";

// Renders either a real screenshot or a built-in mockup, filling its frame.
export function Visual({ visual, priority = false, sizes = "100vw" }: { visual: VisualType; priority?: boolean; sizes?: string }) {
  if (visual.kind === "image") {
    return (
      <Image
        src={visual.src}
        alt={visual.alt}
        width={visual.width}
        height={visual.height}
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return (
    <div role="img" aria-label={visual.caption ?? "Product interface"} style={{ width: "100%", height: "100%" }}>
      <Mock name={visual.mock} />
    </div>
  );
}
