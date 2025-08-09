import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  Upload, 
  Settings, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  Filter
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import AdminDebugToggle from '../components/AdminDebugToggle'

interface User {
  id: string
  email: string
  full_name: string
  subscription_tier: string
  created_at: string
}

interface Template {
  id: string
  name: string
  category: string
  description: string
  is_premium: boolean
  file_url?: string
  created_at: string
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState<User[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'cv',
    description: '',
    is_premium: false,
    file: null as File | null
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (usersError) throw usersError
      setUsers(usersData || [])

      // Load templates (you'll need to create this table)
      const { data: templatesData, error: templatesError } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (templatesError && templatesError.code !== 'PGRST116') {
        console.warn('Templates table not found:', templatesError)
      } else {
        setTemplates(templatesData || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true)
      console.log('🔍 Attempting to upload file:', file.name)
      
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`
      console.log('🔍 File name:', fileName)
      
      const { data, error } = await supabase.storage
        .from('templates')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      console.log('🔍 Upload result:', { data, error })

      if (error) {
        console.error('🔍 Upload error details:', error)
        throw error
      }

      return data.path
    } catch (error) {
      console.error('🔍 Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Failed to upload file: ${errorMessage}`)
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTemplate.file) {
      toast.error('Please select a file')
      return
    }

    try {
      setUploading(true)
      
      // Upload file
      const filePath = await handleFileUpload(newTemplate.file)
      if (!filePath) return

      // Create template record
      const { error } = await supabase
        .from('templates')
        .insert({
          name: newTemplate.name,
          category: newTemplate.category,
          description: newTemplate.description,
          is_premium: newTemplate.is_premium,
          file_url: filePath
        })

      if (error) throw error

      toast.success('Template created successfully!')
      setNewTemplate({
        name: '',
        category: 'cv',
        description: '',
        is_premium: false,
        file: null
      })
      loadData()
    } catch (error) {
      console.error('Error creating template:', error)
      toast.error('Failed to create template')
    } finally {
      setUploading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error

      toast.success('User deleted successfully')
      loadData()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalUsers: users.length,
    premiumUsers: users.filter(u => u.subscription_tier === 'premium').length,
    totalTemplates: templates.length,
    premiumTemplates: templates.filter(t => t.is_premium).length
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your AndikaCV platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Premium Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.premiumUsers}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTemplates}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Premium Templates</p>
                <p className="text-2xl font-bold text-gray-900">{stats.premiumTemplates}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'templates', name: 'Templates', icon: FileText },
                { id: 'upload', name: 'Upload Template', icon: Upload }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Platform Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      {users.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{user.full_name || 'No name'}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.subscription_tier === 'premium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.subscription_tier}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Templates</h3>
                    <div className="space-y-3">
                      {templates.slice(0, 5).map((template) => (
                        <div key={template.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{template.name}</p>
                            <p className="text-sm text-gray-600">{template.category}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            template.is_premium 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {template.is_premium ? 'Premium' : 'Free'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subscription
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.full_name || 'No name'}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.subscription_tier === 'premium' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.subscription_tier}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Template Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          template.is_premium 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.is_premium ? 'Premium' : 'Free'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{template.category}</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Upload New Template</h2>
                
                <form onSubmit={handleCreateTemplate} className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter template name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="cv">CV Template</option>
                      <option value="cover-letter">Cover Letter Template</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter template description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template File
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setNewTemplate({ ...newTemplate, file: e.target.files?.[0] || null })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      accept=".pdf,.doc,.docx"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="premium"
                      checked={newTemplate.is_premium}
                      onChange={(e) => setNewTemplate({ ...newTemplate, is_premium: e.target.checked })}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="premium" className="ml-2 block text-sm text-gray-900">
                      Premium Template
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Template
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Admin Debug Toggle - Only visible on admin dashboard */}
      <AdminDebugToggle />
    </div>
  )
}

export default AdminDashboard 