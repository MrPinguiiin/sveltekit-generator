#!/usr/bin/env node

import { Command } from 'commander';
import makeRoute from './commands/makeRoute';

const program = new Command();

program
  .version('1.0.0')
  .description('A CLI tool to generate SvelteKit routes and server functions');

program
  .command('make:route <routeName>')
  .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
  .option('-d, --dynamic', 'Create a dynamic route')
  .action((routeName: string, options: { dynamic: boolean }) => {
    makeRoute(routeName, options.dynamic);
  });

program.parse(process.argv);