import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { Drift, Enter, ParallaxMedia, Reveal } from "./motion";
import { roughArrow } from "@/lib/rough";
import { Visual } from "./Visual";
import { Rich } from "./Rich";
import { Badge } from "./Badge";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="story-meta" aria-label="Disciplines">
      {tags.map((t) => (
        <li key={t} className="tag">{t}</li>
      ))}
    </ul>
  );
}

// Red pen arrow + handwritten note, drawn on hover (CSS only).
function HoverNote({ note, seed }: { note: string; seed: number }) {
  return (
    <span className="hover-note" aria-hidden="true">
      <svg className="pen draw" viewBox="0 0 100 60">
        <path d={roughArrow(6, 44, 92, 22, -0.3, seed)} pathLength={1} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
      </svg>
      <span className="note draw-note">{note}</span>
    </span>
  );
}

function Title({ p, style }: { p: Project; style?: React.CSSProperties }) {
  return (
    <h3 className="story-title" style={style}>
      <span className="story-title-wrap">
        {p.title}
        <HoverNote note={p.note} seed={Number(p.index)} />
      </span>
    </h3>
  );
}

function Badges({ p }: { p: Project }) {
  return (
    <div className="story-badges" aria-label="Highlights">
      {p.badges.map((b) => (
        <Badge key={b} label={b} />
      ))}
    </div>
  );
}

function Cta({ label = "View case study" }: { label?: string }) {
  return (
    <span className="story-cta">
      <span className="label">{label}</span>
      <span className="arrow" aria-hidden="true">→</span>
    </span>
  );
}

function FeatureStory({ p }: { p: Project }) {
  return (
    <article className="story story--feature">
      <Link href={`/work/${p.slug}`} className="story-link">
        <Reveal className="story-head">
          <div>
            <span className="mono story-index">{p.index} / {p.category}</span>
            <Title p={p} style={{ marginTop: 14 }} />
          </div>
          <div className="story-head-side">
            <span className="mono muted">{p.year}</span>
            <Tags tags={p.tags} />
          </div>
        </Reveal>
        <div className="story-cover">
          <Badges p={p} />
          <ParallaxMedia className="ratio-16-9">
            <Visual image={p.cover} priority sizes="(min-width: 1440px) 1344px, 100vw" />
          </ParallaxMedia>
        </div>
        <Reveal className="grid story-foot">
          <p className="story-summary"><Rich text={p.summary} /></p>
          <dl className="story-facts">
            <dt>Role</dt><dd>{p.role}</dd>
            <dt>Company</dt><dd>{p.company}</dd>
          </dl>
          <div className="story-foot-cta">
            <Cta />
          </div>
        </Reveal>
      </Link>
    </article>
  );
}

function SideStory({ p }: { p: Project }) {
  const side = p.layout === "media-left" ? "story--media-left" : "story--media-right";
  return (
    <article className={`story story--side ${side}`}>
      <Link href={`/work/${p.slug}`} className="story-link">
        <div className="grid story-body">
          <Reveal className="story-media story-cover" y={32}>
            <Badges p={p} />
            <ParallaxMedia className="ratio-16-9">
              <Visual image={p.cover} sizes="(min-width: 720px) 66vw, 100vw" />
            </ParallaxMedia>
          </Reveal>
          <Drift className="story-text" distance={28}>
            <span className="mono story-index">{p.index} / {p.category}</span>
            <Title p={p} />
            <p className="story-summary"><Rich text={p.summary} /></p>
            <Tags tags={p.tags} />
            <div style={{ marginTop: 8 }}><Cta /></div>
          </Drift>
        </div>
      </Link>
    </article>
  );
}

export function Work() {
  return (
    <Enter delay={1.05} y={24}>
      <section id="work" className="section container" aria-labelledby="work-title">
        <div className="section-head">
          <h2 id="work-title">Selected work</h2>
          <span className="mono muted">({String(projects.length).padStart(2, "0")})</span>
        </div>
        <div className="stories">
          {projects.map((p) => {
            if (p.layout === "feature") return <FeatureStory key={p.slug} p={p} />;
            return <SideStory key={p.slug} p={p} />;
          })}
        </div>
      </section>
    </Enter>
  );
}
