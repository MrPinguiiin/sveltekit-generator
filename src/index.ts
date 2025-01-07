import { Command } from 'commander';
import { makeRoute } from './commands/makeRoute.js';
import { makeComponent } from './commands/makeComponent.js';
import { makeLayout } from './commands/makeLayout.js';
import { makeApi } from './commands/makeAPI.js';

const program = new Command();

program
  .version('1.1.6')
  .description('A CLI tool to generate SvelteKit routes, components, and server functions');

// Command for make route
program
  .command('route <routeName>')
  .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
  .option('-d, --dynamic [param]', 'Create a dynamic route with an optional parameter (default: id)')
  .action((routeName, options) => {
    const isDynamic = !!options.dynamic;
    const dynamicParam = typeof options.dynamic === 'string' ? options.dynamic : 'id';
    makeRoute(routeName, isDynamic, dynamicParam);
  });

// Command for make component
program
  .command('component <routeName> <componentName>')
  .description('Generate a new Svelte component inside the (components) directory of a route')
  .option('-d, --dynamic [param]', 'Create a component inside a dynamic route with an optional parameter (default: id)')
  .action((routeName, componentName, options) => {
    const isDynamic = !!options.dynamic;
    const dynamicParam = typeof options.dynamic === 'string' ? options.dynamic : 'id';
    makeComponent(routeName, componentName, isDynamic, dynamicParam);
  });

// Command for make layout
program
  .command('layout <layoutName>')
  .description('Generate a new SvelteKit layout with +layout.svelte and +layout.server.ts')
  .action((layoutName) => {
    makeLayout(layoutName);
  });

// Command for make API endpoint
program
  .command('api <apiName>')
  .description('Generate a new API endpoint with +server.ts')
  .option('-d, --dynamic [param]', 'Create a dynamic API endpoint with an optional parameter (default: id)')
  .action((apiName, options) => {
    const isDynamic = !!options.dynamic;
    const dynamicParam = typeof options.dynamic === 'string' ? options.dynamic : 'id';
    makeApi(apiName, isDynamic, dynamicParam);
  });

program.parse(process.argv);