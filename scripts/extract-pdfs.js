import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple PDF text extraction simulation (normally would use pdf-parse or similar)
function extractPDFContent(filePath) {
  // For demo purposes, return placeholder that indicates the file is found
  const fileName = path.basename(filePath);
  return `Content extracted from: ${fileName}\n\n[This would contain the actual PDF text content]\n\nFile found at: ${filePath}`;
}

// Scan and process all PDFs
function processAllPDFs() {
  const studyNotesPath = path.join(__dirname, '..', 'study-notes');
  
  if (!fs.existsSync(studyNotesPath)) {
    console.log('study-notes folder not found!');
    return;
  }

  const modules = fs.readdirSync(studyNotesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  console.log(`Found ${modules.length} modules:`);
  
  modules.forEach(module => {
    console.log(`\n=== ${module} ===`);
    const modulePath = path.join(studyNotesPath, module);
    const pdfFiles = fs.readdirSync(modulePath)
      .filter(file => file.endsWith('.pdf'))
      .sort();
    
    pdfFiles.forEach(pdfFile => {
      const filePath = path.join(modulePath, pdfFile);
      console.log(`✓ ${pdfFile}`);
      
      // Extract chapter info
      const match = pdfFile.match(/Chapter (\d+),?\s*(.+)\.pdf$/);
      if (match) {
        const chapterNum = match[1];
        const title = match[2].trim();
        console.log(`  Chapter ${chapterNum}: ${title}`);
      }
    });
  });
}

processAllPDFs();
