import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { Drift, Enter, ParallaxMedia, Reveal } from "./motion";
import { Visual } from "./Visual";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="story-meta" aria-label="Disciplines">
      {tags.map((t) => (
        <li key={t} className="tag">{t}</li>
      ))}
    </ul>
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
            <span className="mono story-index">{p.index} — {p.category}</span>
            <h3 className="story-title" style={{ marginTop: 14 }}>{p.title}</h3>
          </div>
          <div className="story-head-side">
            <span className="mono muted">{p.year}</span>
            <Tags tags={p.tags} />
          </div>
        </Reveal>
        <ParallaxMedia className="ratio-16-10 m-tall">
          <Visual visual={p.cover} priority sizes="(min-width: 1440px) 1344px, 100vw" />
        </ParallaxMedia>
        <Reveal className="grid story-foot">
          <p className="story-summary">{p.summary}</p>
          <dl className="story-facts">
            <dt>Role</dt><dd>{p.role}</dd>
            <dt>Team</dt><dd>{p.team}</dd>
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
          <Reveal className="story-media" y={32}>
            <ParallaxMedia className="ratio-4-3">
              <Visual visual={p.cover} sizes="(min-width: 720px) 66vw, 100vw" />
            </ParallaxMedia>
          </Reveal>
          <Drift className="story-text" distance={28}>
            <span className="mono story-index">{p.index} — {p.category}</span>
            <h3 className="story-title">{p.title}</h3>
            <p className="story-summary">{p.summary}</p>
            <Tags tags={p.tags} />
            <div style={{ marginTop: 8 }}><Cta /></div>
          </Drift>
        </div>
      </Link>
    </article>
  );
}

function BandStory({ p }: { p: Project }) {
  return (
    <Reveal className="story story--band">
      <Link href={`/work/${p.slug}`} className="story-link">
        <div className="grid story-body">
          <span className="mono story-index">{p.index}</span>
          <h3 className="story-title">{p.title}</h3>
          <div className="story-summary" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="mono status">In progress</span>
            <span>{p.summary}</span>
          </div>
          <div className="story-thumb">
            <div className="media ratio-16-10">
              <div className="media-hover"><Visual visual={p.cover} sizes="25vw" /></div>
            </div>
          </div>
          <span className="arrow story-band-arrow" aria-hidden="true">→</span>
        </div>
      </Link>
    </Reveal>
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
            if (p.layout === "band") return <BandStory key={p.slug} p={p} />;
            return <SideStory key={p.slug} p={p} />;
          })}
        </div>
      </section>
    </Enter>
  );
}
