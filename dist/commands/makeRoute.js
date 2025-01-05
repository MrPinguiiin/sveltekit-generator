"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeComponent = exports.makeRoute = void 0;
const chalk_1 = __importDefault(require("chalk"));
const shelljs_1 = __importDefault(require("shelljs"));
const path_1 = __importDefault(require("path"));
const validateRouteName = (routeName) => {
    const isValid = /^[a-zA-Z0-9-]+$/.test(routeName);
    if (!isValid) {
        console.log(chalk_1.default.red(`Error: Route name "${routeName}" is invalid. Only letters, numbers, and hyphens are allowed.`));
    }
    return isValid;
};
const makeRoute = (routeName, isDynamic = false) => {
    if (!validateRouteName(routeName)) {
        return;
    }
    const routePath = path_1.default.join('src', 'routes', isDynamic ? `[${routeName}]` : routeName);
    const libPath = path_1.default.join('src', 'lib', 'functions', 'server', `${routeName}.ts`);
    // Buat direktori route
    shelljs_1.default.mkdir('-p', routePath);
    // Template untuk +page.svelte
    const pageSvelteContent = `
<script lang="ts">
  
</script>

<h1>${routeName} Page</h1>
`;
    // Template untuk +page.server.ts
    const pageServerContent = `
export const PageServerLoad = async () => {
  return {
    message: 'Hello from ${routeName}'
  };
};
`;
    // Buat file +page.svelte
    const pageSveltePath = path_1.default.join(routePath, '+page.svelte');
    shelljs_1.default.ShellString(pageSvelteContent).to(pageSveltePath);
    // Buat file +page.server.ts
    const pageServerPath = path_1.default.join(routePath, '+page.server.ts');
    shelljs_1.default.ShellString(pageServerContent).to(pageServerPath);
    // Template untuk fungsi server
    const serverFunctionContent = `
export const ${routeName}Function = () => {
  return '${routeName} function';
};
`;
    // Buat fungsi server di lib/functions/server
    shelljs_1.default.mkdir('-p', path_1.default.dirname(libPath));
    shelljs_1.default.ShellString(serverFunctionContent).to(libPath);
    // Tampilkan detail file yang dibuat
    console.log(chalk_1.default.green(`Route "${routeName}" created successfully!`));
    console.log(chalk_1.default.blue(`- Route directory: ${routePath}`));
    console.log(chalk_1.default.blue(`- Created file: ${pageSveltePath}`));
    console.log(chalk_1.default.blue(`- Created file: ${pageServerPath}`));
    console.log(chalk_1.default.blue(`- Created file: ${libPath}`));
};
exports.makeRoute = makeRoute;
const makeComponent = (routeName, componentName, isDynamic = false) => {
    if (!validateRouteName(routeName)) {
        return;
    }
    const componentsDir = path_1.default.join('src', 'routes', isDynamic ? `[${routeName}]` : routeName, '(components)');
    // Buat direktori (components) jika belum ada
    shelljs_1.default.mkdir('-p', componentsDir);
    // Template untuk komponen Svelte
    const componentContent = `
<script lang="ts">
  // Add your component logic here
</script>

<div>
  <h1>${componentName} Component</h1>
</div>
`;
    // Buat file komponen
    const componentPath = path_1.default.join(componentsDir, `${componentName}.svelte`);
    shelljs_1.default.ShellString(componentContent).to(componentPath);
    // Tampilkan detail file yang dibuat
    console.log(chalk_1.default.green(`Component "${componentName}" created successfully!`));
    console.log(chalk_1.default.blue(`- Component directory: ${componentsDir}`));
    console.log(chalk_1.default.blue(`- Created file: ${componentPath}`));
};
exports.makeComponent = makeComponent;
