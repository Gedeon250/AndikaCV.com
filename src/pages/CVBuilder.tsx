import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Languages, 
  FileText, 
  Users, 
  Download,
  Save,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import PersonalInfoForm from '../components/CVBuilder/PersonalInfoForm'
import EducationForm from '../components/CVBuilder/EducationForm'
import ExperienceForm from '../components/CVBuilder/ExperienceForm'
import SkillsForm from '../components/CVBuilder/SkillsForm'
import LanguagesForm from '../components/CVBuilder/LanguagesForm'
import CertificationsForm from '../components/CVBuilder/CertificationsForm'
import ReferencesForm from '../components/CVBuilder/ReferencesForm'
import CVPreview from '../components/CVBuilder/CVPreview'

const CVBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [cvData, setCvData] = useState({})
  const [showPreview, setShowPreview] = useState(false)

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: <User className="h-5 w-5" />, component: PersonalInfoForm },
    { id: 'education', title: 'Education', icon: <GraduationCap className="h-5 w-5" />, component: EducationForm },
    { id: 'experience', title: 'Experience', icon: <Briefcase className="h-5 w-5" />, component: ExperienceForm },
    { id: 'skills', title: 'Skills', icon: <Award className="h-5 w-5" />, component: SkillsForm },
    { id: 'languages', title: 'Languages', icon: <Languages className="h-5 w-5" />, component: LanguagesForm },
    { id: 'certifications', title: 'Certifications', icon: <FileText className="h-5 w-5" />, component: CertificationsForm },
    { id: 'references', title: 'References', icon: <Users className="h-5 w-5" />, component: ReferencesForm },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const handleDataUpdate = (stepData: any) => {
    setCvData(prev => ({
      ...prev,
      [steps[currentStep].id]: stepData
    }))
  }

  const handleSave = () => {
    // Save to local storage or database
    localStorage.setItem('cvData', JSON.stringify(cvData))
    // Show success message
  }

  const handleDownload = () => {
    // Generate and download PDF
    console.log('Downloading CV...', cvData)
  }

  const CurrentStepComponent = steps[currentStep].component

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">CV Preview</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Editor
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
          <CVPreview data={cvData} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CV Builder</h1>
          <p className="text-gray-600">Create your professional CV step by step</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    index === currentStep
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white border-transparent'
                      : index < currentStep
                      ? 'bg-green-100 text-green-600 border-green-300'
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}
                >
                  {step.icon}
                </button>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  index === currentStep ? 'text-green-600' : index < currentStep ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`h-px w-8 sm:w-16 mx-2 ${
                    index < currentStep ? 'bg-green-300' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  {steps[currentStep].icon}
                  <span className="ml-2">{steps[currentStep].title}</span>
                </h2>
                <div className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>

              <CurrentStepComponent
                data={cvData[steps[currentStep].id] || {}}
                onDataUpdate={handleDataUpdate}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Progress
                  </button>
                  
                  {currentStep === steps.length - 1 ? (
                    <button
                      onClick={() => setShowPreview(true)}
                      className="flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview CV
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview CV
                </button>
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keep your CV to 1-2 pages</li>
                  <li>• Use action verbs in descriptions</li>
                  <li>• Tailor your CV for each job</li>
                  <li>• Proofread for errors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVBuilder