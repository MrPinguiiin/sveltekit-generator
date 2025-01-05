#!/usr/bin/env node

import { Command } from 'commander';
import { makeRoute } from './commands/makeRoute';

const program = new Command();

program
  .version('1.0.7')
  .description('A CLI tool to generate SvelteKit routes, components, and server functions');

// Command untuk membuat route
program
  .command('make:route <routeName>')
  .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
  .option('-d, --dynamic [param]', 'Create a dynamic route with an optional parameter (default: id)')
  .action((routeName: string, options: { dynamic?: string | boolean }) => {
    const isDynamic = !!options.dynamic;
    const dynamicParam = typeof options.dynamic === 'string' ? options.dynamic : 'id';
    makeRoute(routeName, isDynamic, dynamicParam);
  });

program.parse(process.argv);