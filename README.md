# AndikaCV.com

A modern, multilingual CV and Cover Letter builder platform designed for job seekers in Rwanda and beyond. Built with React, TypeScript, and Supabase.

## 🌟 Features

### ✅ Core Features
- **User Authentication** - Sign up with email, Google, or phone number
- **CV Builder** - Step-by-step guided form with live preview
- **Cover Letter Generator** - Multiple templates with customization
- **Multilingual Support** - English and Kinyarwanda
- **Template Library** - Modern, Traditional, Creative, and Minimal designs
- **PDF Download** - High-quality, print-ready documents
- **User Dashboard** - Manage saved CVs and cover letters
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🎨 CV Builder Sections
- Personal Information
- Education History
- Work Experience
- Skills & Certifications
- Languages
- References (Optional)

### 📝 Cover Letter Features
- Multiple template styles
- Customizable content
- Professional formatting
- Download as text file

### 💳 Pricing Model
- **Free Plan**: 1 CV + 1 Cover Letter
- **Premium Plan**: Unlimited CVs + Advanced features
- **Professional Plan**: Premium + Career consultation

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Forms**: React Hook Form + Yup validation
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AndikaCV.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🗄️ Database Schema

### Tables
- **profiles**: User profile information
- **cvs**: Saved CV data
- **cover_letters**: Saved cover letter data

### Sample Schema
```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CVs table
CREATE TABLE cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  template_id TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cover Letters table
CREATE TABLE cover_letters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── AuthModal.tsx
│   ├── CVBuilder/
│   │   ├── PersonalInfoForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── SkillsForm.tsx
│   │   ├── LanguagesForm.tsx
│   │   ├── CertificationsForm.tsx
│   │   ├── ReferencesForm.tsx
│   │   └── CVPreview.tsx
│   └── Layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LanguageSwitcher.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── pages/
│   ├── Home.tsx
│   ├── CVBuilder.tsx
│   ├── CoverLetterGenerator.tsx
│   ├── Templates.tsx
│   ├── Dashboard.tsx
│   ├── Pricing.tsx
│   └── Contact.tsx
└── lib/
    └── supabase.ts
```

## 🌍 Multilingual Support

The application supports both English and Kinyarwanda languages. Users can switch between languages using the language switcher in the header.

### Translation Keys
- Navigation items
- Form labels and validation messages
- Page content and descriptions
- Common UI elements

## 💳 Payment Integration

The platform is designed to integrate with:
- MTN Mobile Money
- Airtel Money
- PayPal
- Credit/Debit Cards

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- Supabase Row Level Security (RLS)
- JWT authentication
- Input validation and sanitization
- HTTPS enforcement
- CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: hello@andikacv.com
- Phone: +250 788 123 456
- Office: Kigali, Rwanda

## 🎉 Acknowledgments

- Built for the Rwandan job market
- Designed with accessibility in mind
- Optimized for local payment methods
- Multilingual support for local languages

---

**AndikaCV.com** - Helping job seekers in Rwanda and beyond create professional CVs and cover letters. 