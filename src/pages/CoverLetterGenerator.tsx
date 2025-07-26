import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Save, 
  Copy, 
  Edit3, 
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

const schema = yup.object({
  jobTitle: yup.string().required('Job title is required'),
  companyName: yup.string().required('Company name is required'),
  yourName: yup.string().required('Your name is required'),
  yourEmail: yup.string().email('Invalid email').required('Email is required'),
  yourPhone: yup.string().required('Phone number is required'),
  skills: yup.string().required('Skills and experience are required'),
  experience: yup.string().required('Relevant experience is required'),
  motivation: yup.string().required('Motivation is required'),
})

type FormData = yup.InferType<typeof schema>

const CoverLetterGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const watchedValues = watch()

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design',
      preview: 'Dear Hiring Manager, I am writing to express my strong interest...'
    },
    {
      id: 'traditional',
      name: 'Traditional Formal',
      description: 'Classic business letter format',
      preview: 'Dear Sir/Madam, I am writing to apply for the position of...'
    },
    {
      id: 'creative',
      name: 'Creative Standout',
      description: 'Unique and memorable approach',
      preview: 'Imagine having a team member who brings...'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and focused content',
      preview: 'I am excited to apply for the [Position] role at [Company]...'
    }
  ]

  const generateCoverLetter = (data: FormData) => {
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      let letter = ''
      
      switch (selectedTemplate) {
        case 'modern':
          letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.companyName}. With my background in ${data.skills}, I am confident in my ability to contribute effectively to your team.

${data.experience}

${data.motivation}

I am particularly drawn to ${data.companyName} because of your commitment to excellence and innovation. I believe my skills and experience align perfectly with your needs, and I am excited about the opportunity to contribute to your continued success.

I would welcome the opportunity to discuss how my background, skills, and enthusiasm can benefit your organization. Thank you for considering my application.

Best regards,
${data.yourName}
${data.yourEmail}
${data.yourPhone}`
          break
          
        case 'traditional':
          letter = `Dear Sir/Madam,

I am writing to apply for the position of ${data.jobTitle} at ${data.companyName}. I am confident that my qualifications and experience make me an excellent candidate for this role.

My relevant experience includes:
${data.experience}

My key skills include:
${data.skills}

${data.motivation}

I am very interested in joining ${data.companyName} and contributing to your team. I would appreciate the opportunity to discuss my qualifications in person.

Thank you for your time and consideration.

Sincerely,
${data.yourName}
${data.yourEmail}
${data.yourPhone}`
          break
          
        case 'creative':
          letter = `Dear Hiring Manager,

Imagine having a team member who brings ${data.skills} to every project. That's exactly what I offer as a candidate for the ${data.jobTitle} position at ${data.companyName}.

${data.experience}

${data.motivation}

I'm not just looking for a job - I'm looking for an opportunity to make a real impact at ${data.companyName}. I believe my unique combination of skills and passion would be a valuable addition to your team.

Let's discuss how I can help ${data.companyName} achieve its goals.

Best regards,
${data.yourName}
${data.yourEmail}
${data.yourPhone}`
          break
          
        case 'minimal':
          letter = `Dear Hiring Manager,

I am excited to apply for the ${data.jobTitle} role at ${data.companyName}.

Skills: ${data.skills}

Experience: ${data.experience}

Motivation: ${data.motivation}

I look forward to discussing this opportunity with you.

Best regards,
${data.yourName}
${data.yourEmail}
${data.yourPhone}`
          break
      }
      
      setGeneratedLetter(letter)
      setIsGenerating(false)
      setShowPreview(true)
      toast.success('Cover letter generated successfully!')
    }, 1500)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `cover-letter-${watchedValues.jobTitle?.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Cover letter downloaded!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    toast.success('Cover letter copied to clipboard!')
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Cover Letter Preview</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Editor
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {generatedLetter}
            </pre>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cover Letter Generator</h1>
          <p className="text-gray-600">Create professional cover letters that get you noticed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <form onSubmit={handleSubmit(generateCoverLetter)} className="space-y-6">
                {/* Template Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <p className="text-xs text-gray-500 italic">{template.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      {...register('jobTitle')}
                      type="text"
                      id="jobTitle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Software Developer"
                    />
                    {errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      {...register('companyName')}
                      type="text"
                      id="companyName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Tech Company Rwanda"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                    )}
                  </div>
                </div>

                {/* Your Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        {...register('yourName')}
                        type="text"
                        id="yourName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                      {errors.yourName && (
                        <p className="text-red-500 text-sm mt-1">{errors.yourName.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        {...register('yourEmail')}
                        type="email"
                        id="yourEmail"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                      {errors.yourEmail && (
                        <p className="text-red-500 text-sm mt-1">{errors.yourEmail.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="yourPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        {...register('yourPhone')}
                        type="tel"
                        id="yourPhone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+250 123 456 789"
                      />
                      {errors.yourPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.yourPhone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Key Skills & Qualifications *
                    </label>
                    <textarea
                      {...register('skills')}
                      id="skills"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your key skills, qualifications, and what makes you a strong candidate..."
                    />
                    {errors.skills && (
                      <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Relevant Experience *
                    </label>
                    <textarea
                      {...register('experience')}
                      id="experience"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your relevant work experience, achievements, and how it relates to this position..."
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                      Why You Want This Job *
                    </label>
                    <textarea
                      {...register('motivation')}
                      id="motivation"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Explain why you're interested in this position and company..."
                    />
                    {errors.motivation && (
                      <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Great Cover Letters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Keep it Concise</h4>
                  <p className="text-sm text-gray-600">Aim for 250-400 words. Be specific and relevant.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Show Enthusiasm</h4>
                  <p className="text-sm text-gray-600">Demonstrate genuine interest in the company and role.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Highlight Achievements</h4>
                  <p className="text-sm text-gray-600">Use specific examples and quantifiable results.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Research the Company</h4>
                  <p className="text-sm text-gray-600">Mention specific details about the company's mission or values.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Proofread Carefully</h4>
                  <p className="text-sm text-gray-600">Check for spelling, grammar, and formatting errors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverLetterGenerator 