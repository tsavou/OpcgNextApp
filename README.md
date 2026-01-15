# LogPoseCards - One Piece TCG Manager

Application web moderne pour gérer votre collection de cartes One Piece Trading Card Game. LogPoseCards vous permet de créer et gérer votre collection, suivre la valeur de vos cartes, obtenir des conseils stratégiques et bien plus encore.

## 🚀 Fonctionnalités

- **Gestion de collection** : Ajoutez et organisez vos cartes One Piece TCG
- **Authentification utilisateur** : Système d'inscription et de connexion sécurisé
- **Catalogue de cartes** : Parcourez les cartes et sets disponibles. Synchronisation avec l'API publique **[OPTCG API](https://optcgapi.com/documentation)** pour des données toujours à jour.
- **Détails des cartes** : Consultez les informations détaillées de chaque carte
- **Statistiques de collection** : Suivez vos statistiques personnelles
- **Conseils stratégiques IA** : Obtenez des conseils pour optimiser votre deck
- **Internationalisation** : Interface disponible en français et en anglais
- **Profil utilisateur** : Gérez vos paramètres et préférences

### 🤖 Automatisations & IA (Architecture Hybride)
- **Coach Stratégique IA** : Chaque carte ajoutée est analysée par **Google Gemini** (via Make) pour générer un conseil tactique unique affiché directement sur la fiche de la carte.
- **Notifications Discord** : Alertes en temps réel sur votre serveur communautaire lors de l'ajout de nouvelles cartes via Webhooks.


## 🛠️ Technologies

- **Framework** : [Next.js 15](https://nextjs.org/) avec App Router
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Base de données** : [Supabase](https://supabase.com/)
- **Gestion d'état** : [TanStack Query](https://tanstack.com/query)
- **Formulaires** : [React Hook Form](https://react-hook-form.com/) avec [Zod](https://zod.dev/)
- **Internationalisation** : [next-intl](https://next-intl-docs.vercel.app/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Automatisation** : Make (Orchestration des flux asynchrones).

- **Intelligence Artificielle** : Google Gemini (Génération de contenu).

- **Data Source** :[OPTCG API](https://optcgapi.com/documentation).

## 📋 Prérequis

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Compte Supabase (pour la base de données et l'authentification)
- Un compte Make (pour les automatisations)

## 🚦 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/tsavou/OpcgNextApp.git
cd OpcgNextApp
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. Configurez les variables d'environnement :
Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

4. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📜 Scripts disponibles

- `npm run dev` : Lance le serveur de développement avec Turbopack
- `npm run build` : Compile l'application pour la production avec Turbopack
- `npm run start` : Lance le serveur de production
- `npm run lint` : Exécute ESLint pour vérifier le code
- `npm run format` : Formate le code avec Prettier
- `npm run format:check` : Vérifie le formatage du code

## 📁 Structure du projet

```
next_app/
├── src/
│   ├── app/                    # Pages et routes Next.js
│   │   ├── _components/        # Composants partagés
│   │   ├── auth/               # Pages d'authentification
│   │   ├── cards/              # Pages et composants de cartes
│   │   ├── collection/         # Page de collection
│   │   ├── profile/            # Page de profil
│   │   ├── sets/               # Pages de sets
│   │   └── settings/           # Page de paramètres
│   ├── i18n/                   # Configuration i18n
│   └── lib/                    # Utilitaires et configurations
├── messages/                    # Fichiers de traduction
│   ├── en/                     # Traductions anglaises
│   └── fr/                     # Traductions françaises
└── public/                     # Fichiers statiques
```

## 🌍 Internationalisation

L'application supporte deux langues :
- Français (par défaut)
- Anglais

Les traductions sont gérées via `next-intl` et se trouvent dans le dossier `messages/`.

## 🎨 Personnalisation

### Configuration Next.js
Les options de configuration se trouvent dans `next.config.ts`, incluant :
- Configuration des images distantes
- Plugin next-intl
- Options expérimentales

### Styles
Les styles globaux sont définis dans `src/app/globals.css` et utilisent Tailwind CSS.

## 🚢 Déploiement

### Vercel (recommandé)
Le moyen le plus simple de déployer cette application Next.js est d'utiliser [Vercel](https://vercel.com/new) :

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez !

### Autres plateformes
Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus d'informations.

## 📝 Licence

Ce projet est privé.

## 👥 Contribution

Ce projet est actuellement en développement. Pour toute question ou suggestion, veuillez ouvrir une issue.

---

Développé avec ❤️ pour les collectionneurs de cartes One Piece TCG
