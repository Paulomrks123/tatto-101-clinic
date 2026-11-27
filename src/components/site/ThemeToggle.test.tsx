import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.classList.remove("light", "dark");
});

it("abre no modo claro e salva a preferência ao alternar", () => {
  render(<ThemeToggle />);
  // Sem escolha salva, o site abre no modo claro.
  expect(screen.getByRole("button", { name: "Ativar modo escuro" })).toBeDefined();
  fireEvent.click(screen.getByRole("button", { name: "Ativar modo escuro" }));
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(localStorage.getItem("clinic-theme-v2")).toBe("dark");
  fireEvent.click(screen.getByRole("button", { name: "Ativar modo claro" }));
  expect(document.documentElement.classList.contains("light")).toBe(true);
  expect(localStorage.getItem("clinic-theme-v2")).toBe("light");
});

it("restaura o modo escuro salvo", () => {
  localStorage.setItem("clinic-theme-v2", "dark");
  render(<ThemeToggle />);
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(screen.getByRole("button", { name: "Ativar modo claro" })).toBeDefined();
});
