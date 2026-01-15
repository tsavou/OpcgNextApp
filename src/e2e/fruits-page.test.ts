import { test, expect } from "@playwright/test";

test("updates the fruit list on form submit", async ({ page }) => {
  await page.goto("/fruits");
  
  await page.getByRole("textbox", { name: "Le bon fruit à ajouter", exact: true }).fill("Banane");
  await page.getByRole("textbox", { name: "La quantité de fruits", exact: true }).fill("2");
  await page.getByRole("button", { name: "Soumettre" }).click();
  
  await expect(page.getByText("Banane")).toBeVisible();
  await expect(page.getByText("2")).toBeVisible();
});