import chalk from 'chalk';
import shell from 'shelljs';
import path from 'path';

const validateRouteName = (routeName: string): boolean => {
  const isValid = /^[a-zA-Z0-9-]+$/.test(routeName);
  if (!isValid) {
    console.log(chalk.red(`Error: Nama route "${routeName}" tidak valid. Hanya boleh mengandung huruf, angka, dan tanda hubung (-).`));
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

  console.log(chalk.green(`Route ${routeName} berhasil dibuat!`));
};

export default makeRoute;