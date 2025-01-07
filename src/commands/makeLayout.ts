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

export const makeLayout = (layoutName: string) => {
  if (!validateRouteName(layoutName)) return;

  const layoutPath = path.join('src', 'routes', layoutName);
  shell.mkdir('-p', layoutPath);

  // Baca template dari file
  let layoutSvelteContent: string;
  let layoutServerContent: string;

  try {
    const layoutSvelteTemplate = readFileSync(path.join(__dirname, '../templates/layoutSvelte.template'), 'utf-8');
    const layoutServerTemplate = readFileSync(path.join(__dirname, '../templates/layoutServer.template'), 'utf-8');

    layoutSvelteContent = layoutSvelteTemplate;
    layoutServerContent = layoutServerTemplate;
  } catch (error) {
    console.error(chalk.red('Error reading template files:'), error);
    return;
  }

  // Buat file +layout.svelte dan +layout.server.ts
  const layoutSveltePath = path.join(layoutPath, '+layout.svelte');
  const layoutServerPath = path.join(layoutPath, '+layout.server.ts');
  createFile(layoutSveltePath, layoutSvelteContent);
  createFile(layoutServerPath, layoutServerContent);

  // Log route dan file yang di-generate
  console.log(chalk.green(`Layout "${layoutName}" created successfully!`));
  console.log(chalk.blue(`- Layout directory: ${layoutPath}`));
  console.log(chalk.blue(`- Created file: ${layoutSveltePath}`));
  console.log(chalk.blue(`- Created file: ${layoutServerPath}`));
};