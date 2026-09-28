import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource/kalam/400.css";
import "@fontsource/kalam/700.css";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { MotionProvider } from "@/components/motion";
import { site } from "@/content/site";
import { plain } from "@/components/Rich";

export const metadata: Metadata = {
  title: site.name,
  description: `${site.role} in ${site.location}. ${plain(site.hero.supporting)}`,
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip" href="#main">Skip to content</a>
        <div className="paper" aria-hidden="true" />
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
