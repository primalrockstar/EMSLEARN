import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Clock, Tag, Target, Upload } from 'lucide-react'
import { studyModules } from '../data/studyModules'
import PDFUploader from '../components/PDFUploader'
import ContentManager from '../components/ContentManager'

interface NotesProps {
  userTier: string
}

const Notes: React.FC<NotesProps> = ({ userTier }) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([1])
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1)
  const [showUploader, setShowUploader] = useState(false)
  const [modules, setModules] = useState(studyModules)

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handleContentExtracted = (chapterId: number, content: string) => {
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        chapters: module.chapters.map(chapter => 
          chapter.id === chapterId 
            ? { ...chapter, content }
            : chapter
        )
      }))
    )
  }

  const handleSave = (savedModules: any[]) => {
    console.log('Modules saved successfully!')
    // You could also make an API call here to save to a server
  }

  const selectedChapterData = selectedChapter 
    ? modules.flatMap(m => m.chapters).find(c => c.id === selectedChapter)
    : null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Study Notes</h2>
        <p className="text-gray-600">Complete EMT training materials</p>
        
        <button
          onClick={() => setShowUploader(!showUploader)}
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload PDFs
        </button>
      </div>

      <ContentManager modules={modules} onSave={handleSave} />

      {showUploader && (
        <PDFUploader onContentExtracted={handleContentExtracted} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Modules & Chapters</h3>
            
            {modules.map((module) => (
              <div key={module.id} className="mb-4">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <span className="font-medium text-sm">{module.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{module.totalChapters} chapters</span>
                </button>
                
                {expandedModules.includes(module.id) && (
                  <div className="mt-2 ml-4 space-y-1">
                    {module.chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        onClick={() => setSelectedChapter(chapter.id)}
                        className={`w-full text-left p-2 rounded text-sm transition-colors ${
                          selectedChapter === chapter.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chapter Content */}
        <div className="lg:col-span-2">
          {selectedChapterData ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedChapterData.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedChapterData.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{selectedChapterData.difficulty}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedChapterData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedChapterData.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^/, '<p>')
                      .replace(/$/, '</p>')
                  }}
                />
              </div>

              {selectedChapterData.keyPoints.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {selectedChapterData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-blue-700">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedChapterData.objectives.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {selectedChapterData.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2 text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">Select a chapter to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notes
