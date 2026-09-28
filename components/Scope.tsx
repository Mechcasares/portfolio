import type { Project } from "@/content/projects";
import { Rich } from "./Rich";

/**
 * The five questions every project answers up front:
 * role, scope, complexity, approach, outcome.
 */
export function Scope({ p, compact = false }: { p: Project; compact?: boolean }) {
  const outcomes = (
    <ul className="scope-outcomes">
      {p.outcomes.map((o) => (
        <li key={o.label}>
          <span className="scope-value">{o.value}</span>
          <span className="scope-what">{o.label}</span>
        </li>
      ))}
    </ul>
  );
  const scope = (
    <ul className="scope-list">
      {p.scope.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );

  if (compact) {
    return (
      <div className="scope scope--compact">
        <div className="scope-col">
          <span className="mono scope-label">Scope</span>
          {scope}
        </div>
        <div className="scope-col">
          <span className="mono scope-label">Outcome</span>
          {outcomes}
        </div>
      </div>
    );
  }

  const rows: [string, React.ReactNode][] = [
    ["My role", <Rich key="r" text={p.roleDetail} />],
    ["Scope", scope],
    ["Complexity", <Rich key="c" text={p.complexity} />],
    ["Approach", <Rich key="a" text={p.approach} />],
    ["Outcome", outcomes],
  ];
  return (
    <dl className="brief">
      {rows.map(([label, value], i) => (
        <div key={label} className="brief-row">
          <dt className="mono"><span className="brief-num">{String(i + 1).padStart(2, "0")}</span>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
