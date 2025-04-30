import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../src/App";
import "@testing-library/jest-dom";
import React from "react";

test("erstellt eine neue Kategorie", async () => {
  // App rendern
  render(<App />);

  // Finde das Eingabefeld und den Button
  const inputElement = screen.getByPlaceholderText("Neue Kategorie...");
  const buttonElement = screen.getByRole("button", { name: /Kategorie hinzufügen/i });

  // Simuliere die Eingabe einer neuen Kategorie
  fireEvent.change(inputElement, { target: { value: "Meine neue Kategorie" } });

  // Simuliere einen Klick auf den Button
  fireEvent.click(buttonElement);

  // Debugge die DOM-Struktur nach dem Klick
  screen.debug();

  // Warte auf das DOM-Update und prüfe, ob die neue Kategorie erscheint
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /Meine neue Kategorie/i })).toBeInTheDocument();
  });
});

test("Löscht die Kategorie", async () => {
  // App rendern
  render(<App />);

  // Finde das Eingabefeld und den Button
  const deleteButtonElement = await screen.findByText("🗑️");
  // Simuliere einen Klick auf den Button
  fireEvent.click(deleteButtonElement);
  // Prüfe, ob die Kategorie gelöscht wurde, indem wir schauen, ob der Delete-Button nicht mehr im Dokument ist
  expect(deleteButtonElement).not.toBeInTheDocument();
});
