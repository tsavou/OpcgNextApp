import { test, expect } from '@playwright/test';

test.describe('Parcours Critique : Gestion de Collection', () => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  test('Un utilisateur peut se connecter, ajouter une carte et la retirer', async ({ page }) => {
    
    // --- ÉTAPE 1 : CONNEXION ---
    await test.step('Connexion utilisateur', async () => {
      await page.goto('/auth/login');
      await page.fill('input[type="email"]', email!);
      await page.fill('input[type="password"]', password!);
      await page.click('button[type="submit"]');
      
      await expect(page).not.toHaveURL(/.*login/);
      await expect(page).toHaveURL(/.*profile/);

    });

    // --- ÉTAPE 2 : NAVIGATION VERS LES CARTES ---
    await test.step('Navigation vers les cartes', async () => {
      
      await page.goto('/cards'); 
      
      const firstCardLink = page.locator('a[href^="/cards/"]').first();
      await firstCardLink.waitFor({ state: 'visible', timeout: 15000 });
      await firstCardLink.click();
      
      await expect(page).toHaveURL(/\/cards\/.+/);
    });

    // --- ÉTAPE 3 : AJOUT À LA COLLECTION ---
    await test.step('Ouverture de la modale et ajout', async () => {
        const ownedButton = page.getByRole('button', { name: /possédée|owned/i });
        
        if (await ownedButton.isVisible()) {
            page.once('dialog', dialog => dialog.accept());
            await ownedButton.click();
            await expect(page.getByRole('button', { name: /ajouter|add/i })).toBeVisible();
        }

        const addButton = page.getByRole('button', { name: /ajouter|add/i }).first();
        await expect(addButton).toBeEnabled();
        await addButton.click();

        const modal = page.getByRole('dialog'); 
        await expect(modal).toBeVisible({ timeout: 10000 });

        //await expect(page.getByText('Ajouter à la collection', { exact: true })).toBeVisible();
        
        await modal.getByLabel(/langue|language/i).selectOption('FR');
        await modal.getByLabel(/état|condition/i).selectOption('EX'); // EX = Excellent
        await modal.getByLabel(/prix d'achat|purchase price/i).fill('100');

        await modal.getByRole('button', { name: /ajouter à ma collection/i }).click();
    });

    // --- ÉTAPE 4 : VÉRIFICATION DE L'AJOUT ---
    await test.step('Vérification bouton Possédée', async () => {
        await expect(page.getByText('Ajouter à la collection', { exact: true })).not.toBeVisible();

        await expect(page.getByRole('button', { name: /possédée|owned/i })).toBeVisible({ timeout: 10000 });
    });

    // --- ÉTAPE 5 : RETRAIT DE LA COLLECTION ---
    await test.step('Retrait de la carte', async () => {
      const ownedButton = page.getByRole('button', { name: /possédée|owned/i });
      
      await ownedButton.hover();
      await expect(page.getByText(/retirer|remove/i)).toBeVisible();

      page.once('dialog', (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept();
      });

      await ownedButton.click();

      await expect(page.getByRole('button', { name: /ajouter|add/i })).toBeVisible();
    });

  });
});