import type { MockKey } from "@/content/projects";
import { CuratedApp, CuratedBrief, CuratedSystem } from "./curated";
import { EdenSketch, PingApp, PingDetail, SettleApp, SettleFlow } from "./mobile";

const mocks: Record<MockKey, () => React.JSX.Element> = {
  "curated-app": CuratedApp,
  "curated-brief": CuratedBrief,
  "curated-system": CuratedSystem,
  "ping-app": PingApp,
  "ping-detail": PingDetail,
  "settle-app": SettleApp,
  "settle-flow": SettleFlow,
  "eden-sketch": EdenSketch,
};

export function Mock({ name }: { name: MockKey }) {
  const Component = mocks[name];
  return <Component />;
}
