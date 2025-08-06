const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function extractAllChapters() {
  console.log('🚀 Starting REAL PDF extraction...');
  
  const studyNotesPath = path.join(__dirname, '..', 'study-notes');
  const outputPath = path.join(__dirname, '..', 'public', 'emt-chapters-extracted.json');
  
  if (!fs.existsSync(studyNotesPath)) {
    console.error('❌ study-notes folder not found!');
    return;
  }
  
  const allChapters = [];
  let totalProcessed = 0;
  
  // Get all module folders
  const modules = fs.readdirSync(studyNotesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();
  
  console.log(`📁 Found ${modules.length} module folders`);
  
  for (const module of modules) {
    const modulePath = path.join(studyNotesPath, module);
    const pdfFiles = fs.readdirSync(modulePath)
      .filter(file => file.endsWith('.pdf'))
      .sort();
    
    console.log(`\n📚 ${module}: ${pdfFiles.length} PDFs`);
    
    for (const pdfFile of pdfFiles) {
      const filePath = path.join(modulePath, pdfFile);
      
      // Extract chapter info from filename
      const match = pdfFile.match(/Chapter (\d+),?\s*(.+)\.pdf$/);
      if (match) {
        const chapterNum = parseInt(match[1]);
        const title = match[2].trim();
        
        console.log(`  📖 Processing Chapter ${chapterNum}: ${title}`);
        
        try {
          // Read PDF and extract text
          const dataBuffer = fs.readFileSync(filePath);
          const data = await pdf(dataBuffer);
          
          // Clean up extracted text
          let content = data.text
            .replace(/\s+/g, ' ')           // Multiple spaces to single
            .replace(/\n\s*\n/g, '\n\n')    // Multiple newlines to double
            .trim();
          
          // Remove common PDF artifacts
          content = content
            .replace(/Page \d+ of \d+/g, '')
            .replace(/Chapter \d+[\s\S]*?(?=\n\n)/g, '')  // Remove header repetitions
            .trim();
          
          // Determine difficulty
          let difficulty = 'Beginner';
          if (chapterNum >= 10 && chapterNum <= 24) difficulty = 'Intermediate';
          if (chapterNum >= 25) difficulty = 'Advanced';
          
          allChapters.push({
            id: chapterNum,
            title: title,
            content: content,
            estimatedTime: "75 min",
            difficulty: difficulty,
            extracted: true,
            sourceFile: pdfFile,
            extractedAt: new Date().toISOString()
          });
          
          console.log(`    ✅ Extracted ${content.length} characters`);
          totalProcessed++;
          
        } catch (error) {
          console.error(`    ❌ Failed to extract ${pdfFile}:`, error.message);
          
          // Add failed entry with placeholder
          allChapters.push({
            id: chapterNum,
            title: title,
            content: `EXTRACTION FAILED: ${pdfFile}\n\nError: ${error.message}\n\nPlease copy and paste content manually.`,
            estimatedTime: "75 min",
            difficulty: difficulty,
            extracted: false,
            sourceFile: pdfFile,
            error: error.message
          });
        }
      }
    }
  }
  
  // Sort by chapter ID
  allChapters.sort((a, b) => a.id - b.id);
  
  // Create final JSON structure
  const finalData = {
    chapters: allChapters,
    totalChapters: allChapters.length,
    extractedChapters: allChapters.filter(ch => ch.extracted).length,
    failedExtractions: allChapters.filter(ch => !ch.extracted).length,
    lastUpdated: new Date().toISOString(),
    source: "Automated PDF extraction from study-notes folder"
  };
  
  // Write to file
  fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
  
  console.log(`\n🎉 EXTRACTION COMPLETE!`);
  console.log(`📊 Total chapters: ${finalData.totalChapters}`);
  console.log(`✅ Successfully extracted: ${finalData.extractedChapters}`);
  console.log(`❌ Failed extractions: ${finalData.failedExtractions}`);
  console.log(`💾 Saved to: ${outputPath}`);
  
  if (finalData.extractedChapters > 0) {
    console.log(`\n🚀 SUCCESS! Your app will now load real content automatically!`);
  }
  
  return finalData;
}

// Run the extraction
extractAllChapters().catch(console.error);
