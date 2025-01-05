#!/usr/bin/env node

import { Command } from 'commander';
import { makeRoute, makeComponent } from './commands/makeRoute';

const program = new Command();

program
  .version('1.0.0')
  .description('A CLI tool to generate SvelteKit routes, components, and server functions');

// Command untuk membuat route
program
  .command('make:route <routeName>')
  .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
  .option('-d, --dynamic', 'Create a dynamic route')
  .action((routeName: string, options: { dynamic: boolean }) => {
    makeRoute(routeName, options.dynamic);
  });

// Command untuk membuat komponen
program
  .command('make:component <routeName> <componentName>')
  .description('Generate a new Svelte component inside the (components) directory of a route')
  .option('-d, --dynamic', 'Create a component inside a dynamic route')
  .action((routeName: string, componentName: string, options: { dynamic: boolean }) => {
    makeComponent(routeName, componentName, options.dynamic);
  });

program.parse(process.argv);