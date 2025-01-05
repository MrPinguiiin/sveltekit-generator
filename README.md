# SvelteKit Generator

**SvelteKit Generator** is a CLI tool inspired by Laravel Artisan (`php artisan make:`). This tool helps you automatically generate routes, components, and server functions in your SvelteKit project. With `sveltekit-generator`, you can save time and effort when developing SvelteKit projects.

---

## Features

- **Generate Routes**: Automatically creates `+page.svelte` and `+page.server.ts` files in the `src/routes/` directory.
- **Route Name Validation**: Ensures route names only contain letters, numbers, and hyphens.
- **Complex File Templates**: Provides ready-to-use file templates.
- **Dynamic Routes**: Supports creating dynamic routes (e.g., `[id]`, `[userId]`).
- **Custom Dynamic Parameters**: Allows you to specify custom dynamic parameters (e.g., `--dynamic userId`).

---

## Installation

You can install `sveltekit-generator` using `npm`, `pnpm`, or `bun`:

### Using npm
```bash
npm i sveltekit-generator
```

### Using pnpm
```bash
pnpm i sveltekit-generator
```

### Using bun
```bash
bun install i sveltekit-generator
```
### After installation, you can can put this command in your `package.json` file to use it globally:

```json
"scripts": {
    "generate": "sveltekit-generator"
}
```

## Usage

### Generate a Basic Route:

```bash
pnpm generate make:route <route_name>
```

### Generate / Custom a Dynamic Route existing

```bash
pnpm generate make:route <route_name> --dynamic <param_name>
```

### Generate a Component Inside a Route

```bash
pnpm generate make:component <route_name> <component_name>
```

### Generate / Custom a Component Inside a Dynamic Route existing

```bash
pnpm generate make:component <route_name> <component_name> --dynamic <param_name>
```
