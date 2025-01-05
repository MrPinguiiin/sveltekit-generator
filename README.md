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
```

### Using pnpm
```bash
pnpm install -g sveltekit-generator
```

### Using bun
```bash
bun install -g sveltekit-generator
```

## Usage

### Generate a new route, run the following command:

```bash
sveltekit-generator make:route <route_name>
```

### Generate a dynamic route, run the following command:

```bash
sveltekit-generator make:route <route_name> --dynamic
```

### Generate a new component inside a route, run the following command:

```bash
sveltekit-generator make:component <route_name> <component_name>
```

### Generate a component inside a dynamic route, run the following command:

```bash
sveltekit-generator make:component <route_name> <component_name> --dynamic
```

