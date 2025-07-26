import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Eye, 
  Download, 
  Star, 
  CheckCircle,
  ArrowRight,
  Filter,
  Grid,
  List
} from 'lucide-react'

interface Template {
  id: string
  name: string
  category: 'modern' | 'traditional' | 'creative' | 'minimal'
  description: string
  image: string
  isPremium: boolean
  rating: number
  downloads: number
  tags: string[]
}

const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const templates: Template[] = [
    {
      id: 'modern-1',
      name: 'Modern Professional',
      category: 'modern',
      description: 'Clean and contemporary design perfect for tech and creative industries',
      image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      rating: 4.8,
      downloads: 1247,
      tags: ['Professional', 'Clean', 'Modern']
    },
    {
      id: 'traditional-1',
      name: 'Classic Business',
      category: 'traditional',
      description: 'Traditional format suitable for corporate and finance positions',
      image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      rating: 4.6,
      downloads: 892,
      tags: ['Traditional', 'Corporate', 'Formal']
    },
    {
      id: 'creative-1',
      name: 'Creative Portfolio',
      category: 'creative',
      description: 'Stand out with this unique design for creative and design roles',
      image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      rating: 4.9,
      downloads: 567,
      tags: ['Creative', 'Portfolio', 'Unique']
    },
    {
      id: 'minimal-1',
      name: 'Minimal Clean',
      category: 'minimal',
      description: 'Simple and focused design that puts content first',
      image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: false,
      rating: 4.7,
      downloads: 734,
      tags: ['Minimal', 'Clean', 'Simple']
    },
    {
      id: 'modern-2',
      name: 'Tech Developer',
      category: 'modern',
      description: 'Perfect for software developers and tech professionals',
      image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      rating: 4.9,
      downloads: 445,
      tags: ['Tech', 'Developer', 'Modern']
    },
    {
      id: 'traditional-2',
      name: 'Executive Summary',
      category: 'traditional',
      description: 'Executive-level template for senior management positions',
      image: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      rating: 4.8,
      downloads: 234,
      tags: ['Executive', 'Senior', 'Management']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'modern', name: 'Modern', count: templates.filter(t => t.category === 'modern').length },
    { id: 'traditional', name: 'Traditional', count: templates.filter(t => t.category === 'traditional').length },
    { id: 'creative', name: 'Creative', count: templates.filter(t => t.category === 'creative').length },
    { id: 'minimal', name: 'Minimal', count: templates.filter(t => t.category === 'minimal').length }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
  }

  const handleUseTemplate = (template: Template) => {
    // Navigate to CV builder with selected template
    window.location.href = `/cv-builder?template=${template.id}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CV Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our professionally designed templates. Each template is optimized for 
            different industries and job types to help you stand out.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Template Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                {template.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handleTemplateSelect(template)}
                    className="opacity-0 hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2 inline" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{template.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {template.downloads.toLocaleString()} downloads
                  </span>
                  {template.isPremium && (
                    <span className="text-sm text-yellow-600 font-medium">Premium</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Use Template
                  </button>
                  <button
                    onClick={() => handleTemplateSelect(template)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more templates.</p>
          </div>
        )}

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTemplate.name}</h2>
                    <p className="text-gray-600">{selectedTemplate.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.name}
                  className="w-full rounded-lg shadow-lg"
                />
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{selectedTemplate.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedTemplate.downloads.toLocaleString()} downloads
                    </span>
                    {selectedTemplate.isPremium && (
                      <span className="text-sm text-yellow-600 font-medium">Premium Template</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleUseTemplate(selectedTemplate)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Templates 