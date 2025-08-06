const fs = require('fs');
const path = require('path');

// Chapters are in the project root
const CHAPTERS_DIR = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/studyModules.ts');

const files = fs.readdirSync(CHAPTERS_DIR)
  .filter(f => /^chapter-\d+\.json$/.test(f))
  .sort((a, b) => {
    const getNum = f => parseInt(f.match(/\d+/)[0], 10);
    return getNum(a) - getNum(b);
  });

const chapters = files.map(file => {
  const data = fs.readFileSync(path.join(CHAPTERS_DIR, file), 'utf8');
  return JSON.parse(data);
});

const studyModule = {
  id: 1,
  title: "EMS Study Notes",
  totalChapters: chapters.length,
  chapters
};

const output = `export interface Chapter {
  id: number
  title: string
  tier: string
  estimatedTime: string
  difficulty: string
  tags: string[]
  content: string
  keyPoints: string[]
  objectives: string[]
}
export interface StudyModule {
  id: number
  title: string
  totalChapters: number
  chapters: Chapter[]
}
export const studyModules: StudyModule[] = [
  ${JSON.stringify(studyModule, null, 2)}
]
`;

fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
console.log(`Merged ${chapters.length} chapters to ${OUTPUT_PATH}`);