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

const makeRoute = (routeName: string, isDynamic: boolean = false) => {
  if (!validateRouteName(routeName)) {
    return;
  }

  const routePath = path.join(
    'src',
    'routes',
    isDynamic ? `[${routeName}]` : routeName
  );

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
  const pageServerContent = `
export const load = async () => {
  return {
    message: 'Hello from ${routeName}'
  };
};
`;

  // Buat file +page.svelte
  shell.ShellString(pageSvelteContent).to(path.join(routePath, '+page.svelte'));

  // Buat file +page.server.ts
  shell.ShellString(pageServerContent).to(path.join(routePath, '+page.server.ts'));

  // Template untuk fungsi server
  const serverFunctionContent = `
export const ${routeName}Function = () => {
  return '${routeName} function';
};
`;

  // Buat fungsi server di lib/functions/server
  shell.mkdir('-p', path.dirname(libPath));
  shell.ShellString(serverFunctionContent).to(libPath);

  console.log(chalk.green(`Route ${routeName} created successfully!`));
};

const makeComponent = (routeName: string, componentName: string, isDynamic: boolean = false) => {
  if (!validateRouteName(routeName)) {
    return;
  }

  const componentsDir = path.join(
    'src',
    'routes',
    isDynamic ? `[${routeName}]` : routeName,
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

  console.log(chalk.green(`Component ${componentName} created successfully in ${componentsDir}!`));
};

export { makeRoute, makeComponent };