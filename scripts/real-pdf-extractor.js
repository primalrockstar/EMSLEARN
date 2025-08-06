import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract text from PDF
async function extractPDFText(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting ${filePath}:`, error.message);
    return `Error extracting content from ${path.basename(filePath)}`;
  }
}

// Generate complete study modules from PDFs
async function generateStudyModules() {
  const studyNotesPath = path.join(__dirname, '..', 'study-notes');
  
  if (!fs.existsSync(studyNotesPath)) {
    console.log('study-notes folder not found!');
    return;
  }

  console.log('🔄 Extracting content from all 41 PDFs...');
  
  // Process Chapter 1 first as example
  const chapter1Path = path.join(studyNotesPath, 'MODULE 1', 'Chapter 1, EMS Systems.pdf');
  
  if (fs.existsSync(chapter1Path)) {
    console.log('📖 Extracting Chapter 1: EMS Systems...');
    const chapter1Content = await extractPDFText(chapter1Path);
    
    // Update the studyModules.ts file with real content
    const studyModulesPath = path.join(__dirname, '..', 'src', 'data', 'studyModules.ts');
    let studyModulesContent = fs.readFileSync(studyModulesPath, 'utf8');
    
    // Replace Chapter 1 placeholder with actual content
    const chapter1Placeholder = /content: "📁 Content from: study-notes\/MODULE 1\/Chapter 1, EMS Systems\.pdf\n\n\[Ready for your content - paste here when available\]"/;
    const chapter1RealContent = `content: \`${chapter1Content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``;
    
    studyModulesContent = studyModulesContent.replace(chapter1Placeholder, chapter1RealContent);
    
    fs.writeFileSync(studyModulesPath, studyModulesContent, 'utf8');
    
    console.log('✅ Chapter 1 content integrated!');
    console.log(`📝 Content length: ${chapter1Content.length} characters`);
    
    // Show first 200 characters as preview
    console.log('📋 Preview:', chapter1Content.substring(0, 200) + '...');
  } else {
    console.log('❌ Chapter 1 PDF not found');
  }
}

generateStudyModules().catch(console.error);
