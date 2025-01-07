import path from 'path';
import shell from 'shelljs';
import chalk from 'chalk';
import { validateRouteName } from '../utils/validateRouteName.js';
import { createFile } from '../utils/createFile.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

// Dapatkan __dirname menggunakan import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const makeRoute = (routeName: string, isDynamic: boolean = false, dynamicParam: string = 'id') => {
  if (!validateRouteName(routeName)) return;

  const routePath = isDynamic
    ? path.join('src', 'routes', routeName, `[${dynamicParam}]`)
    : path.join('src', 'routes', routeName);

  shell.mkdir('-p', routePath);

  // Baca template dari file
  let pageSvelteContent: string;
  let pageServerContent: string;
  let serverFunctionContent: string;

  try {
    const pageSvelteTemplate = readFileSync(path.join(__dirname, '../templates/pageSvelte.template'), 'utf-8');
    const pageServerTemplate = readFileSync(path.join(__dirname, '../templates/pageServer.template'), 'utf-8');
    const serverFunctionTemplate = readFileSync(path.join(__dirname, '../templates/serverFunction.template'), 'utf-8');

    // Ganti placeholder dengan nilai yang sesuai
    const routeNameFormatted = routeName.split('/').pop() || '';
    pageSvelteContent = pageSvelteTemplate.replace(/{{routeName}}/g, routeNameFormatted);
    pageServerContent = isDynamic
      ? pageServerTemplate
          .replace(/{{routeName}}/g, routeNameFormatted)
          .replace(/{{dynamicParam}}/g, dynamicParam)
      : pageServerTemplate.replace(/{{routeName}}/g, routeNameFormatted);

    // Buat konten untuk server function
    serverFunctionContent = serverFunctionTemplate.replace(/{{functionName}}/g, routeNameFormatted);
  } catch (error) {
    console.error(chalk.red('Error reading template files:'), error);
    return;
  }

  // Buat file +page.svelte dan +page.server.ts
  const pageSveltePath = path.join(routePath, '+page.svelte');
  const pageServerPath = path.join(routePath, '+page.server.ts');
  createFile(pageSveltePath, pageSvelteContent);
  createFile(pageServerPath, pageServerContent);

  // Buat file server function di src/lib/functions/server
  const serverFunctionPath = path.join('src', 'lib', 'functions', 'server', `${routeName.split('/').pop()}.ts`);
  shell.mkdir('-p', path.dirname(serverFunctionPath));
  createFile(serverFunctionPath, serverFunctionContent);

  // Log route dan file yang di-generate
  console.log(chalk.green(`Route "${routeName}${isDynamic ? `/[${dynamicParam}]` : ''}" created successfully!`));
  console.log(chalk.blue(`- Route directory: ${routePath}`));
  console.log(chalk.blue(`- Created file: ${pageSveltePath}`));
  console.log(chalk.blue(`- Created file: ${pageServerPath}`));
  console.log(chalk.blue(`- Created server function: ${serverFunctionPath}`));
};