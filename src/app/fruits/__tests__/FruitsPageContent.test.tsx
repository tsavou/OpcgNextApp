
import { renderWithProviders } from "@/tests/utils";
import { FruitsPageContent } from "../_components/FruitsPageContent";
import { screen, within } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { act } from "react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";

const fruitStore = new Map<string, number>();

const server = setupServer(
 http.get("/api/fruits", async () =>
  HttpResponse.json(Object.fromEntries(fruitStore)),
 ),
 http.post("/api/fruits", async ({ request }) => {
  const { fruit, quantity } = (await request.json()) as {
   fruit: string;
   quantity: number;
  };
  fruitStore.set(fruit, quantity);
  return HttpResponse.json(Object.fromEntries(fruitStore));
 }),
);

beforeAll(() => server.listen());
afterEach(() => {
 fruitStore.clear();
 server.resetHandlers();
});
afterAll(() => server.close());

async function renderFruitsPageContent() {
    await act(async() => {
        renderWithProviders(<FruitsPageContent />)
    });
}

test("has a correct empty state", async() => {
    // Arrange
    await renderFruitsPageContent();

    // Act


    // Assert

  expect(screen.getByText("Pas encore de fruits"));
 });

 test("updates list on form submit", async() => {
    // Arrange
    const user = userEvent.setup();
    await renderFruitsPageContent();
    const fruitField = screen.getByLabelText("Le bon fruit à ajouter");
    const quantityField = screen.getByLabelText("La quantité de fruits");
    const submitButton = screen.getByRole("button", { name: "Soumettre" });

    // Act
    await user.type(fruitField, "Banane");
    await user.type(quantityField, "2");
    await user.click(submitButton);

    // Assert
    const fruitList = screen.getByLabelText("Fruits disponibles :");
    expect(within(fruitList).getByText("Banane")).toBeVisible();

 });

 
