import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Certification {
  id: string
  name: string
  organization: string
  issueDate: string
  expiryDate: string
  neverExpires: boolean
  credentialId: string
  credentialUrl: string
}

interface CertificationsFormProps {
  data: { certifications?: Certification[] }
  onDataUpdate: (data: { certifications: Certification[] }) => void
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onDataUpdate }) => {
  const [certifications, setCertifications] = useState<Certification[]>(
    data.certifications || [{
      id: '1',
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      neverExpires: false,
      credentialId: '',
      credentialUrl: ''
    }]
  )

  useEffect(() => {
    onDataUpdate({ certifications })
  }, [certifications, onDataUpdate])

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      neverExpires: false,
      credentialId: '',
      credentialUrl: ''
    }
    setCertifications([...certifications, newCertification])
  }

  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter(cert => cert.id !== id))
    }
  }

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    setCertifications(certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    ))
  }

  return (
    <div className="space-y-6">
      {certifications.map((certification, index) => (
        <div key={certification.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Certification {index + 1}
            </h3>
            {certifications.length > 1 && (
              <button
                onClick={() => removeCertification(certification.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Name *
              </label>
              <input
                type="text"
                value={certification.name}
                onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={certification.organization}
                onChange={(e) => updateCertification(certification.id, 'organization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Amazon Web Services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date *
              </label>
              <input
                type="month"
                value={certification.issueDate}
                onChange={(e) => updateCertification(certification.id, 'issueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="month"
                value={certification.expiryDate}
                disabled={certification.neverExpires}
                onChange={(e) => updateCertification(certification.id, 'expiryDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                value={certification.credentialId}
                onChange={(e) => updateCertification(certification.id, 'credentialId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="ABC123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential URL
              </label>
              <input
                type="url"
                value={certification.credentialUrl}
                onChange={(e) => updateCertification(certification.id, 'credentialUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://credly.com/badges/..."
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={certification.neverExpires}
                onChange={(e) => {
                  updateCertification(certification.id, 'neverExpires', e.target.checked)
                  if (e.target.checked) {
                    updateCertification(certification.id, 'expiryDate', '')
                  }
                }}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">This certification never expires</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="flex items-center justify-center w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-300 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Certification
      </button>
    </div>
  )
}

export default CertificationsForm