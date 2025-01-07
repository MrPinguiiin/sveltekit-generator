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

export const makeApi = (apiName: string, isDynamic: boolean = false, dynamicParam: string = 'id') => {
  if (!validateRouteName(apiName)) return;

  // Tentukan path API
  const apiPath = isDynamic
    ? path.join('src', 'routes', 'api', apiName, `[${dynamicParam}]`)
    : path.join('src', 'routes', 'api', apiName);

  shell.mkdir('-p', apiPath);

  // Baca template dari file
  let apiServerContent: string;

  try {
    const apiServerTemplate = readFileSync(path.join(__dirname, '../templates/apiServer.template'), 'utf-8');
    apiServerContent = isDynamic
      ? apiServerTemplate.replace(/{{dynamicParam}}/g, dynamicParam)
      : apiServerTemplate;
  } catch (error) {
    console.error(chalk.red('Error reading template files:'), error);
    return;
  }

  // Buat file +server.ts
  const apiServerPath = path.join(apiPath, '+server.ts');
  createFile(apiServerPath, apiServerContent);

  // Log route dan file yang di-generate
  console.log(chalk.green(`API endpoint "${apiName}${isDynamic ? `/[${dynamicParam}]` : ''}" created successfully!`));
  console.log(chalk.blue(`- API directory: ${apiPath}`));
  console.log(chalk.blue(`- Created file: ${apiServerPath}`));
};