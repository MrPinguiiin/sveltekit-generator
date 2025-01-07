import fs from 'fs-extra';

// Salin folder templates ke dist
fs.copySync('src/templates', 'dist/templates');
console.log('Templates copied to dist folder.');