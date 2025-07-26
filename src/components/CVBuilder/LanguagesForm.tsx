import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Language {
  id: string
  language: string
  proficiency: string
}

interface LanguagesFormProps {
  data: { languages?: Language[] }
  onDataUpdate: (data: { languages: Language[] }) => void
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data, onDataUpdate }) => {
  const [languages, setLanguages] = useState<Language[]>(
    data.languages || [{
      id: '1',
      language: '',
      proficiency: 'intermediate'
    }]
  )

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' }
  ]

  const commonLanguages = [
    'English', 'French', 'Kinyarwanda', 'Kiswahili', 'Spanish', 'German', 
    'Chinese', 'Arabic', 'Portuguese', 'Italian', 'Dutch', 'Russian', 'Japanese'
  ]

  useEffect(() => {
    onDataUpdate({ languages })
  }, [languages, onDataUpdate])

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: '',
      proficiency: 'intermediate'
    }
    setLanguages([...languages, newLanguage])
  }

  const removeLanguage = (id: string) => {
    if (languages.length > 1) {
      setLanguages(languages.filter(lang => lang.id !== id))
    }
  }

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setLanguages(languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    ))
  }

  return (
    <div className="space-y-6">
      {languages.map((language, index) => (
        <div key={language.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Language {index + 1}
            </h3>
            {languages.length > 1 && (
              <button
                onClick={() => removeLanguage(language.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language *
              </label>
              <select
                value={language.language}
                onChange={(e) => updateLanguage(language.id, 'language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a language</option>
                {commonLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
                <option value="other">Other</option>
              </select>
              {language.language === 'other' && (
                <input
                  type="text"
                  onChange={(e) => updateLanguage(language.id, 'language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                  placeholder="Enter language name"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency Level *
              </label>
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Proficiency description */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {language.proficiency === 'beginner' && 'Basic words and phrases, limited conversation ability'}
              {language.proficiency === 'intermediate' && 'Can handle routine tasks and hold basic conversations'}
              {language.proficiency === 'advanced' && 'Can communicate effectively in most situations'}
              {language.proficiency === 'fluent' && 'Can speak, read, and write with high proficiency'}
              {language.proficiency === 'native' && 'Native speaker or equivalent proficiency'}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="flex items-center justify-center w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Language
      </button>
    </div>
  )
}

export default LanguagesForm