const fs = require('fs');
const path = require('path');

// Source and destination paths
const sourceFile = path.join(__dirname, 'build', 'index.js');
const destDir = path.join(__dirname, '..', '..', '..', 'inc', 'Dependencies', 'WPMarketplace', 'Groupone', 'Marketplace', 'frontend', 'build');
const destFile = path.join(destDir, 'index.js');

// Check if watch mode is enabled
const watchMode = process.argv.includes('--watch');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created destination directory:', destDir);
}

// Function to copy the file
function copyFile() {
  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    if (!watchMode) {
      console.warn('Warning: Source file does not exist yet:', sourceFile);
      console.warn('The file will be copied after it is built.');
    }
    return false;
  }

  // Copy the file
  try {
    fs.copyFileSync(sourceFile, destFile);
    console.log('Successfully copied:', sourceFile);
    console.log('To:', destFile);
    return true;
  } catch (error) {
    console.error('Error copying file:', error.message);
    if (!watchMode) {
      process.exit(1);
    }
    return false;
  }
}

// Perform initial copy
const copied = copyFile();

// If watch mode is enabled, watch for changes
if (watchMode) {
  console.log('\nWatching for changes to:', sourceFile);

  // Watch the build directory
  const buildDir = path.dirname(sourceFile);

  // Ensure build directory exists before watching
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  fs.watch(buildDir, (eventType, filename) => {
    if (filename === 'index.js') {
      console.log('\nDetected change in build/index.js, copying...');
      copyFile();
    }
  });

  console.log('Watch mode active. Press Ctrl+C to stop.\n');
} else {
  // Exit with appropriate code for non-watch mode
  if (!copied) {
    process.exit(0);
  }
}
