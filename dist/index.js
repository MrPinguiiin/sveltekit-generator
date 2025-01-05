#!/usr/bin/env node
import { Command } from 'commander';
import { makeRoute, makeComponent } from './commands/makeRoute.js';
const program = new Command();
program
    .version('1.1.3')
    .description('A CLI tool to generate SvelteKit routes, components, and server functions');
// Command untuk membuat route
program
    .command('make:route <routeName>')
    .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
    .option('-d, --dynamic [param]', 'Create a dynamic route with an optional parameter (default: id)')
    .action((routeName, options) => {
    const isDynamic = !!options.dynamic; // Cek apakah opsi --dynamic digunakan
    const dynamicParam = typeof options.dynamic === 'string' ? options.dynamic : 'id'; // Ambil parameter dinamis atau gunakan 'id' sebagai default
    makeRoute(routeName, isDynamic, dynamicParam);
});
// Command untuk membuat komponen
program
    .command('make:component <routeName> <componentName>')
    .description('Generate a new Svelte component inside the (components) directory of a route')
    .option('-d, --dynamic [param]', 'Create a component inside a dynamic route with an optional parameter (default: id)')
    .action((routeName, componentName, options) => {
    const isDynamic = !!options.dynamic; // Cek apakah opsi --dynamic digunakan
    const dynamicParam = typeof options.dynamic === 'string' ? options.dynamic : 'id'; // Ambil parameter dinamis atau gunakan 'id' sebagai default
    makeComponent(routeName, componentName, isDynamic, dynamicParam);
});
program.parse(process.argv);
process.on('warning', (warning) => {
    if (warning.name === 'ExperimentalWarning') {
        return;
    }
    console.warn(warning);
});
