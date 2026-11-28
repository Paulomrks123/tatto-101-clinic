import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AdminGate } from "./AdminGate";

const HASH_KEY = "101clinic-admin-pin-hash-v1";
const SESSION_KEY = "101clinic-admin-unlocked-v1";
const EMAIL = "101clinic@gmail.com";

// jsdom nem sempre expõe crypto.subtle; fornece um resumo determinístico para o teste.
if (!globalThis.crypto?.subtle?.digest) {
  Object.defineProperty(globalThis, "crypto", {
    configurable: true,
    value: {
      ...globalThis.crypto,
      subtle: {
        digest: async (_algorithm: string, bytes: Uint8Array) => {
          let hash = 2166136261;
          for (const byte of bytes) hash = Math.imul(hash ^ byte, 16777619) >>> 0;
          const out = new Uint8Array(32);
          new DataView(out.buffer).setUint32(0, hash);
          return out.buffer;
        },
      },
    },
  });
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});

function fill(email: string, password: string, confirm?: string) {
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Senha"), { target: { value: password } });
  if (confirm !== undefined) {
    fireEvent.change(screen.getByLabelText("Confirmar senha"), { target: { value: confirm } });
  }
}

// O envio é assíncrono (resumo da senha); o clique e a espera rodam dentro de act.
async function clickButton(name: RegExp) {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name }));
    await new Promise((resolve) => setTimeout(resolve, 60));
  });
}

it("mostra o botão Criar conta quando o aparelho ainda não está cadastrado", () => {
  render(<AdminGate />);
  expect(screen.getByText("Criar conta administrativa")).toBeDefined();
  expect(screen.getByRole("button", { name: /Criar conta/ })).toBeDefined();
  expect(screen.getByLabelText("Confirmar senha")).toBeDefined();
  expect(screen.queryByRole("button", { name: /Entrar/ })).toBeNull();
});

it("cria a conta e troca o painel para Entrar nas próximas visitas", async () => {
  render(<AdminGate />);
  fill(EMAIL, "senha-forte-123", "senha-forte-123");
  await clickButton(/Criar conta/);
  expect(localStorage.getItem(HASH_KEY)).toBeTruthy();
  expect(sessionStorage.getItem(SESSION_KEY)).toBe("yes");

  cleanup();
  render(<AdminGate />);
  expect(screen.getByText("Área administrativa")).toBeDefined();
  expect(screen.getByRole("button", { name: /Entrar/ })).toBeDefined();
  expect(screen.queryByLabelText("Confirmar senha")).toBeNull();
});

it("recusa a criação de conta quando as senhas não coincidem", () => {
  render(<AdminGate />);
  fill(EMAIL, "senha-forte-123", "outra-senha-123");
  fireEvent.click(screen.getByRole("button", { name: /Criar conta/ }));
  expect(screen.getByRole("alert").textContent).toContain("As senhas não coincidem.");
  expect(localStorage.getItem(HASH_KEY)).toBeNull();
});

it("pede a senha cadastrada em um aparelho já registrado", async () => {
  render(<AdminGate />);
  fill(EMAIL, "senha-forte-123", "senha-forte-123");
  await clickButton(/Criar conta/);
  cleanup();

  render(<AdminGate />);
  fill(EMAIL, "senha-errada-123");
  await clickButton(/Entrar/);
  expect(screen.getByRole("alert").textContent).toContain("Senha incorreta");
  // A tentativa errada não libera o painel.
  expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  expect(screen.getByRole("button", { name: /Entrar/ })).toBeDefined();

  fill(EMAIL, "senha-forte-123");
  await clickButton(/Entrar/);
  expect(screen.getByRole("alert")).toBeNull();
  expect(screen.getByText("Painel administrativo")).toBeDefined();
});
