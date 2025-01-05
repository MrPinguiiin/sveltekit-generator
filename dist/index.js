#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const makeRoute_1 = require("./commands/makeRoute");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('A CLI tool to generate SvelteKit routes, components, and server functions');
// Command untuk membuat route
program
    .command('make:route <routeName>')
    .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
    .option('-d, --dynamic', 'Create a dynamic route')
    .action((routeName, options) => {
    (0, makeRoute_1.makeRoute)(routeName, options.dynamic);
});
// Command untuk membuat komponen
program
    .command('make:component <routeName> <componentName>')
    .description('Generate a new Svelte component inside the (components) directory of a route')
    .option('-d, --dynamic', 'Create a component inside a dynamic route')
    .action((routeName, componentName, options) => {
    (0, makeRoute_1.makeComponent)(routeName, componentName, options.dynamic);
});
program.parse(process.argv);
