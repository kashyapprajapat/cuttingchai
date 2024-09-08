#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { compiler, runner } = require('../lib/compiler');

// Check for correct number of arguments
if (process.argv.length !== 3) {
  console.error('Usage: chai <filename>.chai');
  process.exit(1);
}

// Get the filename from the command line argument
const filename = process.argv[2];
const filePath = path.resolve(filename);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filename}`);
  process.exit(1);
}

// Read the content of the .chai file
const code = fs.readFileSync(filePath, 'utf-8');

// Compile the code
const executableCode = compiler(code);

// Run the compiled code
console.log('Running compiled code:');
runner(executableCode);
