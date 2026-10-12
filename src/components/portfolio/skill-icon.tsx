import {
  BrainCircuit,
  CodeXml,
  Megaphone,
  Network,
  Terminal,
  Users,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { SkillIcon } from "@/lib/cv-data";

const map = {
  code: CodeXml,
  terminal: Terminal,
  brain: BrainCircuit,
  megaphone: Megaphone,
  network: Network,
  wrench: Wrench,
  users: Users,
} satisfies Record<SkillIcon, React.ComponentType<LucideProps>>;

export function SkillIconGlyph({
  name,
  ...props
}: { name: SkillIcon } & LucideProps) {
  const Icon = map[name];
  return <Icon {...props} />;
}
