import { describe, expect, vi, beforeEach, test } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CollectionButton } from "../CollectionButton";
import { renderWithProviders } from "@/tests/utils";
import * as useCollectionQueryModule from "@/app/collection/_hooks/queries/use-collection-query";
import * as useRemoveFromCollectionMutationModule from "@/app/collection/_hooks/queries/mutations/use-remove-from-collection-mutation";
import type { Card } from "@/app/cards/types/card";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

const mockCard: Card = {
  card_id: "OP01-001",
  card_name: "Luffy",
  card_set_id: "001",
  card_image: "https://example.com/OP01-001.jpg",
  card_image_id: "OP01-001",
  rarity: "R",
  set_name: "Romance Dawn",
  set_id: "OP01",
  card_type: "CHARACTER",
  card_cost: "4",
  card_power: "5000",
  counter_amount: 1000,
  attribute: "Strike",
  card_color: "RED",
  card_text: "Test",
  sub_types: null,
  life: null,
  inventory_price: 10,
  market_price: 15,
  date_scraped: "2024-01-01",
};

describe("CollectionButton", () => {
  const mockRemoveFromCollection = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      isPending: false,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

    vi.spyOn(
      useRemoveFromCollectionMutationModule,
      "useRemoveFromCollectionMutation",
    ).mockReturnValue({
      mutate: mockRemoveFromCollection,
      isPending: false,
      reset: vi.fn(),
    } as unknown as ReturnType<
      typeof useRemoveFromCollectionMutationModule.useRemoveFromCollectionMutation
    >);
  });

  describe("affichage selon l'état de la collection", () => {
    test("affiche un skeleton pendant le chargement", () => {
      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
        isFetching: false,
        isPending: true,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      expect(
        document.querySelector(".animate-pulse.rounded-lg.bg-slate-800"),
      ).toBeInTheDocument();
    });

    test("affiche le bouton 'Ajouter' quand la carte n'est pas dans la collection", () => {
      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      expect(screen.getByRole("button", { name: "Ajouter" })).toBeInTheDocument();
    });

    test("affiche le bouton 'Possédée' quand la carte est dans la collection", () => {
      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: { id: "1", card_id: "OP01-001" } as never,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      expect(
        screen.getByRole("button", { name: "Possédée" }),
      ).toBeInTheDocument();
    });

    test("affiche 'Retirer' au survol quand la carte est possédée", async () => {
      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: { id: "1", card_id: "OP01-001" } as never,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      const button = screen.getByRole("button", { name: "Possédée" });
      await userEvent.hover(button);

      expect(screen.getByRole("button", { name: "Retirer" })).toBeInTheDocument();
    });
  });

  describe("ouverture de la modale d'ajout", () => {
    test("ouvre la modale d'ajout au clic sur le bouton Ajouter", async () => {
      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      const addButton = screen.getByRole("button", { name: /ajouter/i });
      await userEvent.click(addButton);

      expect(
        screen.getByText("Ajouter à la collection"),
      ).toBeInTheDocument();
    });
  });

  describe("suppression de la collection", () => {
    test("affiche confirm et appelle removeFromCollection au clic sur Retirer", async () => {
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: { id: "1", card_id: "OP01-001" } as never,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      const button = screen.getByRole("button", { name: "Possédée" });
      await userEvent.hover(button);

      const removeButton = screen.getByRole("button", { name: "Retirer" });
      await userEvent.click(removeButton);

      expect(confirmSpy).toHaveBeenCalledWith("Retirer cette carte de la collection ?");
      expect(mockRemoveFromCollection).toHaveBeenCalledWith(mockCard);

      confirmSpy.mockRestore();
    });

    test("n'appelle pas removeFromCollection si l'utilisateur annule le confirm", async () => {
      vi.spyOn(window, "confirm").mockReturnValue(false);

      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: { id: "1", card_id: "OP01-001" } as never,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      const button = screen.getByRole("button", { name: "Possédée" });
      await userEvent.hover(button);

      const removeButton = screen.getByRole("button", { name: "Retirer" });
      await userEvent.click(removeButton);

      expect(mockRemoveFromCollection).not.toHaveBeenCalled();
    });

    test("peut aussi déclencher la suppression en cliquant sur Possédée (même handler)", async () => {
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: { id: "1", card_id: "OP01-001" } as never,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      const ownedButton = screen.getByRole("button", { name: "Possédée" });
      await userEvent.click(ownedButton);

      expect(confirmSpy).toHaveBeenCalled();
      expect(mockRemoveFromCollection).toHaveBeenCalledWith(mockCard);

      confirmSpy.mockRestore();
    });
  });

  describe("état de chargement pendant la suppression", () => {
    test("affiche un loader pendant la suppression", () => {
      vi.spyOn(
        useRemoveFromCollectionMutationModule,
        "useRemoveFromCollectionMutation",
      ).mockReturnValue({
        mutate: mockRemoveFromCollection,
        isPending: true,
        reset: vi.fn(),
      } as unknown as ReturnType<
        typeof useRemoveFromCollectionMutationModule.useRemoveFromCollectionMutation
      >);

      vi.spyOn(useCollectionQueryModule, "useCollectionQuery").mockReturnValue({
        data: { id: "1", card_id: "OP01-001" } as never,
        isLoading: false,
        isError: false,
        error: null,
        isFetching: false,
        isPending: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useCollectionQueryModule.useCollectionQuery>);

      renderWithProviders(<CollectionButton card={mockCard} />);

      expect(document.querySelector(".animate-spin")).toBeInTheDocument();
    });
  });
});
