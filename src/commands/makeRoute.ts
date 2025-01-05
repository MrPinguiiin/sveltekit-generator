import chalk from 'chalk';
import shell from 'shelljs';
import path from 'path';

const makeRoute = (routeName: string) => {
  const routePath = path.join('src', 'routes', routeName);
  const libPath = path.join('src', 'lib', 'functions', 'server', `${routeName}.ts`);

  // Create route directory
  shell.mkdir('-p', routePath);

  // Create +page.svelte
  shell.touch(path.join(routePath, '+page.svelte'));
  shell.ShellString(`<h1>${routeName} Page</h1>`).to(path.join(routePath, '+page.svelte'));

  // Create +page.server.ts
  shell.touch(path.join(routePath, '+page.server.ts'));
  shell.ShellString(`export const load = async () => {
return {
  message: 'Hello from ${routeName}'
};
};`).to(path.join(routePath, '+page.server.ts'));

  // Create server function in lib/functions/server
  shell.mkdir('-p', path.dirname(libPath));
  shell.touch(libPath);
  shell.ShellString(`export const ${routeName}Function = () => {
return '${routeName} function';
};`).to(libPath);

  console.log(chalk.green(`Route ${routeName} created successfully!`));
};

export default makeRoute;