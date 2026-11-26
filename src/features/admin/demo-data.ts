import type { FormSummary } from "./types";
/** Dados estritamente fictícios para visualizar a interface. Nunca representam clientes reais. */
export const DEMO_FORMS: FormSummary[] = [
  { id: "DEMO-001", clientName: "Cliente demonstrativo", procedure: "Tatuagem", status: "recebido", createdAt: "Hoje, 09:20", expiresAt: "28/11/2026", ageGroup: "adulto" },
  { id: "DEMO-002", clientName: "Cadastro de exemplo", procedure: "Body piercing", status: "enviado", createdAt: "Hoje, 08:45", expiresAt: "29/11/2026", ageGroup: "adulto" },
  { id: "DEMO-003", clientName: "Responsável demonstrativo", procedure: "Tatuagem", status: "pendente", createdAt: "Ontem, 16:10", expiresAt: "27/11/2026", ageGroup: "menor" },
];
