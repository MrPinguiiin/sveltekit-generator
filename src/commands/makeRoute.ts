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

  // Determine the route name based on whether it's dynamic or not
  const routeDirName = isDynamic ? `[${dynamicParam}]` : routeName;
  const routePath = path.join('src', 'routes', routeDirName);

  const libPath = path.join('src', 'lib', 'functions', 'server', `${routeName}.ts`);

  // Make directory route
  shell.mkdir('-p', routePath);

  // Template for +page.svelte
  const pageSvelteContent = `
<script lang="ts">
  export let data;
</script>

<h1>${routeName} Page</h1>
<p>{data.message}</p>
`;

  // Template for +page.server.ts
  const pageServerContent = isDynamic
    ? `
export const load = async ({ params }) => {
  return {
    message: \`Hello from ${routeName} with dynamic param: \${params.${dynamicParam}}\`
  };
};
`
    : `
export const load = async () => {
  return {
    message: 'Hello from ${routeName}'
  };
};
`;

  // Make file +page.svelte
  const pageSveltePath = path.join(routePath, '+page.svelte');
  shell.ShellString(pageSvelteContent).to(pageSveltePath);

  // Make file +page.server.ts
  const pageServerPath = path.join(routePath, '+page.server.ts');
  shell.ShellString(pageServerContent).to(pageServerPath);

  // Template for server function
  const serverFunctionContent = `
export const ${routeName}Function = () => {
  return '${routeName} function';
};
`;

  // Make file server function in lib/functions/server
  shell.mkdir('-p', path.dirname(libPath));
  shell.ShellString(serverFunctionContent).to(libPath);

  // Show details of created files
  console.log(chalk.green(`Route "${routeName}" created successfully!`));
  console.log(chalk.blue(`- Route directory: ${routePath}`));
  console.log(chalk.blue(`- Created file: ${pageSveltePath}`));
  console.log(chalk.blue(`- Created file: ${pageServerPath}`));
  console.log(chalk.blue(`- Created file: ${libPath}`));
};

export { makeRoute };