import fs from 'fs';
import path from 'path';

interface PDFFile {
  name: string;
  path: string;
  module: string;
  chapterNumber: number;
  title: string;
}

// Scan all PDF files in study-notes
function scanPDFFiles(): PDFFile[] {
  const studyNotesPath = path.join(process.cwd(), 'study-notes');
  const pdfFiles: PDFFile[] = [];
  
  // Read all module directories
  const modules = fs.readdirSync(studyNotesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  modules.forEach(module => {
    const modulePath = path.join(studyNotesPath, module);
    const files = fs.readdirSync(modulePath)
      .filter(file => file.endsWith('.pdf'));
    
    files.forEach(file => {
      // Extract chapter number and title from filename
      const match = file.match(/Chapter (\d+),?\s*(.+)\.pdf$/);
      if (match) {
        pdfFiles.push({
          name: file,
          path: path.join(modulePath, file),
          module: module,
          chapterNumber: parseInt(match[1]),
          title: match[2].trim()
        });
      }
    });
  });
  
  return pdfFiles.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

// Generate study modules structure
function generateStudyModules(): void {
  const pdfFiles = scanPDFFiles();
  
  console.log(`Found ${pdfFiles.length} PDF files:`);
  pdfFiles.forEach(pdf => {
    console.log(`Chapter ${pdf.chapterNumber}: ${pdf.title} (${pdf.module})`);
  });
}

generateStudyModules();
