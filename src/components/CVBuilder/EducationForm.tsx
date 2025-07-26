import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  currentlyStudying: boolean
  gpa: string
  description: string
}

interface EducationFormProps {
  data: { education?: Education[] }
  onDataUpdate: (data: { education: Education[] }) => void
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onDataUpdate }) => {
  const [educationList, setEducationList] = useState<Education[]>(
    data.education || [{
      id: '1',
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      gpa: '',
      description: ''
    }]
  )

  useEffect(() => {
    onDataUpdate({ education: educationList })
  }, [educationList, onDataUpdate])

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      gpa: '',
      description: ''
    }
    setEducationList([...educationList, newEducation])
  }

  const removeEducation = (id: string) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter(edu => edu.id !== id))
    }
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducationList(educationList.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  return (
    <div className="space-y-6">
      {educationList.map((education, index) => (
        <div key={education.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Education {index + 1}
            </h3>
            {educationList.length > 1 && (
              <button
                onClick={() => removeEducation(education.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree/Qualification *
              </label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution *
              </label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="University of Rwanda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Kigali, Rwanda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA/Grade
              </label>
              <input
                type="text"
                value={education.gpa}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="3.8/4.0 or First Class"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="month"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="month"
                value={education.endDate}
                disabled={education.currentlyStudying}
                onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={education.currentlyStudying}
                onChange={(e) => {
                  updateEducation(education.id, 'currentlyStudying', e.target.checked)
                  if (e.target.checked) {
                    updateEducation(education.id, 'endDate', '')
                  }
                }}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">I am currently studying here</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={education.description}
              onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Relevant coursework, achievements, or activities..."
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="flex items-center justify-center w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Education
      </button>
    </div>
  )
}

export default EducationForm