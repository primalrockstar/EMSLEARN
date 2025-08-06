const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function processAllPDFs() {
  console.log('🚀 AUTOMATED PDF PROCESSING - NO MORE COPY/PASTE!');
  console.log('='.repeat(60));
  
  const studyNotesPath = 'D:\\EMSLEARN\\study-notes';
  const outputFile = 'D:\\EMSLEARN\\public\\emt-chapters-auto.json';
  
  // Check if study-notes exists
  if (!fs.existsSync(studyNotesPath)) {
    console.error('❌ Could not find study-notes folder at:', studyNotesPath);
    console.log('📁 Looking for alternative paths...');
    
    // Try current directory
    const altPath = path.join(__dirname, '..', 'study-notes');
    if (fs.existsSync(altPath)) {
      console.log('✅ Found study-notes at:', altPath);
      studyNotesPath = altPath;
    } else {
      console.error('❌ No study-notes folder found. Please check the path.');
      return;
    }
  }
  
  const chapters = [];
  let processed = 0;
  let failed = 0;
  
  try {
    // Get all module folders
    const modules = fs.readdirSync(studyNotesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();
    
    console.log(`📁 Found ${modules.length} module folders`);
    
    for (const module of modules) {
      const modulePath = path.join(studyNotesPath, module);
      
      try {
        const files = fs.readdirSync(modulePath)
          .filter(file => file.toLowerCase().endsWith('.pdf'))
          .sort();
        
        console.log(`\n📚 ${module}: Processing ${files.length} PDFs...`);
        
        for (const file of files) {
          const filePath = path.join(modulePath, file);
          
          // Extract chapter number and title
          const match = file.match(/Chapter (\d+),?\s*(.+)\.pdf$/i);
          if (!match) {
            console.log(`  ⚠️  Skipping ${file} - doesn't match chapter pattern`);
            continue;
          }
          
          const chapterNum = parseInt(match[1]);
          const title = match[2].trim();
          
          console.log(`  📖 Chapter ${chapterNum}: ${title}`);
          
          try {
            // Read and parse PDF
            const dataBuffer = fs.readFileSync(filePath);
            console.log(`    📄 File size: ${(dataBuffer.length / 1024).toFixed(1)} KB`);
            
            const data = await pdf(dataBuffer);
            
            // Clean extracted text
            let content = data.text
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              .replace(/\n{3,}/g, '\n\n')
              .replace(/\s{3,}/g, ' ')
              .trim();
            
            // Remove common PDF artifacts
            content = content
              .replace(/Page \d+(\s+of\s+\d+)?/gi, '')
              .replace(/^\d+\s*$|^Page\s*\d+\s*$/gm, '')
              .replace(/\n\s*\n\s*\n/g, '\n\n')
              .trim();
            
            if (content.length < 100) {
              throw new Error('Extracted content too short - likely extraction failed');
            }
            
            // Determine difficulty
            let difficulty = 'Beginner';
            if (chapterNum >= 10 && chapterNum <= 24) difficulty = 'Intermediate';
            if (chapterNum >= 25) difficulty = 'Advanced';
            
            chapters.push({
              id: chapterNum,
              title: title,
              content: content,
              estimatedTime: "75 min",
              difficulty: difficulty,
              source: file,
              extracted: true,
              extractedAt: new Date().toISOString(),
              characterCount: content.length
            });
            
            console.log(`    ✅ SUCCESS: ${content.length} characters extracted`);
            processed++;
            
          } catch (pdfError) {
            console.error(`    ❌ PDF extraction failed: ${pdfError.message}`);
            
            // Add placeholder for manual entry
            chapters.push({
              id: chapterNum,
              title: title,
              content: `PDF extraction failed for ${file}.\n\nError: ${pdfError.message}\n\nPlease copy and paste content manually from your PDF.`,
              estimatedTime: "75 min",
              difficulty: difficulty,
              source: file,
              extracted: false,
              error: pdfError.message
            });
            
            failed++;
          }
        }
      } catch (moduleError) {
        console.error(`❌ Error reading module ${module}:`, moduleError.message);
      }
    }
    
    // Sort chapters by ID
    chapters.sort((a, b) => a.id - b.id);
    
    // Create output data
    const outputData = {
      chapters: chapters,
      totalChapters: chapters.length,
      successfulExtractions: processed,
      failedExtractions: failed,
      extractionDate: new Date().toISOString(),
      source: "Automated PDF extraction script"
    };
    
    // Write to output file
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 PROCESSING COMPLETE!');
    console.log(`📊 Total chapters found: ${chapters.length}`);
    console.log(`✅ Successfully extracted: ${processed}`);
    console.log(`❌ Failed extractions: ${failed}`);
    console.log(`💾 Output saved to: ${outputFile}`);
    
    if (processed > 20) {
      console.log('\n🚀 HUGE SUCCESS! Most of your PDFs were extracted automatically!');
      console.log('🔧 Update your app to load from emt-chapters-auto.json');
    } else if (processed > 0) {
      console.log('\n✅ Some PDFs extracted successfully!');
      console.log('📝 You only need to manually paste the failed ones');
    } else {
      console.log('\n❌ No PDFs could be extracted automatically');
      console.log('📝 You\'ll need to copy/paste manually');
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure study-notes folder exists');
    console.log('2. Check that PDFs are readable');
    console.log('3. Try running: npm install pdf-parse');
  }
}

// Run the processor
processAllPDFs().catch(console.error);
