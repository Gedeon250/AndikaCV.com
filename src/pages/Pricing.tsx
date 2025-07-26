import React from 'react'
import { Check, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      currency: 'RWF',
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        'Create 1 CV',
        'Basic templates',
        'PDF download with watermark',
        'Basic cover letter generator',
        'Email support'
      ],
      limitations: [
        'AndikaCV watermark',
        'Limited templates',
        'No priority support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Premium',
      price: '5,000',
      currency: 'RWF',
      period: 'Monthly',
      description: 'Best for active job seekers',
      features: [
        'Unlimited CVs',
        'All premium templates',
        'PDF & Word downloads',
        'No watermark',
        'Advanced cover letter generator',
        'Priority email support',
        'CV review service',
        'ATS optimization tips'
      ],
      limitations: [],
      cta: 'Start Premium',
      popular: true
    },
    {
      name: 'Professional',
      price: '15,000',
      currency: 'RWF',
      period: 'Quarterly',
      description: 'For serious professionals',
      features: [
        'Everything in Premium',
        'LinkedIn profile optimization',
        'Personal career consultation (30 min)',
        'Custom template design',
        'Job application tracking',
        'Interview preparation guide',
        'WhatsApp support',
        'Career tips newsletter'
      ],
      limitations: [],
      cta: 'Go Professional',
      popular: false
    }
  ]

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to premium features until the end of your billing period.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Mobile Money (MTN, Airtel), bank cards, and PayPal. All payments are processed securely.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption to protect your personal information and CV data. Your privacy is our priority.'
    },
    {
      question: 'Can I download my CV in different formats?',
      answer: 'Premium users can download their CVs in both PDF and Word formats. Free users can download PDFs with a small watermark.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start for free and upgrade when you're ready. All plans include our core CV building tools
            and professional templates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.currency}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{plan.period}</p>
                </div>

                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mb-6 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Limitations:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-gray-500 text-sm">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Secure Payment Methods</h2>
          <p className="text-gray-600 mb-8">We support local and international payment options</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-center">
              <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs">MTN</span>
              </div>
              <p className="text-sm text-gray-600">MTN Money</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs">Airtel</span>
              </div>
              <p className="text-sm text-gray-600">Airtel Money</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs">Card</span>
              </div>
              <p className="text-sm text-gray-600">Credit/Debit</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs">PP</span>
              </div>
              <p className="text-sm text-gray-600">PayPal</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Professional CV?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful job seekers who trust AndikaCV
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
              Start Building Your CV
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-green-500 hover:text-green-600 transition-all duration-200">
              View Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing