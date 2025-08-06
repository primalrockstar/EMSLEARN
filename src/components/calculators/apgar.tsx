import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const ApgarCalculator: React.FC = () => {
  const [scores, setScores] = useState({
    heartRate: 0,
    respiratoryEffort: 0,
    muscleTonus: 0,
    irritabilityReflex: 0,
    skinColor: 0
  })

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)

  const getScoreInterpretation = (score: number) => {
    if (score >= 7) return { text: 'Normal', color: 'text-green-600' }
    if (score >= 4) return { text: 'Moderately abnormal', color: 'text-yellow-600' }
    return { text: 'Severely abnormal', color: 'text-red-600' }
  }

  const interpretation = getScoreInterpretation(totalScore)

  const categories = [
    {
      name: 'Heart Rate',
      key: 'heartRate' as keyof typeof scores,
      options: [
        { score: 0, description: 'Absent' },
        { score: 1, description: '<100 bpm' },
        { score: 2, description: '≥100 bpm' }
      ]
    },
    {
      name: 'Respiratory Effort',
      key: 'respiratoryEffort' as keyof typeof scores,
      options: [
        { score: 0, description: 'Absent' },
        { score: 1, description: 'Weak cry' },
        { score: 2, description: 'Strong cry' }
      ]
    },
    {
      name: 'Muscle Tonus',
      key: 'muscleTonus' as keyof typeof scores,
      options: [
        { score: 0, description: 'Limp' },
        { score: 1, description: 'Some flexion' },
        { score: 2, description: 'Active motion' }
      ]
    },
    {
      name: 'Irritability/Reflex',
      key: 'irritabilityReflex' as keyof typeof scores,
      options: [
        { score: 0, description: 'No response' },
        { score: 1, description: 'Grimace' },
        { score: 2, description: 'Cry/sneeze' }
      ]
    },
    {
      name: 'Skin Color',
      key: 'skinColor' as keyof typeof scores,
      options: [
        { score: 0, description: 'Blue/pale' },
        { score: 1, description: 'Pink body, blue extremities' },
        { score: 2, description: 'Pink all over' }
      ]
    }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>APGAR Score Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category.key} className="space-y-2">
            <h4 className="font-medium text-gray-900">{category.name}</h4>
            <div className="grid grid-cols-1 gap-2">
              {category.options.map((option) => (
                <label
                  key={option.score}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name={category.key}
                    value={option.score}
                    checked={scores[category.key] === option.score}
                    onChange={(e) => setScores(prev => ({
                      ...prev,
                      [category.key]: parseInt(e.target.value)
                    }))}
                    className="text-blue-600"
                  />
                  <span className="flex-1">
                    <span className="font-medium">{option.score}</span> - {option.description}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-600">{totalScore}/10</div>
            <div className={	ext-lg font-medium }>
              {interpretation.text}
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setScores({
            heartRate: 0,
            respiratoryEffort: 0,
            muscleTonus: 0,
            irritabilityReflex: 0,
            skinColor: 0
          })}
          variant="outline"
          className="w-full"
        >
          Reset Calculator
        </Button>
      </CardContent>
    </Card>
  )
}
