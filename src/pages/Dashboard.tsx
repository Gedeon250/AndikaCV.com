import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Plus, 
  Eye,
  Calendar,
  User,
  Star,
  Settings,
  CreditCard
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

interface CV {
  id: string
  title: string
  template_id: string
  created_at: string
  updated_at: string
  data: any
}

interface CoverLetter {
  id: string
  title: string
  company_name: string
  position: string
  created_at: string
  updated_at: string
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [cvs, setCvs] = useState<CV[]>([])
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'cvs' | 'cover-letters' | 'settings'>('cvs')

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      setLoading(true)
      
      // Load CVs
      const { data: cvData, error: cvError } = await supabase
        .from('cvs')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false })

      if (cvError) throw cvError
      setCvs(cvData || [])

      // Load Cover Letters
      const { data: clData, error: clError } = await supabase
        .from('cover_letters')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false })

      if (clError) throw clError
      setCoverLetters(clData || [])
    } catch (error) {
      console.error('Error loading user data:', error)
      toast.error('Failed to load your data')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCV = async (cvId: string) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      try {
        const { error } = await supabase
          .from('cvs')
          .delete()
          .eq('id', cvId)

        if (error) throw error
        
        setCvs(cvs.filter(cv => cv.id !== cvId))
        toast.success('CV deleted successfully')
      } catch (error) {
        console.error('Error deleting CV:', error)
        toast.error('Failed to delete CV')
      }
    }
  }

  const handleDeleteCoverLetter = async (clId: string) => {
    if (window.confirm('Are you sure you want to delete this cover letter?')) {
      try {
        const { error } = await supabase
          .from('cover_letters')
          .delete()
          .eq('id', clId)

        if (error) throw error
        
        setCoverLetters(coverLetters.filter(cl => cl.id !== clId))
        toast.success('Cover letter deleted successfully')
      } catch (error) {
        console.error('Error deleting cover letter:', error)
        toast.error('Failed to delete cover letter')
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getSubscriptionStatus = () => {
    // This would come from user profile
    return 'free' // or 'premium'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your CVs and cover letters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{user?.email}</h3>
                <div className="flex items-center justify-center mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    getSubscriptionStatus() === 'premium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {getSubscriptionStatus() === 'premium' ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('cvs')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'cvs'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-4 w-4 mr-3" />
                  My CVs ({cvs.length})
                </button>
                <button
                  onClick={() => setActiveTab('cover-letters')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'cover-letters'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-4 w-4 mr-3" />
                  Cover Letters ({coverLetters.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link
                    to="/cv-builder"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Create New CV
                  </Link>
                  <Link
                    to="/cover-letter"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Create Cover Letter
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'cvs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">My CVs</h2>
                    <Link
                      to="/cv-builder"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New CV
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  {cvs.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No CVs yet</h3>
                      <p className="text-gray-600 mb-6">Create your first professional CV to get started</p>
                      <Link
                        to="/cv-builder"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First CV
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cvs.map((cv) => (
                        <div key={cv.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-900">{cv.title}</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDeleteCV(cv.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Delete CV"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-4">
                            <p>Template: {cv.template_id}</p>
                            <p>Updated: {formatDate(cv.updated_at)}</p>
                          </div>

                          <div className="flex space-x-2">
                            <Link
                              to={`/cv-builder?edit=${cv.id}`}
                              className="flex items-center px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Link>
                            <button className="flex items-center px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </button>
                            <button className="flex items-center px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'cover-letters' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Cover Letters</h2>
                    <Link
                      to="/cover-letter"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Cover Letter
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  {coverLetters.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No cover letters yet</h3>
                      <p className="text-gray-600 mb-6">Create your first professional cover letter</p>
                      <Link
                        to="/cover-letter"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Cover Letter
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {coverLetters.map((cl) => (
                        <div key={cl.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-900">{cl.title}</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDeleteCoverLetter(cl.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Delete Cover Letter"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-4">
                            <p>Position: {cl.position}</p>
                            <p>Company: {cl.company_name}</p>
                            <p>Updated: {formatDate(cl.updated_at)}</p>
                          </div>

                          <div className="flex space-x-2">
                            <Link
                              to={`/cover-letter?edit=${cl.id}`}
                              className="flex items-center px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Link>
                            <button className="flex items-center px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </button>
                            <button className="flex items-center px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {getSubscriptionStatus() === 'premium' ? 'Premium Plan' : 'Free Plan'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {getSubscriptionStatus() === 'premium' 
                              ? 'Unlimited CVs and cover letters' 
                              : '1 CV and 1 cover letter'
                            }
                          </p>
                        </div>
                        {getSubscriptionStatus() === 'free' && (
                          <Link
                            to="/pricing"
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                          >
                            Upgrade
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about new features</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 