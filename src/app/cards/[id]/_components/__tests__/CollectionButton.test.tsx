import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, test } from 'vitest';
import { CollectionButton } from '../CollectionButton';
import { renderWithProviders } from '@/tests/utils'; // Import de ton utilitaire
import { Card } from '@/app/cards/types/card';

// --- Mocks ---

const mockUseCollectionQuery = vi.fn();
vi.mock('../../../collection/_hooks/queries/use-collection-query', () => ({
  useCollectionQuery: (id: string) => mockUseCollectionQuery(id)
}));

const mockRemoveFromCollection = vi.fn();
vi.mock('@/app/collection/_hooks/queries/mutations/use-remove-from-collection-mutation', () => ({
  useRemoveFromCollectionMutation: () => ({
    mutate: mockRemoveFromCollection,
    isPending: false
  })
}));

vi.mock('@/app/collection/_components/AddToCollectionFormModal', () => ({
  AddToCollectionFormModal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('../../helpers/card', () => ({
  getCardUniqueId: () => 'OP01-001'
}));

const mockCard = { card_id: 'OP01-001', card_name: 'Luffy', card_set_id: 'OP01', card_image: 'https://example.com/image.jpg', card_image_id: '123', rarity: 'COMMON', set_name: 'One Piece', set_id: 'OP01', card_type: 'CHARACTER', card_cost: '1', card_power: '100', counter_amount: 0, attribute: 'ONE PIECE', card_color: 'BLUE', card_text: 'Luffy is a pirate', sub_types: 'PIRATE', life: '100', inventory_price: 100, market_price: 100, date_scraped: '2021-01-01' } as unknown as Card;

describe('CollectionButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('affiche le squelette de chargement', () => {
    mockUseCollectionQuery.mockReturnValue({ data: null, isLoading: true });

    const { container } = renderWithProviders(<CollectionButton card={mockCard} />);
    
    expect(container.getElementsByClassName('animate-pulse').length).toBeGreaterThan(0);
  });

  test('affiche le bouton "Ajouter" quand la carte n\'est pas dans la collection', () => {
    mockUseCollectionQuery.mockReturnValue({ data: null, isLoading: false });

    renderWithProviders(<CollectionButton card={mockCard} />);

    // On cherche le VRAI texte défini dans tes fichiers de traduction (collection.add)
    expect(screen.getByText('Ajouter')).toBeInTheDocument();
    
    // On vérifie que le texte "Possédée" n'est pas là
    expect(screen.queryByText('Possédée')).not.toBeInTheDocument();
  });

  // CAS 3 : Carte POSSÉDÉE -> Doit afficher "Possédée" et permettre la suppression
  test('affiche le statut "Possédée" et gère la suppression', () => {
    // Simulation : l'API renvoie un item, donc je possède la carte
    mockUseCollectionQuery.mockReturnValue({ data: { id: 'item-123' }, isLoading: false });

    renderWithProviders(<CollectionButton card={mockCard} />);

    const button = screen.getByRole('button');

    // 1. Vérification état initial
    expect(screen.getByText('Possédée')).toBeInTheDocument();

    // 2. Interaction : Survol (Hover)
    fireEvent.mouseEnter(button);
    // Au survol, le texte doit changer pour "Retirer" (collection.remove)
    expect(screen.getByText('Retirer')).toBeInTheDocument();

    // 3. Interaction : Clic pour supprimer
    fireEvent.click(button);

    // Vérifications
    expect(window.confirm).toHaveBeenCalled(); // Vérifie que la confirm a pop
    expect(mockRemoveFromCollection).toHaveBeenCalledWith(mockCard); // Vérifie l'appel API
  });
});