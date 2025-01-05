# SvelteKit Generator

**SvelteKit Generator** is a CLI tool inspired by Laravel Artisan (`php artisan make:`). This tool helps you automatically generate routes, components, and server functions in your SvelteKit project. With `sveltekit-generator`, you can save time and effort when developing SvelteKit projects.

---

## Features

- **Generate Routes**: Automatically creates `+page.svelte` and `+page.server.ts` files in the `src/routes/` directory.
- **Route Name Validation**: Ensures route names only contain letters, numbers, and hyphens.
- **Complex File Templates**: Provides ready-to-use file templates.
- **Dynamic Routes**: Supports creating dynamic routes (e.g., `[id]`).

---

## Installation

You can install `sveltekit-generator` using `npm`, `pnpm`, or `bun`:

### Using npm
```bash
npm install -g sveltekit-generator
```bash
pnpm install -g sveltekit-generator
```bash
bun install -g sveltekit-generator