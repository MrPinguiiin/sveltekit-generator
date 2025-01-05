import chalk from 'chalk';
import shell from 'shelljs';
import path from 'path';

const validateRouteName = (routeName: string): boolean => {
  const isValid = /^[a-zA-Z0-9-]+$/.test(routeName);
  if (!isValid) {
    console.log(chalk.red(`Error: Route name "${routeName}" is invalid. Only letters, numbers, and hyphens are allowed.`));
  }
  return isValid;
};

const makeRoute = (routeName: string, isDynamic: boolean = false, dynamicParam: string = 'id') => {
  if (!validateRouteName(routeName)) {
    return;
  }

  // Tentukan nama route berdasarkan apakah dynamic atau tidak
  const routeDirName = isDynamic ? `[${dynamicParam}]` : routeName;
  const routePath = path.join('src', 'routes', routeDirName);

  const libPath = path.join('src', 'lib', 'functions', 'server', `${routeName}.ts`);

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

export const load: PageServerLoad = async ({ routeName, params }) => {
    return {message: \`Hello from ${routeName} with dynamic param: \${params.${dynamicParam}}\`}
};

`
    : `
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {message: \`Hello from ${routeName}\`}
};

`;

  // Buat file +page.svelte
  const pageSveltePath = path.join(routePath, '+page.svelte');
  shell.ShellString(pageSvelteContent).to(pageSveltePath);

  // Buat file +page.server.ts
  const pageServerPath = path.join(routePath, '+page.server.ts');
  shell.ShellString(pageServerContent).to(pageServerPath);

  // Template untuk fungsi server
  const serverFunctionContent = `
export async function ${routeName}Function() {
  return '${routeName} function';
};
`;

  // Buat fungsi server di lib/functions/server
  shell.mkdir('-p', path.dirname(libPath));
  shell.ShellString(serverFunctionContent).to(libPath);

  // Tampilkan detail file yang dibuat
  console.log(chalk.green(`Route "${routeName}" created successfully!`));
  console.log(chalk.blue(`- Route directory: ${routePath}`));
  console.log(chalk.blue(`- Created file: ${pageSveltePath}`));
  console.log(chalk.blue(`- Created file: ${pageServerPath}`));
  console.log(chalk.blue(`- Created file: ${libPath}`));
};

const makeComponent = (routeName: string, componentName: string, isDynamic: boolean = false, dynamicParam: string = 'id') => {
  if (!validateRouteName(routeName)) {
    return;
  }

  const componentsDir = path.join(
    'src',
    'routes',
    isDynamic ? `[${dynamicParam}]` : routeName,
    '(components)'
  );

  // Buat direktori (components) jika belum ada
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
  shell.ShellString(componentContent).to(componentPath);

  // Tampilkan detail file yang dibuat
  console.log(chalk.green(`Component "${componentName}" created successfully!`));
  console.log(chalk.blue(`- Component directory: ${componentsDir}`));
  console.log(chalk.blue(`- Created file: ${componentPath}`));
};

export { makeRoute, makeComponent };