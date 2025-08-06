import React, { useState } from 'react'
import { Upload, FileText, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const StudyFileUploader: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const processFiles = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert('Files processed! Content has been extracted.')
    }, 2000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-6 h-6" />
          <span>Upload Your Study Materials</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">Drop your study files here</p>
            <p className="text-sm text-gray-600">
              Supported formats: PDF, DOCX, TXT, MD
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="primary" className="cursor-pointer">
                Choose Files
              </Button>
            </label>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Uploaded Files:</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
            
            <Button 
              onClick={processFiles} 
              disabled={isProcessing}
              className="w-full"
              variant="primary"
            >
              {isProcessing ? 'Processing...' : 'Process Files'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
