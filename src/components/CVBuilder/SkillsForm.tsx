import React, { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'

interface SkillCategory {
  id: string
  name: string
  skills: string[]
}

interface SkillsFormProps {
  data: { skills?: SkillCategory[] }
  onDataUpdate: (data: { skills: SkillCategory[] }) => void
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onDataUpdate }) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(
    data.skills || [
      { id: '1', name: 'Technical Skills', skills: [] },
      { id: '2', name: 'Soft Skills', skills: [] }
    ]
  )
  const [newSkills, setNewSkills] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    onDataUpdate({ skills: skillCategories })
  }, [skillCategories, onDataUpdate])

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      name: '',
      skills: []
    }
    setSkillCategories([...skillCategories, newCategory])
  }

  const removeSkillCategory = (id: string) => {
    if (skillCategories.length > 1) {
      setSkillCategories(skillCategories.filter(cat => cat.id !== id))
    }
  }

  const updateCategoryName = (id: string, name: string) => {
    setSkillCategories(skillCategories.map(cat =>
      cat.id === id ? { ...cat, name } : cat
    ))
  }

  const addSkill = (categoryId: string) => {
    const skillText = newSkills[categoryId]?.trim()
    if (skillText) {
      setSkillCategories(skillCategories.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, skillText] }
          : cat
      ))
      setNewSkills({ ...newSkills, [categoryId]: '' })
    }
  }

  const removeSkill = (categoryId: string, skillIndex: number) => {
    setSkillCategories(skillCategories.map(cat =>
      cat.id === categoryId
        ? { ...cat, skills: cat.skills.filter((_, index) => index !== skillIndex) }
        : cat
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill(categoryId)
    }
  }

  const predefinedSkills = {
    'Technical Skills': [
      'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
      'Docker', 'AWS', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular', 'PHP',
      'Java', 'C++', 'Ruby', 'Go', 'Kubernetes', 'Jenkins'
    ],
    'Soft Skills': [
      'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management',
      'Critical Thinking', 'Adaptability', 'Creativity', 'Project Management',
      'Public Speaking', 'Negotiation', 'Customer Service', 'Analytical Thinking'
    ],
    'Languages': [
      'English', 'French', 'Kinyarwanda', 'Kiswahili', 'Spanish', 'German', 'Chinese', 'Arabic'
    ]
  }

  return (
    <div className="space-y-6">
      {skillCategories.map((category, index) => (
        <div key={category.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={category.name}
              onChange={(e) => updateCategoryName(category.id, e.target.value)}
              className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0 p-0"
              placeholder="Skill Category Name"
            />
            {skillCategories.length > 1 && (
              <button
                onClick={() => removeSkillCategory(category.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Add skill input */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkills[category.id] || ''}
                onChange={(e) => setNewSkills({ ...newSkills, [category.id]: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, category.id)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Type a skill and press Enter"
              />
              <button
                onClick={() => addSkill(category.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Predefined skills suggestions */}
          {predefinedSkills[category.name as keyof typeof predefinedSkills] && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {predefinedSkills[category.name as keyof typeof predefinedSkills]
                  .filter(skill => !category.skills.includes(skill))
                  .slice(0, 10)
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        setSkillCategories(skillCategories.map(cat =>
                          cat.id === category.id
                            ? { ...cat, skills: [...cat.skills, skill] }
                            : cat
                        ))
                      }}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-green-100 hover:text-green-700 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Skills list */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill(category.id, skillIndex)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          {category.skills.length === 0 && (
            <p className="text-gray-500 text-sm italic">No skills added yet</p>
          )}
        </div>
      ))}

      <button
        onClick={addSkillCategory}
        className="flex items-center justify-center w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Skill Category
      </button>
    </div>
  )
}

export default SkillsForm