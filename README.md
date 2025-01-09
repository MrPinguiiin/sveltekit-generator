# SvelteKit Generator

**SvelteKit Generator** is a powerful CLI tool inspired by Laravel Artisan (`php artisan make:`). It simplifies the process of generating routes, components, server functions, API endpoints, and layouts in your SvelteKit projects. With `sveltekit-generator`, you can save time and focus on building your application.

---

## Features

- **Generate Routes**: Automatically creates `+page.svelte` and `+page.server.ts` files in the `src/routes/` directory.
- **Dynamic Route Parameters**: Supports creating dynamic routes parameter (e.g., `/user/[id]`, `store/[storeId]`).
- **Custom Dynamic Parameters**: Allows you to specify custom dynamic parameters (e.g., `--dynamic userId` or using the `-d` flag).
- **Component Generator**: Easily create Svelte components inside route directories.
- **API Endpoint Generator**: Automatically generates `+server.ts` files for API endpoints.
- **Layout Generator**: Quickly create layout files (`+layout.svelte` and `+layout.server.ts`) for consistent page structures.
- **Route Name Validation**: Ensures route names only contain letters, numbers, and hyphens.
- **Route Store Validation and Creation**: Validates and creates stores automatically (e.g., src/lib/stores).
- **Ready-to-Use Templates**: Provides pre-built file templates for quick setup.

---

## Installation

Install `sveltekit-generator` using your preferred package manager:

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

## Generate a Basic Route:

```bash
pnpm generate route <route_name>
```

### Custom a Dynamic Route Parameter

```bash
pnpm generate route <route_name> -d <param_name>
```
### Generate routes in spesific directory

```bash
pnpm generate route ('(folder_name)/<route_name>')
```

### Generate dynamic routes in spesific directory

```bash
pnpm generate route ('(folder_name)/<route_name>') --dynamic <param_name>
```
### Generate a Component Inside a Route
```bash
pnpm generate component <route_name> <component_name>
```
### Generate / Custom a Component Inside a Dynamic Route existing

```bash
pnpm generate component <route_name> -d <param_name> <component_name>
```

## Generate API endpoint

```bash
pnpm generate api <api_name>
```

### Generate a Dynamic API endpoint

```bash
pnpm generate api <api_name> -d <param_name>
```

## Generate a Layout

```bash
pnpm generate layout <layout_name>
```

## Generate a Store (type: writable, readable, derived)

```bash
pnpm generate store <store_name>
```

### Generate a Store with a different type

```bash
pnpm generate store <store_name> -t readable
```

```bash
pnpm generate store <store_name> -t derived
```

```bash
pnpm generate store <store_name> -t writable
```

### Generate a store in spesific path

```bash
pnpm generate store <store_name> -p <path>
```



**Why Use SvelteKit Generator?**

- Save Time: Automates repetitive tasks like creating routes, components, API endpoints, and layouts.
- Consistency: Ensures a consistent project structure.
- Easy to Use: Simple commands for generating files.
- Customizable: Supports dynamic routes and custom parameters.

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the **MIT License**. See the [LICENSE.md](LICENSE.md) file for details.
