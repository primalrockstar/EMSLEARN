import React, { useState } from 'react'
import { Save, Download, Upload, CheckCircle } from 'lucide-react'

interface ContentManagerProps {
  modules: any[]
  onSave: (modules: any[]) => void
}

const ContentManager: React.FC<ContentManagerProps> = ({ modules, onSave }) => {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    
    try {
      // Generate the complete studyModules.ts content
      const moduleContent = `export interface StudyChapter {
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

export const studyModules: StudyModule[] = ${JSON.stringify(modules, null, 2)};`

      // Create download link
      const blob = new Blob([moduleContent], { type: 'text/typescript' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'studyModules.ts'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      onSave(modules)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setSaving(false)
    }
  }

  const uploadedChapters = modules.flatMap(m => m.chapters).filter(ch => 
    ch.content.includes('[Content extracted from your PDF file:')
  ).length

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{uploadedChapters}</span> chapters uploaded
          </div>
          
          {saved && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Saved!
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || uploadedChapters === 0}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save & Download
            </>
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        This will download a new studyModules.ts file with your content. Replace the old file in src/data/
      </p>
    </div>
  )
}

export default ContentManager
