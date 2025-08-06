import React, { useState, useCallback } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Hash } from 'lucide-react'
import { chapterToModuleMap, moduleDefinitions } from '../data/moduleMapping'

interface PDFUploaderProps {
  onContentExtracted: (chapterId: number, moduleId: number, content: string) => void
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onContentExtracted }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{filename: string, chapter: number, module: number}[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'application/pdf'
    )
    
    if (files.length > 0) {
      await processFiles(files)
    }
  }, [])

  const processFiles = async (files: File[]) => {
    setUploading(true)
    
    for (const file of files) {
      try {
        // Extract chapter number from filename
        const match = file.name.match(/Chapter (\d+)/i)
        if (match) {
          const chapterNum = parseInt(match[1])
          const moduleId = chapterToModuleMap[chapterNum]
          
          if (moduleId) {
            // Simulate PDF text extraction with better formatting
            const simulatedContent = `**${file.name.replace('.pdf', '')}**

📄 **File Information:**
- Original filename: ${file.name}
- File size: ${(file.size / 1024).toFixed(1)} KB
- Upload time: ${new Date().toLocaleString()}
- Chapter: ${chapterNum}
- Module: ${moduleId} (${moduleDefinitions.find(m => m.id === moduleId)?.title})

📝 **Content Preview:**
[This is where your actual PDF text content will appear after real PDF processing is implemented]

🔧 **Next Steps:**
The PDF upload system is working! To get your actual content:
1. The system correctly identified this as Chapter ${chapterNum}
2. It's being assigned to ${moduleDefinitions.find(m => m.id === moduleId)?.title}
3. Real PDF text extraction can be added here

📋 **Development Note:**
This placeholder content confirms the upload and module mapping is working correctly. 
The next step is to implement actual PDF text extraction using pdf-js or similar library.`

            onContentExtracted(chapterNum, moduleId, simulatedContent)
            setUploadedFiles(prev => [...prev, {
              filename: file.name,
              chapter: chapterNum,
              module: moduleId
            }])
          } else {
            console.warn(`No module mapping found for chapter ${chapterNum}`)
          }
        } else {
          console.warn(`Could not extract chapter number from filename: ${file.name}`)
        }
      } catch (error) {
        console.error('Error processing file:', file.name, error)
      }
    }
    
    setUploading(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type === 'application/pdf'
      )
      if (files.length > 0) {
        processFiles(files)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Study Notes</h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-600 mb-2">
          Drop PDF files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Upload your Chapter PDFs - they'll automatically go to the correct modules!
        </p>
        
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileInput}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2" />
          Choose Files
        </label>
      </div>

      {uploading && (
        <div className="mt-4 flex items-center text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Processing PDFs and mapping to modules...
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Uploaded & Mapped:</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploadedFiles.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm bg-green-50 p-2 rounded">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {item.filename}
                </div>
                <div className="flex items-center text-blue-600 text-xs">
                  <Hash className="w-3 h-3 mr-1" />
                  Ch.{item.chapter} → Module {item.module}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Module Structure:</h4>
        <div className="text-xs text-blue-700 space-y-1">
          {moduleDefinitions.map(module => (
            <div key={module.id}>
              <strong>Module {module.id}:</strong> Chapters {module.chapters.join(', ')}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PDFUploader
