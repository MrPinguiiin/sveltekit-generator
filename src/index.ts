import { Command } from "commander";
import makeRoute from "./commands/makeRoute";


    const program = new Command();

    program
        .version('1.0.')
        .description('A CLI tool to generate SvelteKit routes and server functions');

    // Register the "make:route" command
    program
            .command('make:route <routeName>')
            .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
            .action(makeRoute);

    program.parse();