import type { Props } from "../../components/ui/Tabs.tsx";
import Tabs from "../../islands/Tabs.tsx";

export default function ContentTabs(p: Props) {
  return (
    <div class="container w-full py-8">
      <Tabs {...p} />
    </div>
  );
}
