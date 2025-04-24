# Edufeed Prototype

This repository demonstrates the Edufeed concept, showcasing how it can be used to foster collaboration in the educational space.

The prototype is entirely browser-based, requiring no backend. It simulates a Nostr feed directly in the browser, allowing users to explore the idea. You can create multiple accounts within the browser and seamlessly switch between them.

## Explanation video

https://github.com/user-attachments/assets/298ca4ba-7f7a-4480-9447-a805995ee789

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

## Getting Started

To start the development server:
```bash
bun dev
```

To build the app for production:
```bash
bun run build
```

To preview the production build locally:
```bash
bun preview
```

## Maintenance

To update dependencies:
```bash
bun update
```

## Todos

- Start OER from a curated OER.

## Limitations

- **Browser-only simulation**: The prototype does not support Nostr feeds across multiple browser sessions.
- **No persistent storage**: All data is lost upon page reload.
