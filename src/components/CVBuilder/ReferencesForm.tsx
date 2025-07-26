import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Reference {
  id: string
  name: string
  jobTitle: string
  company: string
  email: string
  phone: string
  relationship: string
}

interface ReferencesFormProps {
  data: { references?: Reference[] }
  onDataUpdate: (data: { references: Reference[] }) => void
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({ data, onDataUpdate }) => {
  const [references, setReferences] = useState<Reference[]>(
    data.references || [{
      id: '1',
      name: '',
      jobTitle: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    }]
  )

  const relationshipTypes = [
    'Former Manager',
    'Current Manager',
    'Colleague',
    'Client',
    'Professor',
    'Supervisor',
    'Team Lead',
    'HR Representative',
    'Business Partner',
    'Other'
  ]

  useEffect(() => {
    onDataUpdate({ references })
  }, [references, onDataUpdate])

  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      jobTitle: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    }
    setReferences([...references, newReference])
  }

  const removeReference = (id: string) => {
    if (references.length > 1) {
      setReferences(references.filter(ref => ref.id !== id))
    }
  }

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(references.map(ref =>
      ref.id === id ? { ...ref, [field]: value } : ref
    ))
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">References Guidelines</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Choose references who can speak positively about your work performance</li>
          <li>• Always ask permission before listing someone as a reference</li>
          <li>• Provide your references with a copy of your CV and the job description</li>
          <li>• 2-3 professional references are typically sufficient</li>
        </ul>
      </div>

      {references.map((reference, index) => (
        <div key={reference.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Reference {index + 1}
            </h3>
            {references.length > 1 && (
              <button
                onClick={() => removeReference(reference.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={reference.name}
                onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={reference.jobTitle}
                onChange={(e) => updateReference(reference.id, 'jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={reference.company}
                onChange={(e) => updateReference(reference.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tech Company Ltd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship *
              </label>
              <select
                value={reference.relationship}
                onChange={(e) => updateReference(reference.id, 'relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select relationship</option>
                {relationshipTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={reference.email}
                onChange={(e) => updateReference(reference.id, 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="john.doe@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={reference.phone}
                onChange={(e) => updateReference(reference.id, 'phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+250 123 456 789"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addReference}
        className="flex items-center justify-center w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Reference
      </button>
    </div>
  )
}

export default ReferencesForm