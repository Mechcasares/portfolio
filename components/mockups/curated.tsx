import { ProductShape, type Shape } from "./shapes";

type Item = { name: string; price: string; tone: string; ink: string; shape: Shape; reason: string; pinned?: boolean };

const items: Item[] = [
  { name: "Linen overshirt", price: "€145", tone: "#e4dccd", ink: "#c9bba3", shape: "shirt", reason: "Linen · neutral", pinned: true },
  { name: "Wide trouser", price: "€120", tone: "#dcd8cf", ink: "#b9b2a4", shape: "trousers", reason: "Travel · light" },
  { name: "Slip dress", price: "€165", tone: "#e8e0d6", ink: "#cdbfae", shape: "dress", reason: "Warm weather" },
  { name: "Woven tote", price: "€89", tone: "#e2d7c3", ink: "#c4b18f", shape: "tote", reason: "Must-have: bags" },
  { name: "Leather sandal", price: "€110", tone: "#ddd3c6", ink: "#b8a58f", shape: "sandal", reason: "Travel · neutral" },
  { name: "Cotton tank", price: "€45", tone: "#e9e6df", ink: "#cfc9bd", shape: "top", reason: "Under €180", pinned: true },
  { name: "Straw hat", price: "€70", tone: "#e6dcc7", ink: "#cbb88f", shape: "hat", reason: "Warm weather" },
  { name: "Canvas bag", price: "€95", tone: "#d9d6cf", ink: "#b5afa3", shape: "bag", reason: "Neutral palette" },
];

function Sidebar() {
  const nav = ["Edits", "Briefs", "Rules", "Catalogue", "Insights"];
  return (
    <aside style={{ width: "13em", borderRight: "0.08em solid #eeebe5", padding: "1.6em 1.2em", display: "flex", flexDirection: "column", gap: "0.3em", background: "#fcfbf9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6em", marginBottom: "1.6em", fontWeight: 600 }}>
        <span style={{ width: "1.6em", height: "1.6em", borderRadius: "0.35em", background: "#1b1b1a", display: "inline-block" }} />
        Curated
      </div>
      {nav.map((n, i) => (
        <div key={n} style={{ padding: "0.55em 0.7em", borderRadius: "0.45em", background: i === 0 ? "#efece6" : "transparent", color: i === 0 ? "#1b1b1a" : "#8d8a83", fontWeight: i === 0 ? 550 : 450 }}>
          {n}
        </div>
      ))}
      <div className="m-mono m-faint" style={{ marginTop: "2em", padding: "0 0.7em" }}>Recent</div>
      {["Summer linen", "Resort — Men", "Gifting under €50"].map((n) => (
        <div key={n} style={{ padding: "0.45em 0.7em", color: "#8d8a83", fontSize: "0.95em" }}>{n}</div>
      ))}
    </aside>
  );
}

function ProductCard({ item, compact = false }: { item: Item; compact?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.55em" }}>
      <div className="m-product" style={{ aspectRatio: compact ? "1 / 1" : "4 / 5", background: item.tone }}>
        <ProductShape shape={item.shape} color={item.ink} />
        {item.pinned && (
          <span className="m-chip m-chip--ink" style={{ position: "absolute", top: "0.6em", left: "0.6em", fontSize: "0.75em" }}>Pinned</span>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95em", fontWeight: 520 }}>
        <span>{item.name}</span>
        <span className="m-muted">{item.price}</span>
      </div>
      <span className="m-accent" style={{ fontSize: "0.82em" }}>✦ {item.reason}</span>
    </div>
  );
}

export function CuratedApp() {
  return (
    <div className="mock">
      <div className="mock-scale">
        <div className="mw" style={{ left: "4.5em", top: "4.5em", width: "91em", height: "64em" }}>
          <div className="mw-bar"><i /><i /><i /><span className="mw-url">app.curatedforyou.com/edits/summer-linen</span></div>
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "1.8em 2em", display: "flex", flexDirection: "column", gap: "1.3em", minWidth: 0 }}>
              <div className="m-muted" style={{ fontSize: "0.9em" }}>Edits / Womenswear</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "-0.6em" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8em" }}>
                  <span style={{ fontSize: "1.9em", fontWeight: 560, letterSpacing: "-0.03em" }}>Summer Linen Edit</span>
                  <span className="m-chip">Draft</span>
                </div>
                <div style={{ display: "flex", gap: "0.6em" }}>
                  <span className="m-btn">Preview</span>
                  <span className="m-btn m-btn--ink">Publish</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1em", padding: "0.9em 1em", border: "0.08em solid #ebe7e0", borderRadius: "0.6em", background: "#fcfbf9" }}>
                <span className="m-chip m-chip--ai">✦ Brief</span>
                <span style={{ flex: 1, color: "#3b3a37" }}>Lightweight linen for warm-weather travel · neutral palette · under €180</span>
                <span className="m-muted" style={{ fontSize: "0.9em" }}>Edit</span>
              </div>
              <div style={{ display: "flex", gap: "1.6em", borderBottom: "0.08em solid #eeebe5", fontSize: "0.95em" }}>
                <span style={{ paddingBottom: "0.7em", borderBottom: "0.12em solid #1b1b1a", fontWeight: 550 }}>Selection <span className="m-muted">24</span></span>
                <span className="m-muted">Rules <span className="m-faint">3</span></span>
                <span className="m-muted">Schedule</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.6em 1.2em" }}>
                {items.map((it) => <ProductCard key={it.name} item={it} />)}
              </div>
            </main>
            <aside style={{ width: "20em", borderLeft: "0.08em solid #eeebe5", padding: "1.8em 1.4em", display: "flex", flexDirection: "column", gap: "1.1em" }}>
              <span style={{ fontWeight: 560 }}>Why these products</span>
              <span className="m-muted" style={{ fontSize: "0.9em", marginTop: "-0.6em" }}>How the edit matches your brief</span>
              {[
                ["Linen or cotton", 92],
                ["Neutral palette", 84],
                ["Under €180", 100],
                ["In stock, all sizes", 71],
              ].map(([l, v]) => (
                <div key={l as string} style={{ display: "flex", flexDirection: "column", gap: "0.45em" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em" }}>
                    <span>{l}</span><span className="m-muted">{v}%</span>
                  </div>
                  <div className="m-bar"><span style={{ width: `${v}%` }} /></div>
                </div>
              ))}
              <div className="m-line" style={{ margin: "0.4em 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em" }}><span>Pinned</span><span className="m-muted">2</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em" }}><span>Removed</span><span className="m-muted">3</span></div>
              <div className="m-line" style={{ margin: "0.4em 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9em" }}>
                <span>Prioritise new arrivals</span><span className="m-toggle" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9em" }}>
                <span>Include sale items</span><span className="m-toggle off" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CuratedBrief() {
  const rows = items.slice(0, 6);
  return (
    <div className="mock">
      <div className="mock-scale">
        {/* Brief panel */}
        <div className="mw" style={{ left: "6em", top: "6em", width: "36em", height: "44em", padding: "2em", gap: "1.4em" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1.4em", fontWeight: 560, letterSpacing: "-0.02em" }}>Brief</span>
            <span className="m-chip m-chip--ai">✦ Live</span>
          </div>
          <div style={{ padding: "1em", border: "0.08em solid #e6e2da", borderRadius: "0.6em", lineHeight: 1.5, color: "#3b3a37" }}>
            Lightweight pieces for warm-weather travel. Neutral palette, easy to pack, nothing over €180.
            <span style={{ display: "inline-block", width: "0.08em", height: "1.1em", background: "var(--accent)", verticalAlign: "middle", marginLeft: "0.1em" }} />
          </div>
          {[
            ["Audience", "Womenswear · 25–40"],
            ["Price", "Up to €180"],
            ["Season", "Summer 26"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95em", paddingBottom: "0.9em", borderBottom: "0.08em solid #eeebe5" }}>
              <span className="m-muted">{k}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6em" }}>
            <span className="m-muted" style={{ fontSize: "0.95em" }}>Must include</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4em" }}>
              <span className="m-chip">Linen</span><span className="m-chip">Bags</span><span className="m-chip">Sandals</span><span className="m-chip m-faint">+ Add</span>
            </div>
          </div>
          <span className="m-btn m-btn--ink" style={{ marginTop: "auto" }}>Update edit</span>
        </div>

        {/* Review list */}
        <div className="mw" style={{ left: "46em", top: "10em", width: "48em", height: "50em" }}>
          <div style={{ padding: "1.6em 1.8em 1em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1.2em", fontWeight: 560 }}>Selection <span className="m-muted">24</span></span>
            <span className="m-muted" style={{ fontSize: "0.9em" }}>Sorted by match</span>
          </div>
          {rows.map((it, i) => (
            <div key={it.name} style={{ display: "flex", alignItems: "center", gap: "1.2em", padding: "0.9em 1.8em", borderTop: "0.08em solid #eeebe5", background: i === 2 ? "#fbf7f4" : "transparent" }}>
              <div className="m-product" style={{ width: "4em", height: "4.6em", background: it.tone, flex: "none" }}>
                <ProductShape shape={it.shape} color={it.ink} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25em" }}>
                <span style={{ fontWeight: 530 }}>{it.name}</span>
                <span className="m-accent" style={{ fontSize: "0.85em" }}>✦ {it.reason}</span>
              </div>
              <span className="m-muted" style={{ width: "4em" }}>{it.price}</span>
              {it.pinned ? <span className="m-chip m-chip--ink">Pinned</span> : <span className="m-chip m-faint">Pin</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CuratedSystem() {
  const swatches = [
    ["Ink", "#1b1b1a"],
    ["Graphite", "#3b3a37"],
    ["Muted", "#8d8a83"],
    ["Line", "#e3dfd7"],
    ["Canvas", "#f4f2ee"],
    ["AI", "var(--accent)"],
  ];
  return (
    <div className="mock">
      <div className="mock-scale">
        <div className="mw" style={{ left: "5em", top: "5em", right: "5em", bottom: "5em", padding: "3em", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3em" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.2em" }}>
            <div>
              <div className="m-mono m-faint" style={{ marginBottom: "1em" }}>Colour</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "0.8em" }}>
                {swatches.map(([n, c]) => (
                  <div key={n} style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
                    <div style={{ aspectRatio: "1", borderRadius: "0.5em", background: c, border: "0.08em solid #e3dfd7" }} />
                    <span style={{ fontSize: "0.85em" }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="m-mono m-faint" style={{ marginBottom: "1em" }}>Type</div>
              {[
                ["Display", "2.6em", 560],
                ["Title", "1.6em", 560],
                ["Body", "1.1em", 450],
              ].map(([n, s, w]) => (
                <div key={n as string} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "0.5em 0", borderBottom: "0.08em solid #eeebe5" }}>
                  <span style={{ fontSize: s as string, fontWeight: w as number, letterSpacing: "-0.03em" }}>Summer Linen</span>
                  <span className="m-muted" style={{ fontSize: "0.85em" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.2em" }}>
            <div>
              <div className="m-mono m-faint" style={{ marginBottom: "1em" }}>Actions</div>
              <div style={{ display: "flex", gap: "0.6em" }}>
                <span className="m-btn m-btn--ink">Publish</span>
                <span className="m-btn">Preview</span>
                <span className="m-btn" style={{ border: 0 }}>Cancel</span>
              </div>
            </div>
            <div>
              <div className="m-mono m-faint" style={{ marginBottom: "1em" }}>States</div>
              <div style={{ display: "flex", gap: "0.5em", flexWrap: "wrap" }}>
                <span className="m-chip m-chip--ai">✦ Linen · neutral</span>
                <span className="m-chip m-chip--ink">Pinned</span>
                <span className="m-chip">Draft</span>
                <span className="m-chip m-muted">Removed</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1em" }}>
              {items.slice(0, 3).map((it) => <ProductCard key={it.name} item={it} compact />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
