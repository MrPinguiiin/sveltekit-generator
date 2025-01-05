import chalk from 'chalk';
import shell from 'shelljs';
import path from 'path';
const validateRouteName = (routeName) => {
    const isValid = /^[a-zA-Z0-9-]+$/.test(routeName);
    if (!isValid) {
        console.log(chalk.red(`Error: Route name "${routeName}" is invalid. Only letters, numbers, and hyphens are allowed.`));
    }
    return isValid;
};
const createFile = (filePath, content) => {
    shell.ShellString(content).to(filePath);
};
const makeRoute = (routeName, isDynamic = false, dynamicParam = 'id') => {
    if (!validateRouteName(routeName))
        return;
    // Tentukan path direktori route
    const routePath = isDynamic
        ? path.join('src', 'routes', routeName, `[${dynamicParam}]`) // Route dinamis: src/routes/store/[storeId]
        : path.join('src', 'routes', routeName); // Route biasa: src/routes/store
    // Buat direktori route
    shell.mkdir('-p', routePath);
    // Template untuk +page.svelte
    const pageSvelteContent = `
<script lang="ts">
  export let data;
</script>

<h1>${routeName} Page</h1>
<p>{data.message}</p>
`;
    // Template untuk +page.server.ts
    const pageServerContent = isDynamic
        ? `
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return { message: \`Hello from ${routeName} with dynamic param: \${params.${dynamicParam}}\` };
};
`
        : `
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return { message: \`Hello from ${routeName}\` };
};
`;
    // Buat file +page.svelte dan +page.server.ts
    createFile(path.join(routePath, '+page.svelte'), pageSvelteContent);
    createFile(path.join(routePath, '+page.server.ts'), pageServerContent);
    // Template untuk fungsi server (hanya untuk route biasa)
    if (!isDynamic) {
        const libPath = path.join('src', 'lib', 'functions', 'server', `${routeName}.ts`); // Pastikan path mengarah ke src
        const serverFunctionContent = `
export async function ${routeName}Function() {
  return '${routeName} function';
};
`;
        shell.mkdir('-p', path.dirname(libPath));
        createFile(libPath, serverFunctionContent);
        // Tampilkan output untuk file server function
        console.log(chalk.blue(`- Created file: ${libPath}`));
    }
    // Tampilkan output
    console.log(chalk.green(`Route "${routeName}${isDynamic ? `/[${dynamicParam}]` : ''}" created successfully!`));
    console.log(chalk.blue(`- Route directory: ${routePath}`));
    console.log(chalk.blue(`- Created file: ${path.join(routePath, '+page.svelte')}`));
    console.log(chalk.blue(`- Created file: ${path.join(routePath, '+page.server.ts')}`));
};
const makeComponent = (routeName, componentName, isDynamic = false, dynamicParam = 'id') => {
    if (!validateRouteName(routeName))
        return;
    // Tentukan path direktori komponen
    const componentsDir = isDynamic
        ? path.join('src', 'routes', routeName, `[${dynamicParam}]`, '(components)') // Komponen di route dinamis: src/routes/store/[storeId]/(components)
        : path.join('src', 'routes', routeName, '(components)'); // Komponen di route biasa: src/routes/store/(components)
    // Buat direktori komponen
    shell.mkdir('-p', componentsDir);
    // Template untuk komponen Svelte
    const componentContent = `
<script lang="ts">
  // Add your component logic here
</script>

<div>
  <h1>${componentName} Component</h1>
</div>

<style>
  /* Add your styles here */
</style>
`;
    // Buat file komponen
    const componentPath = path.join(componentsDir, `${componentName}.svelte`);
    createFile(componentPath, componentContent);
    // Tampilkan output
    console.log(chalk.green(`Component "${componentName}" created successfully!`));
    console.log(chalk.blue(`- Component directory: ${componentsDir}`));
    console.log(chalk.blue(`- Created file: ${componentPath}`));
};
export { makeRoute, makeComponent };
