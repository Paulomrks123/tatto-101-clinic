import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.classList.remove("light", "dark");
});

it("alterna os modos e salva a preferência", () => {
  render(<ThemeToggle />);
  fireEvent.click(screen.getByRole("button", { name: "Ativar modo claro" }));
  expect(document.documentElement.classList.contains("light")).toBe(true);
  expect(localStorage.getItem("clinic-theme")).toBe("light");
  fireEvent.click(screen.getByRole("button", { name: "Ativar modo escuro" }));
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(localStorage.getItem("clinic-theme")).toBe("dark");
});

it("restaura o modo claro salvo", () => {
  localStorage.setItem("clinic-theme", "light");
  render(<ThemeToggle />);
  expect(document.documentElement.classList.contains("light")).toBe(true);
  expect(screen.getByRole("button", { name: "Ativar modo escuro" })).toBeDefined();
});