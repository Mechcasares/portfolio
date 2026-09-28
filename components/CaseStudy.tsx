import Link from "next/link";
import { getNextProject, type Block, type Img, type Project, type Section } from "@/content/projects";
import { CaseNav } from "./CaseNav";
import { Enter, ParallaxMedia, Reveal, WordReveal } from "./motion";
import { Visual } from "./Visual";

const num = (i: number) => String(i + 1).padStart(2, "0");

function Figure({ image, sizes }: { image: Img; sizes: string }) {
  // Frame matches the image's own proportions, so screenshots are never cropped.
  return (
    <ParallaxMedia strength={0} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <Visual image={image} sizes={sizes} />
    </ParallaxMedia>
  );
}

function Caption({ label, text }: { label: string; text: string }) {
  return (
    <figcaption>
      <span className="mono">{label}</span>
      <span>{text}</span>
    </figcaption>
  );
}

function BlockView({ block, index }: { block: Block; index: number }) {
  switch (block.kind) {
    case "image":
      return (
        <figure className="cs-figure">
          <Figure image={block.image} sizes="(min-width: 960px) 70vw, 100vw" />
          {block.caption && <Caption label={`Fig. ${num(index)}`} text={block.caption} />}
        </figure>
      );
    case "gallery":
      return (
        <figure className="cs-figure">
          <div className={`gallery gallery--${Math.min(block.images.length, 3)}`}>
            {block.images.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.08}>
                <Figure image={img} sizes="(min-width: 960px) 35vw, 100vw" />
              </Reveal>
            ))}
          </div>
          {block.caption && <Caption label={`Fig. ${num(index)}`} text={block.caption} />}
        </figure>
      );
    case "stats":
      return (
        <Reveal>
          <dl className="stats">
            {block.items.map((st) => (
              <div key={st.label} className="stat">
                <dd className="stat-value">{st.value}</dd>
                <dt className="mono muted">{st.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      );
    case "shipped":
      return (
        <Reveal>
          <p className="mono muted" style={{ marginBottom: 12 }}>Shipped</p>
          <ul className="shipped">
            {block.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        </Reveal>
      );
    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((it, i) => (
            <Reveal key={it.title} as="li" delay={i * 0.08}>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </Reveal>
          ))}
        </ul>
      );
    case "quote":
      return (
        <Reveal>
          <blockquote className="cs-quote">{block.text}</blockquote>
        </Reveal>
      );
    case "facts":
      return (
        <Reveal>
          <dl className="cs-facts-block">
            {block.items.map((f) => (
              <div key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );
  }
}

function SectionView({ section, index }: { section: Section; index: number }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}>
      <Reveal className="cs-section-head">
        <span className="mono num">{num(index)}</span>
        <h2 id={`${section.id}-title`} className="mono">{section.title}</h2>
      </Reveal>
      {section.lead && (
        <p className="cs-lead">
          <WordReveal text={section.lead} stagger={0.018} />
        </p>
      )}
      {section.body && (
        <Reveal className="cs-text">
          {section.body.map((b) => (
            <p key={b.slice(0, 32)}>{b}</p>
          ))}
        </Reveal>
      )}
      {section.blocks && (
        <div className="cs-blocks">
          {section.blocks.map((b, i) => (
            <BlockView key={i} block={b} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const next = getNextProject(project.slug);
  const facts = [
    ["Role", project.role],
    ["Year", project.year],
    ["Company", project.company],
    ["Focus", project.tags.join(", ")],
  ];

  return (
    <article>
      <header className="container cs-header">
        <Enter delay={0.05}>
          <Link href="/#work" className="cs-back mono">
            <span className="arrow" aria-hidden="true">←</span> All work
          </Link>
        </Enter>
        <Enter delay={0.12} className="cs-eyebrow mono">
          <span>{project.index}</span>
          <span>{project.category}</span>
        </Enter>
        <h1 className="cs-title">
          <WordReveal text={project.title} delay={0.18} stagger={0.06} onMount />
        </h1>
        <div className="grid cs-intro">
          <Enter delay={0.45} as="p" className="cs-summary">{project.summary}</Enter>
          <Enter delay={0.55} className="cs-facts">
            {facts.map(([k, v]) => (
              <dl key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </dl>
            ))}
          </Enter>
        </div>
      </header>

      <Enter delay={0.7} y={32} className="container cs-cover">
        <ParallaxMedia className="ratio-16-9" strength={0.8}>
          <Visual image={project.cover} priority sizes="(min-width: 1440px) 1344px, 100vw" />
        </ParallaxMedia>
      </Enter>

      <div className="container grid cs-body">
        <CaseNav sections={project.sections.map((s) => ({ id: s.id, title: s.title }))} />
        <div className="cs-content">
          {project.sections.map((s, i) => (
            <SectionView key={s.id} section={s} index={i} />
          ))}
        </div>
      </div>

      <div className="container cs-next">
        <Link href={`/work/${next.slug}`}>
          <span className="mono muted">Next project — {next.index}</span>
          <div className="cs-next-title">
            <span>{next.title}</span>
            <span className="arrow" aria-hidden="true">→</span>
          </div>
        </Link>
      </div>
    </article>
  );
}
