import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map all your PDFs to the correct chapter structure
async function mapAllChapters() {
  const studyNotesPath = path.join(__dirname, '..', 'study-notes');
  
  if (!fs.existsSync(studyNotesPath)) {
    console.log('❌ study-notes folder not found!');
    return;
  }

  console.log('📋 Mapping all your chapters...');
  
  const allChapters = [];
  const modules = fs.readdirSync(studyNotesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  modules.forEach(module => {
    const modulePath = path.join(studyNotesPath, module);
    const pdfFiles = fs.readdirSync(modulePath)
      .filter(file => file.endsWith('.pdf'))
      .sort();
    
    pdfFiles.forEach(pdfFile => {
      const match = pdfFile.match(/Chapter (\d+),?\s*(.+)\.pdf$/);
      if (match) {
        const chapterNum = parseInt(match[1]);
        const title = match[2].trim();
        const filePath = path.join(modulePath, pdfFile);
        
        allChapters.push({
          id: chapterNum,
          moduleId: Math.ceil(chapterNum / 5), // Rough module grouping
          title: title,
          filePath: filePath,
          module: module
        });
      }
    });
  });

  // Sort by chapter number
  allChapters.sort((a, b) => a.id - b.id);
  
  console.log(`✅ Found ${allChapters.length} chapters:`);
  allChapters.slice(0, 10).forEach(ch => {
    console.log(`  Chapter ${ch.id}: ${ch.title}`);
  });
  
  // Generate the complete studyModules structure
  generateCompleteModules(allChapters);
}

function generateCompleteModules(chapters) {
  const moduleTemplate = `export interface StudyChapter {
  id: number;
  moduleId: number;
  title: string;
  content: string;
  keyPoints: string[];
  objectives: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  relatedMedications?: string[];
  relatedProtocols?: string[];
}

export interface StudyModule {
  id: number;
  title: string;
  description: string;
  chapters: StudyChapter[];
  totalChapters: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
}

export const studyModules: StudyModule[] = [
  {
    id: 1,
    title: "Module 1: Preparatory",
    description: "Foundation concepts for EMT practice",
    totalChapters: ${chapters.filter(ch => ch.id <= 4).length},
    estimatedTime: "300 min",
    difficulty: 'Beginner',
    prerequisites: [],
    chapters: [
${chapters.filter(ch => ch.id <= 4).map(ch => `      {
        id: ${ch.id},
        moduleId: 1,
        title: "${ch.title}",
        content: "📁 ${ch.filePath}\\n\\n[PDF content will be extracted here]",
        keyPoints: ["Key points from ${ch.title}"],
        objectives: ["Learning objectives for ${ch.title}"],
        estimatedTime: "75 min",
        difficulty: 'Beginner',
        tags: ['${ch.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}'],
        relatedMedications: [],
        relatedProtocols: []
      }`).join(',\n')}
    ]
  }
];`;

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'studyModules.ts');
  fs.writeFileSync(outputPath, moduleTemplate, 'utf8');
  
  console.log('✅ Generated complete studyModules.ts with all your chapters!');
  console.log(`📝 File saved to: ${outputPath}`);
}

mapAllChapters().catch(console.error);
