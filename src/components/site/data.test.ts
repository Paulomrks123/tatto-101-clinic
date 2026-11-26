import { describe, expect, it } from "vitest";
import { BIZ, waLink, WA_DEFAULT } from "./data";

describe("Dados da 101Clinic", () => {
  it("usa o telefone informado em ligações e WhatsApp", () => {
    expect(BIZ.phoneE164).toBe("+5562985786775");
    const link = new URL(waLink(WA_DEFAULT));
    expect(link.pathname).toBe("/5562985786775");
    expect(link.searchParams.get("text")).toContain("101Clinic");
  });
  it("direciona para a localização fornecida", () => {
    expect(BIZ.maps).toBe("https://maps.app.goo.gl/YAmgbQK6KhiUiG4x8");
    expect(BIZ.address).toBe("R. V 8, 4 - Vila Vitoria, Itumbiara - GO, 75533-550");
    expect(new URL(BIZ.mapEmbed).searchParams.get("q")).toContain("Itumbiara");
  });
  it("preserva a nota e o total de avaliações fornecidos", () => {
    expect(BIZ.rating).toBe("4,9");
    expect(BIZ.reviews).toBe(89);
  });
});