export interface ContentFile {
  name: string
  path: string
  type: 'pdf' | 'docx' | 'txt' | 'md' | 'unknown'
  size: number
  lastModified: Date
}

export interface ProcessedContent {
  chapterId?: number
  moduleId?: number
  title: string
  content: string
  keyPoints: string[]
  estimatedReadTime: string
  wordCount: number
}

export class ContentProcessor {
  static supportedExtensions = ['.txt', '.md', '.pdf', '.docx']
  
  static getFileType(filename: string): ContentFile['type'] {
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'))
    switch (ext) {
      case '.pdf': return 'pdf'
      case '.docx': return 'docx'
      case '.txt': return 'txt'
      case '.md': return 'md'
      default: return 'unknown'
    }
  }
  
  static estimateReadTime(wordCount: number): string {
    const wordsPerMinute = 200 // Average reading speed
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    
    if (minutes < 60) {
      return `${minutes} min`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
    }
  }
  
  static extractKeyPoints(content: string): string[] {
    const keyPoints: string[] = []
    
    // Look for bullet points, numbered lists, or headings
    const lines = content.split('\n')
    
    lines.forEach(line => {
      const trimmed = line.trim()
      
      // Check for bullet points
      if (trimmed.match(/^[•\-\*]\s+/)) {
        keyPoints.push(trimmed.replace(/^[•\-\*]\s+/, ''))
      }
      
      // Check for numbered lists
      if (trimmed.match(/^\d+\.\s+/)) {
        keyPoints.push(trimmed.replace(/^\d+\.\s+/, ''))
      }
      
      // Check for emphasized text (markdown style)
      if (trimmed.match(/^\*\*.*\*\*$/) || trimmed.match(/^__.*__$/)) {
        keyPoints.push(trimmed.replace(/[\*_]/g, ''))
      }
    })
    
    // If no structured points found, extract first sentences of paragraphs
    if (keyPoints.length === 0) {
      const paragraphs = content.split('\n\n')
      paragraphs.slice(0, 5).forEach(paragraph => {
        const firstSentence = paragraph.split('.')[0]
        if (firstSentence.length > 20 && firstSentence.length < 150) {
          keyPoints.push(firstSentence.trim() + '.')
        }
      })
    }
    
    return keyPoints.slice(0, 8) // Limit to 8 key points
  }
  
  static detectChapterInfo(filename: string, content: string): { chapterId?: number, moduleId?: number, title: string } {
    let chapterId: number | undefined
    let moduleId: number | undefined
    let title = filename.replace(/\.(txt|md|pdf|docx)$/i, '')
    
    // Try to extract chapter number from filename or content
    const chapterMatch = filename.match(/chapter[_\s]*(\d+)/i) || content.match(/chapter\s*(\d+)/i)
    if (chapterMatch) {
      chapterId = parseInt(chapterMatch[1])
    }
    
    // Try to extract module info
    const moduleMatch = filename.match(/module[_\s]*(\d+)/i) || content.match(/module\s*(\d+)/i)
    if (moduleMatch) {
      moduleId = parseInt(moduleMatch[1])
    }
    
    // Clean up title
    title = title.replace(/chapter[_\s]*\d+[_\s]*/i, '')
    title = title.replace(/module[_\s]*\d+[_\s]*/i, '')
    title = title.replace(/[_-]/g, ' ')
    title = title.replace(/\s+/g, ' ').trim()
    
    // Capitalize first letter of each word
    title = title.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
    
    return { chapterId, moduleId, title }
  }
  
  static processTextContent(content: string): ProcessedContent {
    const wordCount = content.split(/\s+/).length
    const keyPoints = this.extractKeyPoints(content)
    const estimatedReadTime = this.estimateReadTime(wordCount)
    
    return {
      title: 'Processed Content',
      content: content.trim(),
      keyPoints,
      estimatedReadTime,
      wordCount
    }
  }
}

// Chapter mapping helper
export const CHAPTER_MAPPING = {
  1: { moduleId: 1, title: 'EMS Systems' },
  2: { moduleId: 1, title: 'Workforce Safety and Wellness' },
  3: { moduleId: 1, title: 'Medical/Legal and Ethics' },
  4: { moduleId: 1, title: 'Communications and Documentation' },
  5: { moduleId: 2, title: 'Medical Terminology' },
  6: { moduleId: 2, title: 'The Human Body' },
  7: { moduleId: 2, title: 'Pathophysiology' },
  8: { moduleId: 2, title: 'Life Span Development' },
  9: { moduleId: 2, title: 'Principles of Pharmacology' },
  10: { moduleId: 3, title: 'Patient Assessment' },
  11: { moduleId: 4, title: 'Airway Management' },
  12: { moduleId: 5, title: 'Shock' },
  13: { moduleId: 6, title: 'BLS Resuscitation' },
  14: { moduleId: 6, title: 'Cardiovascular Emergencies' },
  15: { moduleId: 7, title: 'Respiratory Emergencies' },
  16: { moduleId: 7, title: 'Cardiovascular Emergencies' },
  17: { moduleId: 7, title: 'Neurologic Emergencies' },
  18: { moduleId: 8, title: 'Gastrointestinal and Urologic Emergencies' },
  19: { moduleId: 8, title: 'Endocrine and Hematologic Emergencies' },
  20: { moduleId: 8, title: 'Immunologic Emergencies' },
  21: { moduleId: 9, title: 'Trauma Systems and Mechanism of Injury' },
  22: { moduleId: 9, title: 'Bleeding' },
  23: { moduleId: 9, title: 'Soft-Tissue Trauma' },
  24: { moduleId: 9, title: 'Burns' },
  25: { moduleId: 10, title: 'Head and Spine Injuries' },
  26: { moduleId: 10, title: 'Chest Injuries' },
  27: { moduleId: 10, title: 'Abdominal and Genitourinary Injuries' },
  28: { moduleId: 11, title: 'Orthopedic Injuries' },
  29: { moduleId: 11, title: 'Environmental Emergencies' },
  30: { moduleId: 11, title: 'Psychiatric Emergencies' },
  31: { moduleId: 12, title: 'Obstetric Emergencies' },
  32: { moduleId: 12, title: 'Neonatal Care' },
  33: { moduleId: 12, title: 'Pediatric Emergencies' },
  34: { moduleId: 13, title: 'Geriatric Emergencies' },
  35: { moduleId: 13, title: 'Patients with Special Challenges' },
  36: { moduleId: 13, title: 'Transport Operations' },
  37: { moduleId: 13, title: 'Vehicle Extrication and Special Rescue' },
  38: { moduleId: 14, title: 'Incident Management' },
  39: { moduleId: 14, title: 'Terrorism and Disaster Response' },
  40: { moduleId: 14, title: 'The Team Approach to Health Care' },
  41: { moduleId: 14, title: 'Career Development' }
}
