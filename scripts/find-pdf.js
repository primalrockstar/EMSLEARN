const fs = require('fs');
const path = require('path');

// For now, let's verify we can read the PDF file
const chapter1Path = path.join(__dirname, '..', 'study-notes', 'MODULE 1', 'Chapter 1, EMS Systems.pdf');

console.log('Checking for your PDF...');
console.log('Path:', chapter1Path);

if (fs.existsSync(chapter1Path)) {
    const stats = fs.statSync(chapter1Path);
    console.log('✅ Found your PDF!');
    console.log(`Size: ${stats.size} bytes`);
    console.log('');
    console.log('Since PDF extraction is complex, please:');
    console.log('1. Open: study-notes/MODULE 1/Chapter 1, EMS Systems.pdf');
    console.log('2. Select all text (Ctrl+A)');
    console.log('3. Copy (Ctrl+C)');
    console.log('4. Paste the content here');
    console.log('');
    console.log('I will immediately integrate your actual study content!');
} else {
    console.log('❌ PDF not found. Checking directory...');
    const moduleDir = path.dirname(chapter1Path);
    if (fs.existsSync(moduleDir)) {
        console.log('Files in MODULE 1:');
        fs.readdirSync(moduleDir).forEach(file => console.log(`  - ${file}`));
    }
}
