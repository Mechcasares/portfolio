import type { CSSProperties, ReactNode } from "react";

function Phone({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div className="phone" style={style}>
      <div className="phone-status"><span>9:41</span><span>●●●</span></div>
      {children}
    </div>
  );
}

const tones = ["#e7dfd3", "#dcdcd4", "#e5d9d0", "#d9dcd8", "#e8e2d4"];

/* ── Ping ─────────────────────────────────────────────────── */

function PingHeader({ active }: { active: "Now" | "Later" | "Digest" }) {
  return (
    <div style={{ padding: "0 0.4em", display: "flex", flexDirection: "column", gap: "1em" }}>
      <span style={{ fontSize: "2.4em", fontWeight: 580, letterSpacing: "-0.04em" }}>{active}</span>
      <div style={{ display: "flex", gap: "0.4em" }}>
        {(["Now", "Later", "Digest"] as const).map((t) => (
          <span key={t} className={`m-chip ${t === active ? "m-chip--ink" : ""}`}>
            {t}
            {t === "Now" && <span style={{ opacity: 0.6 }}>3</span>}
            {t === "Later" && <span style={{ opacity: 0.6 }}>12</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function PingCard({ from, source, time, body, urgent, tone, actions }: { from: string; source: string; time: string; body: string; urgent?: boolean; tone: string; actions?: boolean }) {
  return (
    <div style={{ border: "0.08em solid #ebe7e0", borderRadius: "1em", padding: "1em 1.1em", display: "flex", flexDirection: "column", gap: "0.6em", background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.7em" }}>
        <span className="m-avatar" style={{ background: tone }}>{from[0]}</span>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 560, fontSize: "1.05em" }}>{from}</span>
          <span className="m-muted" style={{ fontSize: "0.85em" }}>{source} · {time}</span>
        </div>
        {urgent && <span style={{ width: "0.6em", height: "0.6em", borderRadius: "50%", background: "var(--accent)" }} />}
      </div>
      <span style={{ fontSize: "1em", color: "#3b3a37", lineHeight: 1.4 }}>{body}</span>
      {actions && (
        <div style={{ display: "flex", gap: "0.4em", marginTop: "0.2em" }}>
          <span className="m-btn m-btn--ink" style={{ flex: 1, height: "2.4em" }}>Reply</span>
          <span className="m-btn" style={{ flex: 1, height: "2.4em" }}>Snooze</span>
        </div>
      )}
    </div>
  );
}

function PingNow() {
  return (
    <>
      <PingHeader active="Now" />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.7em", marginTop: "1.4em" }}>
        <PingCard from="Lucía" source="Figma" time="2m" tone={tones[0]} urgent actions body="Can you sign off the checkout flow before the 3pm build?" />
        <PingCard from="Deploys" source="GitHub" time="14m" tone={tones[1]} urgent body="Release 2.4 is waiting on your approval." />
        <PingCard from="Tom" source="Linear" time="1h" tone={tones[2]} body="Assigned you: onboarding copy review." />
      </div>
      <div className="m-mono m-faint" style={{ margin: "1.6em 0.4em 0.6em" }}>Later today · 12</div>
      {["Weekly metrics are ready", "3 new comments on Pricing v2"].map((t) => (
        <div key={t} style={{ padding: "0.8em 0.4em", borderTop: "0.08em solid #eeebe5", color: "#8d8a83" }}>{t}</div>
      ))}
    </>
  );
}

function PingSwipe() {
  return (
    <>
      <PingHeader active="Now" />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.7em", marginTop: "1.4em" }}>
        <div style={{ position: "relative", borderRadius: "1em", background: "#1b1b1a", color: "#fff" }}>
          <div style={{ position: "absolute", right: "1.2em", top: 0, bottom: 0, display: "flex", alignItems: "center", gap: "0.4em", fontSize: "0.95em" }}>Later · 2h ◷</div>
          <div style={{ transform: "translateX(-32%)", color: "#1b1b1a" }}>
            <PingCard from="Tom" source="Linear" time="1h" tone={tones[2]} body="Assigned you: onboarding copy review." />
          </div>
        </div>
        <div style={{ border: "0.08em solid #ebe7e0", borderRadius: "1em", padding: "1em 1.1em", display: "flex", flexDirection: "column", gap: "0.8em" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7em" }}>
            <span className="m-avatar" style={{ background: tones[0] }}>L</span>
            <span style={{ fontWeight: 560, flex: 1 }}>Lucía</span>
            <span className="m-muted" style={{ fontSize: "0.85em" }}>Figma</span>
          </div>
          <span style={{ color: "#3b3a37" }}>Can you sign off the checkout flow before the 3pm build?</span>
          <div style={{ display: "flex", gap: "0.4em", flexWrap: "wrap" }}>
            <span className="m-chip">Approved ✓</span><span className="m-chip">Looking now</span><span className="m-chip">After 3</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5em", border: "0.08em solid #e3dfd7", borderRadius: "2em", padding: "0.7em 0.9em" }}>
            <span style={{ flex: 1 }}>Approved — ship it<span style={{ display: "inline-block", width: "0.08em", height: "1em", background: "var(--accent)", verticalAlign: "middle", marginLeft: "0.1em" }} /></span>
            <span style={{ width: "1.8em", height: "1.8em", borderRadius: "50%", background: "#1b1b1a", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>↑</span>
          </div>
        </div>
      </div>
    </>
  );
}

function PingDigest() {
  const groups = [
    ["Design reviews", "4", "Two approved, pricing page needs another pass."],
    ["Deploys", "6", "All green. Release 2.4 shipped at 11:20."],
    ["Mentions", "3", "Onboarding thread, roadmap doc, #design."],
    ["Calendar", "2", "Sprint review moved to Thursday."],
  ];
  return (
    <>
      <PingHeader active="Digest" />
      <div style={{ margin: "1.4em 0.4em 1em", color: "#3b3a37", lineHeight: 1.4 }}>
        <span className="m-mono m-accent">Tuesday</span>
        <div style={{ fontSize: "1.35em", fontWeight: 540, letterSpacing: "-0.02em", marginTop: "0.4em" }}>15 updates, nothing that needs you.</div>
      </div>
      {groups.map(([t, n, b]) => (
        <div key={t} style={{ padding: "1em 0.4em", borderTop: "0.08em solid #eeebe5", display: "flex", flexDirection: "column", gap: "0.3em" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 560 }}><span>{t}</span><span className="m-muted">{n}</span></div>
          <span className="m-muted" style={{ fontSize: "0.92em" }}>{b}</span>
        </div>
      ))}
    </>
  );
}

export function PingApp() {
  return (
    <div className="mock">
      <div className="mock-scale">
        <Phone style={{ left: "16em", top: "7em", width: "31em" }}><PingNow /></Phone>
        <Phone style={{ left: "53em", top: "15em", width: "31em" }}><PingDigest /></Phone>
      </div>
    </div>
  );
}

export function PingDetail() {
  return (
    <div className="mock">
      <div className="mock-scale">
        <Phone style={{ left: "7em", top: "5em", width: "25em" }}><PingNow /></Phone>
        <Phone style={{ left: "37.5em", top: "9em", width: "25em" }}><PingSwipe /></Phone>
        <Phone style={{ left: "68em", top: "5em", width: "25em" }}><PingDigest /></Phone>
      </div>
    </div>
  );
}

/* ── Settle ───────────────────────────────────────────────── */

const people = [
  { n: "Ana", t: tones[0] },
  { n: "Tomás", t: tones[1] },
  { n: "Leo", t: tones[2] },
  { n: "Sofi", t: tones[3] },
];

function SettleGroup() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0.4em" }}>
        <span className="m-muted">‹ Groups</span>
        <div style={{ display: "flex" }}>
          {people.map((p, i) => (
            <span key={p.n} className="m-avatar" style={{ background: p.t, marginLeft: i ? "-0.6em" : 0, border: "0.15em solid #fff", width: "2em", height: "2em", fontSize: "0.8em" }}>{p.n[0]}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "1.6em 0.4em 1.4em" }}>
        <span style={{ fontSize: "1.1em", fontWeight: 560 }}>Lisbon trip</span>
        <div className="m-muted" style={{ marginTop: "1.4em", fontSize: "0.95em" }}>You’re owed</div>
        <div style={{ fontSize: "3.6em", fontWeight: 560, letterSpacing: "-0.05em", lineHeight: 1.05 }}>€124.50</div>
      </div>
      {[
        ["Ana", "owes you", "€64.20", tones[0]],
        ["Tomás", "owes you", "€60.30", tones[1]],
        ["Leo", "settled", "—", tones[2]],
      ].map(([n, s, v, t]) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.8em", padding: "0.9em 0.4em", borderTop: "0.08em solid #eeebe5" }}>
          <span className="m-avatar" style={{ background: t }}>{n[0]}</span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 540 }}>{n}</span>
            <span className="m-muted" style={{ fontSize: "0.85em" }}>{s}</span>
          </div>
          <span style={{ fontWeight: 540 }}>{v}</span>
        </div>
      ))}
      <div className="m-mono m-faint" style={{ margin: "1.4em 0.4em 0.6em" }}>Recent</div>
      {[
        ["Dinner in Alfama", "€86.00"],
        ["Tram tickets", "€24.00"],
      ].map(([n, v]) => (
        <div key={n} style={{ display: "flex", justifyContent: "space-between", padding: "0.7em 0.4em", color: "#8d8a83" }}><span>{n}</span><span>{v}</span></div>
      ))}
      <span className="m-btn m-btn--ink" style={{ marginTop: "auto", height: "3.2em", borderRadius: "1.6em" }}>Settle up</span>
    </>
  );
}

function SettlePayments() {
  return (
    <>
      <div style={{ padding: "0 0.4em" }}>
        <span className="m-muted">‹ Lisbon trip</span>
        <div style={{ fontSize: "2em", fontWeight: 580, letterSpacing: "-0.04em", marginTop: "1em", lineHeight: 1.1 }}>Settle up</div>
        <div className="m-muted" style={{ marginTop: "0.5em", fontSize: "0.95em" }}>We simplified 9 expenses into 3 payments.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.7em", marginTop: "1.6em" }}>
        {[
          ["A", "Ana", "You", "€64.20", tones[0], true],
          ["T", "Tomás", "You", "€60.30", tones[1], false],
          ["S", "Sofi", "Leo", "€18.00", tones[3], false],
        ].map(([i, a, b, v, t, sel]) => (
          <div key={a as string} style={{ display: "flex", alignItems: "center", gap: "0.7em", padding: "1em", border: `0.08em solid ${sel ? "#1b1b1a" : "#ebe7e0"}`, borderRadius: "1em" }}>
            <span className="m-avatar" style={{ background: t as string }}>{i}</span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 540 }}>{a} → {b}</span>
              <span className="m-muted" style={{ fontSize: "0.85em" }}>{sel ? "Selected" : "Pending"}</span>
            </div>
            <span style={{ fontWeight: 560 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.4em", padding: "1em", borderRadius: "1em", background: "#f6f4f0", display: "flex", flexDirection: "column", gap: "0.4em" }}>
        <span style={{ fontWeight: 540 }}>Send a reminder</span>
        <span className="m-muted" style={{ fontSize: "0.9em", lineHeight: 1.4 }}>“Hey Ana! Settling up Lisbon — €64.20 whenever you get a sec ☀️”</span>
      </div>
      <span className="m-btn m-btn--ink" style={{ marginTop: "auto", height: "3.2em", borderRadius: "1.6em" }}>Mark €64.20 as paid</span>
    </>
  );
}

function SettleDone() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "0.8em" }}>
      <span style={{ width: "4.5em", height: "4.5em", borderRadius: "50%", border: "0.12em solid var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: "1.2em" }}>✓</span>
      <span style={{ fontSize: "1.6em", fontWeight: 580, letterSpacing: "-0.03em", marginTop: "0.6em" }}>Settled with Ana</span>
      <span style={{ fontSize: "2.8em", fontWeight: 560, letterSpacing: "-0.05em" }}>€64.20</span>
      <span className="m-muted" style={{ fontSize: "0.95em" }}>Lisbon trip · €60.30 left to settle</span>
      <span className="m-btn" style={{ marginTop: "1.2em", borderRadius: "1.6em" }}>Undo</span>
    </div>
  );
}

export function SettleApp() {
  return (
    <div className="mock">
      <div className="mock-scale">
        <Phone style={{ left: "16em", top: "15em", width: "31em" }}><SettleGroup /></Phone>
        <Phone style={{ left: "53em", top: "7em", width: "31em" }}><SettlePayments /></Phone>
      </div>
    </div>
  );
}

export function SettleFlow() {
  return (
    <div className="mock">
      <div className="mock-scale">
        <Phone style={{ left: "7em", top: "5em", width: "25em" }}><SettleGroup /></Phone>
        <Phone style={{ left: "37.5em", top: "9em", width: "25em" }}><SettlePayments /></Phone>
        <Phone style={{ left: "68em", top: "5em", width: "25em" }}><SettleDone /></Phone>
      </div>
    </div>
  );
}

/* ── Eden (in progress) ───────────────────────────────────── */

export function EdenSketch() {
  const box: CSSProperties = { position: "absolute", border: "0.12em dashed #b9b5ab", borderRadius: "0.6em" };
  return (
    <div className="mock" style={{ background: "#efede7" }}>
      <div className="mock-scale">
        <div style={{ ...box, left: "6em", top: "10em", width: "26em", height: "40em" }} />
        <div style={{ ...box, left: "36em", top: "10em", width: "26em", height: "18em" }} />
        <div style={{ ...box, left: "36em", top: "32em", width: "26em", height: "18em" }} />
        <div style={{ ...box, left: "66em", top: "10em", width: "28em", height: "40em", borderStyle: "solid", borderColor: "#1b1b1a", background: "#fff" }}>
          <div style={{ padding: "2em", display: "flex", flexDirection: "column", gap: "1em" }}>
            <div style={{ height: "1.4em", width: "60%", background: "#1b1b1a", borderRadius: "0.3em" }} />
            <div style={{ height: "0.8em", width: "85%", background: "#e3dfd7", borderRadius: "0.3em" }} />
            <div style={{ height: "0.8em", width: "70%", background: "#e3dfd7", borderRadius: "0.3em" }} />
            <div style={{ height: "12em", background: "#f4f2ee", borderRadius: "0.5em", marginTop: "1em" }} />
          </div>
        </div>
        <span style={{ position: "absolute", left: "8em", top: "5em", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "2.6em", color: "#8d8a83" }}>explore → converge</span>
        <span className="m-chip m-chip--ai" style={{ position: "absolute", left: "66em", top: "6em", fontSize: "1.2em" }}>● In progress</span>
      </div>
    </div>
  );
}
