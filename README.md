# Edufeed Prototype

This repository shows how the edufeed can be used for implementing collaboration in the educational space.

This repo is for showing the edufeed concept in a prototype. It works completely in the browser without any backend and simulates the nostr feed in the browser. The purpose is for demonstrating the idea. One can create multiple accounts in the browser and easily switch between them.

## Setup

1. Clone the repository
2. Install the dependencies via `bun install`

## Get started

Start the dev server:

```bash
bun dev
```

Build the app for production:

```bash
bun run build
```

Preview the production build locally:

```bash
bun preview
```

## Maintenance

Update dependencies:

```bash
bun update
```

## Todos

- Start OER from a curated OER

## Limitations

- No nostr / browser only => Thus it cannot show edufeed between multiple browser sessions
- No storage => Everything is deleted if the page is reloaded
