// PDF Content Extractor for Google Drive study materials
import { StudyChapter } from '../data/studyModules'

export interface PDFContentFile {
  fileName: string
  moduleNumber: number
  chapterNumber: number
  title: string
  fullPath: string
  extractedText?: string
  processed?: boolean
}

export class PDFContentExtractor {
  
  // Parse filename to extract module and chapter info
  static parseFileName(fileName: string): { moduleNum: number, chapterNum: number, title: string } | null {
    // Pattern: MODULE_XChapter_Y_Title.pdf
    const match = fileName.match(/MODULE_(\d+)Chapter_(\d+)_(.+)\.pdf$/i)
    if (match) {
      return {
        moduleNum: parseInt(match[1]),
        chapterNum: parseInt(match[2]),
        title: match[3].replace(/_/g, ' ').trim()
      }
    }
    return null
  }

  // Get all PDF files from the content directory
  static async scanContentDirectory(contentPath: string): Promise<PDFContentFile[]> {
    const files: PDFContentFile[] = []
    
    // This would normally use Node.js fs module, but for web we'll simulate
    // In a real implementation, you'd use Electron or a backend service
    
    // Simulated file list based on your actual files
    const fileList = [
      'MODULE_1Chapter_1_EMS_Systems.pdf',
      'MODULE_1Chapter_2_Workforce_Safety_and_Wellness.pdf',
      'MODULE_1Chapter_3_Medical_Legal_and_Ethical_Issues.pdf',
      'MODULE_1Chapter_4_Communications_and_Documentation.pdf',
      'MODULE_2Chapter_5_Medical_Terminology.pdf',
      'MODULE_2Chapter_6_The_Human_Body.pdf',
      'MODULE_2Chapter_7_Life_Span_Developement.pdf',
      'MODULE_2Chapter_8_Lifting_and_Moving_Patients.pdf',
      'MODULE_2Chapter_9_The_Team_Approach_to_Healthcare.pdf',
      'MODULE_3Chapter_10_Patient_Assessment.pdf',
      'MODULE_4Chapter_11_Airway_Management.pdf',
      'MODULE_5Chapter_12_Principles_of_Pharmacology.pdf',
      'MODULE_6Chapter_13_Shock.pdf',
      'MODULE_6Chapter_14_BLSResuscitation.pdf',
      'MODULE_7Chapter_15_Medical_Overview.pdf',
      'MODULE_7Chapter_16_Respiratory_Emergencies.pdf',
      'MODULE_7Chapter_17_Cardiovascular_Emergencies.pdf',
      'MODULE_8Chapter_18_Neurologic_Emergencies.pdf',
      'MODULE_8Chapter_19_Gastrointestinal_and_Urologic_Emergencies.pdf',
      'MODULE_8Chapter_20_Endocrine_and_Hematologic_Emergencies.pdf',
      'MODULE_9Chapter_21_Allergy_and_Anaphylaxis.pdf',
      'MODULE_9Chapter_22_Toxicology.pdf',
      'MODULE_9Chapter_23_Behavioral_Health_Emergencies.pdf',
      'MODULE_9Chapter_24_Gynecologic_Emergencies.pdf',
      'MODULE_10Chapter_25_Trauma_Overview.pdf',
      'MODULE_10Chapter_26_Bleeding.pdf',
      'MODULE_10Chapter_27_Soft-Tissue_Injuries.pdf',
      'MODULE_11Chapter_28_Face_and_Neck_Injuries.pdf',
      'MODULE_11Chapter_29_Head_and_Spine_Injuries.pdf',
      'MODULE_11Chapter_30_Chest_Injuries.pdf',
      'MODULE_12Chapter_31_Introduction_to_Abdominal_and_Genitourinary_Injuries.pdf',
      'MODULE_12Chapter_32_Orthopedic_Injuries.pdf',
      'MODULE_12Chapter_33_Environmental_Emergencies.pdf',
      'MODULE_13Chapter_34_Obstetrics_and_Neonatal_Care.pdf',
      'MODULE_13Chapter_35_Pediatric_Emergencies.pdf',
      'MODULE_13Chapter_36_Geriatric_Emergencies.pdf',
      'MODULE_13Chapter_37_Special_Challenges.pdf',
      'MODULE_14Chapter_38_Transport_Operations.pdf',
      'MODULE_14Chapter_39_Vehicle_Extrication_and_Special_Rescue.pdf',
      'MODULE_14Chapter_40_Incident_Management.pdf',
      'MODULE_14Chapter_41_Terrorism_and_Disaster_Management.pdf'
    ]

    fileList.forEach(fileName => {
      const parsed = this.parseFileName(fileName)
      if (parsed) {
        files.push({
          fileName,
          moduleNumber: parsed.moduleNum,
          chapterNumber: parsed.chapterNum,
          title: parsed.title,
          fullPath: `${contentPath}\\${fileName}`,
          processed: false
        })
      }
    })

    return files.sort((a, b) => a.chapterNumber - b.chapterNumber)
  }

  // Process extracted text to create study chapter data
  static processExtractedText(file: PDFContentFile, extractedText: string): StudyChapter {
    const wordCount = extractedText.split(/\s+/).length
    const estimatedMinutes = Math.ceil(wordCount / 200) // 200 words per minute
    
    return {
      id: file.chapterNumber,
      moduleId: file.moduleNumber,
      title: file.title,
      content: extractedText,
      keyPoints: this.extractKeyPoints(extractedText),
      objectives: this.extractObjectives(extractedText),
      estimatedTime: `${estimatedMinutes} min`,
      difficulty: this.determineDifficulty(file.chapterNumber),
      tags: this.extractTags(file.title, extractedText),
      relatedMedications: this.extractMedications(extractedText),
      relatedProtocols: this.extractProtocols(extractedText)
    }
  }

  // Extract key points from content
  static extractKeyPoints(text: string): string[] {
    const keyPoints: string[] = []
    const lines = text.split('\n')
    
    lines.forEach(line => {
      const trimmed = line.trim()
      
      // Look for bullet points, numbered lists, or bold text
      if (trimmed.match(/^[•\-\*]\s+/) || 
          trimmed.match(/^\d+\.\s+/) ||
          trimmed.match(/^\*\*.*\*\*/) ||
          trimmed.includes('Key Point') ||
          trimmed.includes('Important') ||
          trimmed.includes('Remember')) {
        const cleaned = trimmed.replace(/^[•\-\*\d+\.\s]+/, '')
                              .replace(/^\*\*|\*\*$/g, '')
                              .trim()
        if (cleaned.length > 10 && cleaned.length < 200) {
          keyPoints.push(cleaned)
        }
      }
    })

    // If no structured points found, extract from headers and emphasized text
    if (keyPoints.length < 3) {
      const sentences = text.match(/[A-Z][^\.!?]*[\.!?]/g) || []
      sentences.slice(0, 8).forEach(sentence => {
        if (sentence.length > 20 && sentence.length < 150) {
          keyPoints.push(sentence.trim())
        }
      })
    }

    return keyPoints.slice(0, 8)
  }

  // Extract learning objectives
  static extractObjectives(text: string): string[] {
    const objectives: string[] = []
    const lines = text.split('\n')
    
    let inObjectiveSection = false
    let objectiveBuffer = ''
    
    lines.forEach((line, index) => {
      const trimmed = line.trim().toLowerCase()
      
      // Look for objective section headers
      if (trimmed.includes('objective') || 
          trimmed.includes('learning outcome') || 
          trimmed.includes('goals') ||
          trimmed.includes('you will learn') ||
          trimmed.includes('upon completion')) {
        inObjectiveSection = true
        objectiveBuffer = ''
        return
      }
      
      // End objective section on next major header
      if (inObjectiveSection && (trimmed.includes('introduction') || 
                                trimmed.includes('overview') ||
                                trimmed.includes('background') ||
                                index > 50)) {
        inObjectiveSection = false
      }
      
      if (inObjectiveSection) {
        objectiveBuffer += line + '\n'
      }
    })
    
    // Extract numbered or bulleted objectives
    const objectiveMatches = objectiveBuffer.match(/(?:^|\n)[•\-\*\d+\.\s]*([A-Z][^\.!?]*[\.!?])/g)
    if (objectiveMatches) {
      objectiveMatches.forEach(match => {
        const cleaned = match.replace(/^[\n•\-\*\d+\.\s]+/, '').trim()
        if (cleaned.length > 15 && cleaned.length < 200) {
          objectives.push(cleaned)
        }
      })
    }
    
    // Fallback: create generic objectives
    if (objectives.length === 0) {
      objectives.push(`Understand the fundamental concepts and principles covered in this chapter`)
      objectives.push(`Apply knowledge to real-world emergency medical situations`)
      objectives.push(`Demonstrate competency in chapter-specific skills and procedures`)
    }
    
    return objectives.slice(0, 6)
  }

  // Determine chapter difficulty based on content and chapter number
  static determineDifficulty(chapterNumber: number): 'Beginner' | 'Intermediate' | 'Advanced' {
    if (chapterNumber <= 9) return 'Beginner'
    if (chapterNumber <= 24) return 'Intermediate'
    return 'Advanced'
  }

  // Extract relevant tags from title and content
  static extractTags(title: string, content: string): string[] {
    const tags: string[] = []
    const titleLower = title.toLowerCase()
    const contentLower = content.toLowerCase()
    
    // Common EMT topic tags
    const topicTags = [
      'assessment', 'airway', 'trauma', 'medical', 'emergency', 'patient',
      'respiratory', 'cardiac', 'neurologic', 'pediatric', 'geriatric',
      'safety', 'legal', 'communication', 'pharmacology', 'shock',
      'bleeding', 'injuries', 'transport', 'procedures'
    ]
    
    topicTags.forEach(tag => {
      if (titleLower.includes(tag) || contentLower.includes(tag)) {
        tags.push(tag)
      }
    })
    
    // Add specific tags based on title
    if (titleLower.includes('ems')) tags.push('ems-systems')
    if (titleLower.includes('safety')) tags.push('workplace-safety')
    if (titleLower.includes('legal')) tags.push('medical-legal')
    if (titleLower.includes('airway')) tags.push('airway-management')
    
    return tags.slice(0, 6)
  }

  // Extract medication references
  static extractMedications(text: string): string[] {
    const medications: string[] = []
    const contentLower = text.toLowerCase()
    
    // Common EMT medications
    const emtMeds = [
      'oxygen', 'epinephrine', 'nitroglycerin', 'aspirin', 'glucose',
      'albuterol', 'activated charcoal', 'naloxone', 'atropine'
    ]
    
    emtMeds.forEach(med => {
      if (contentLower.includes(med)) {
        medications.push(med)
      }
    })
    
    return medications
  }

  // Extract protocol references
  static extractProtocols(text: string): string[] {
    const protocols: string[] = []
    const contentLower = text.toLowerCase()
    
    // Common protocol keywords
    const protocolKeywords = [
      'assessment', 'airway-management', 'shock-management', 'trauma-care',
      'medical-emergency', 'cardiac-arrest', 'respiratory-distress'
    ]
    
    protocolKeywords.forEach(protocol => {
      if (contentLower.includes(protocol.replace('-', ' '))) {
        protocols.push(protocol)
      }
    })
    
    return protocols
  }
}

// Export for use in content integration
export default PDFContentExtractor
