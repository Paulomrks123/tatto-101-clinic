import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "../features/admin/AdminPanel";
export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administração | 101Clinic" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPanel,
});
