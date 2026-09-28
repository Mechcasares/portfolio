import Image from "next/image";
import type { Img } from "@/content/projects";

// A real screenshot filling its frame. `contain` images sit on the canvas with breathing room.
export function Visual({ image, priority = false, sizes = "100vw" }: { image: Img; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={image.fit === "contain" ? "img-contain" : "img-cover"}
    />
  );
}
