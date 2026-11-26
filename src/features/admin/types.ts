export type FormStatus = "pendente" | "enviado" | "recebido" | "expirado";
export type ClientAgeGroup = "adulto" | "menor";
export interface FormSummary {
  id: string; clientName: string; procedure: string; status: FormStatus;
  createdAt: string; expiresAt: string; ageGroup: ClientAgeGroup;
}
export interface AdminSection {
  id: "overview" | "forms" | "minors" | "settings";
  label: string; description: string;
}
export const ADMIN_SECTIONS: AdminSection[] = [
  { id: "overview", label: "Visão geral", description: "Resumo operacional" },
  { id: "forms", label: "Fichas e anamneses", description: "Links, respostas e assinaturas" },
  { id: "minors", label: "Menores e responsáveis", description: "Fluxo de autorização" },
  { id: "settings", label: "Configurações", description: "Prazos e modelos" },
];
