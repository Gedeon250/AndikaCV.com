import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  description: string
}

interface ExperienceFormProps {
  data: { experience?: Experience[] }
  onDataUpdate: (data: { experience: Experience[] }) => void
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onDataUpdate }) => {
  const [experienceList, setExperienceList] = useState<Experience[]>(
    data.experience || [{
      id: '1',
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    }]
  )

  useEffect(() => {
    onDataUpdate({ experience: experienceList })
  }, [experienceList, onDataUpdate])

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    }
    setExperienceList([...experienceList, newExperience])
  }

  const removeExperience = (id: string) => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.filter(exp => exp.id !== id))
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperienceList(experienceList.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  return (
    <div className="space-y-6">
      {experienceList.map((experience, index) => (
        <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Experience {index + 1}
            </h3>
            {experienceList.length > 1 && (
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={experience.jobTitle}
                onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Software Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tech Company Ltd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Kigali, Rwanda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="month"
                value={experience.endDate}
                disabled={experience.currentlyWorking}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={experience.currentlyWorking}
                onChange={(e) => {
                  updateExperience(experience.id, 'currentlyWorking', e.target.checked)
                  if (e.target.checked) {
                    updateExperience(experience.id, 'endDate', '')
                  }
                }}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">I currently work here</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Implemented automated testing procedures reducing bugs by 30%"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use bullet points (•) to list your key responsibilities and achievements
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="flex items-center justify-center w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Experience
      </button>
    </div>
  )
}

export default ExperienceForm