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

export const makeComponent = (routeName: string, componentName: string, isDynamic: boolean = false, dynamicParam: string = 'id') => {
  if (!validateRouteName(routeName)) return;

  // Tentukan direktori komponen
  const componentsDir = isDynamic
    ? path.join('src', 'routes', routeName, `[${dynamicParam}]`, '(components)')
    : path.join('src', 'routes', routeName, '(components)');

  shell.mkdir('-p', componentsDir);

  // Baca template dari file
  let componentContent: string;

  try {
    const componentTemplate = readFileSync(path.join(__dirname, '../templates/componentSvelte.template'), 'utf-8');
    componentContent = componentTemplate.replace(/{{componentName}}/g, componentName);
  } catch (error) {
    console.error(chalk.red('Error reading template files:'), error);
    return;
  }

  // Buat file komponen
  const componentPath = path.join(componentsDir, `${componentName}.svelte`);
  createFile(componentPath, componentContent);

  // Log route dan file yang di-generate
  console.log(chalk.green(`Component "${componentName}" created successfully!`));
  console.log(chalk.blue(`- Component directory: ${componentsDir}`));
  console.log(chalk.blue(`- Created file: ${componentPath}`));
};