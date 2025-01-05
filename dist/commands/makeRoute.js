"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const shelljs_1 = __importDefault(require("shelljs"));
const path_1 = __importDefault(require("path"));
const makeRoute = (routeName) => {
    const routePath = path_1.default.join('src', 'routes', routeName);
    const libPath = path_1.default.join('src', 'lib', 'functions', 'server', `${routeName}.ts`);
    // Create route directory
    shelljs_1.default.mkdir('-p', routePath);
    // Create +page.svelte
    shelljs_1.default.touch(path_1.default.join(routePath, '+page.svelte'));
    shelljs_1.default.ShellString(`<h1>${routeName} Page</h1>`).to(path_1.default.join(routePath, '+page.svelte'));
    // Create +page.server.ts
    shelljs_1.default.touch(path_1.default.join(routePath, '+page.server.ts'));
    shelljs_1.default.ShellString(`export const load = async () => {
return {
  message: 'Hello from ${routeName}'
};
};`).to(path_1.default.join(routePath, '+page.server.ts'));
    // Create server function in lib/functions/server
    shelljs_1.default.mkdir('-p', path_1.default.dirname(libPath));
    shelljs_1.default.touch(libPath);
    shelljs_1.default.ShellString(`export const ${routeName}Function = () => {
return '${routeName} function';
};`).to(libPath);
    console.log(chalk_1.default.green(`Route ${routeName} created successfully!`));
};
exports.default = makeRoute;
