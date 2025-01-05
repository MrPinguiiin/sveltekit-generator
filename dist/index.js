"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const makeRoute_1 = __importDefault(require("./commands/makeRoute"));
const program = new commander_1.Command();
program
    .version('1.0.')
    .description('A CLI tool to generate SvelteKit routes and server functions');
// Register the "make:route" command
program
    .command('make:route <routeName>')
    .description('Generate a new SvelteKit route with +page.svelte and +page.server.ts')
    .action(makeRoute_1.default);
program.parse();
