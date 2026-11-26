import { createFileRoute } from "@tanstack/react-router";
import { AdminGate } from "../features/admin/AdminGate";
export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administração | 101Clinic" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminGate,
});
