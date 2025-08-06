import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractPDFContent(filePath) {
  try {
    console.log(`📖 Extracting: ${path.basename(filePath)}`);
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    
    // Clean up the text a bit
    let cleanText = data.text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    return cleanText;
  } catch (error) {
    console.error(`❌ Error extracting ${filePath}:`, error.message);
    return `Error extracting content from ${path.basename(filePath)}`;
  }
}

async function extractChapter1() {
  const chapter1Path = path.join(__dirname, '..', 'study-notes', 'MODULE 1', 'Chapter 1, EMS Systems.pdf');
  
  if (fs.existsSync(chapter1Path)) {
    console.log('🚀 Extracting Chapter 1 content...');
    const content = await extractPDFContent(chapter1Path);
    
    console.log(`✅ Extracted ${content.length} characters`);
    console.log('📋 Preview (first 300 chars):');
    console.log(content.substring(0, 300) + '...');
    
    // Update the studyModules.ts file
    const modulesPath = path.join(__dirname, '..', 'src', 'data', 'studyModules.ts');
    let modulesContent = fs.readFileSync(modulesPath, 'utf8');
    
    // Escape special characters for template literal
    const escapedContent = content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    
    // Replace the placeholder for Chapter 1
    const chapter1Regex = /content: "📁[^"]*Chapter 1[^"]*"/;
    const newContent = `content: \`${escapedContent}\``;
    
    modulesContent = modulesContent.replace(chapter1Regex, newContent);
    
    fs.writeFileSync(modulesPath, modulesContent, 'utf8');
    
    console.log('✅ Chapter 1 content updated in app!');
  } else {
    console.log('❌ Chapter 1 PDF not found at:', chapter1Path);
  }
}

extractChapter1().catch(console.error);
