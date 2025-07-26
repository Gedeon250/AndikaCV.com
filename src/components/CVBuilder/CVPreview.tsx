import React from 'react'

interface CVPreviewProps {
  data: any
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const personalInfo = data.personal || {}
  const education = data.education || []
  const experience = data.experience || []
  const skills = data.skills || []
  const languages = data.languages || []
  const certifications = data.certifications || []
  const references = data.references || []

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            {personalInfo.email && <p>📧 {personalInfo.email}</p>}
            {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
          </div>
          <div>
            {personalInfo.address && <p>📍 {personalInfo.address}, {personalInfo.city}, {personalInfo.country}</p>}
            {personalInfo.linkedIn && <p>💼 LinkedIn: {personalInfo.linkedIn}</p>}
            {personalInfo.website && <p>🌐 {personalInfo.website}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-green-500 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].jobTitle && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-green-600 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm">
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && education[0].degree && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-green-600">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && skills.some((cat: any) => cat.skills?.length > 0) && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((category, index) => (
                category.skills?.length > 0 && (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && languages[0].language && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-1">
              Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium text-gray-900">{lang.language}</span>
                  <span className="text-gray-600 capitalize">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && certifications[0].name && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-1">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-green-600">{cert.organization}</p>
                      {cert.credentialId && <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(cert.issueDate)}</p>
                      {cert.expiryDate && !cert.neverExpires && (
                        <p>Expires: {formatDate(cert.expiryDate)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && references[0].name && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-1">
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {references.map((ref, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                  <p className="text-green-600">{ref.jobTitle}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-gray-600 capitalize text-sm">{ref.relationship}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>📧 {ref.email}</p>
                    <p>📱 {ref.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default CVPreview