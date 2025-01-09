import path from 'path';
import shell from 'shelljs';
import chalk from 'chalk';
import { validateStoreName } from '../utils/validateStoreName.js'; // Validasi nama store
import { createFile } from '../utils/createFile.js'; // Utility untuk membuat file
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

// Dapatkan __dirname menggunakan import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const makeStore = (storeName: string, type: string = 'writable', customPath: string = 'src/lib/stores') => {
    if (!validateStoreName(storeName)) {
      console.error(chalk.red(`Invalid store name: ${storeName}`));
      return;
    }
  
    // Tambahkan jenis store ke nama file
    const storeFileName = `${storeName}${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const storePath = path.join(customPath, `${storeFileName}.ts`);
  
    // Baca template dari file
    let storeContent: string;
  
    try {
      const storeTemplatePath = path.join(__dirname, '../templates/storefor.template');
      const storeTemplateContent = readFileSync(storeTemplatePath, 'utf-8');
  
      // Ambil template berdasarkan tipe store
      const templateMatch = storeTemplateContent.match(new RegExp(`${type} = \`([\\s\\S]*?)\``));
      if (!templateMatch || !templateMatch[1]) {
        console.error(chalk.red(`Template for store type "${type}" not found.`));
        return;
      }
  
      // Ganti placeholder dengan nama store
      storeContent = templateMatch[1].replace(/{{storeName}}/g, storeName);
    } catch (error) {
      console.error(chalk.red('Error reading template files:'), error);
      return;
    }
  
    // Buat direktori jika belum ada
    shell.mkdir('-p', path.dirname(storePath));
  
    // Buat file store
    createFile(storePath, storeContent);
  
    // Log store yang di-generate
    console.log(chalk.green(`${type} store "${storeName}" created successfully!`));
    console.log(chalk.blue(`- Store path: ${storePath}`));
  };