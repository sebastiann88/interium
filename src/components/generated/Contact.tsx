import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Building2, Phone, Mail } from 'lucide-react';
export const ContactPage = ({ onNavigateHome, onNavigateBlog, onNavigateContact, onOpenLogin, onOpenRegister }: { onNavigateHome?: () => void; onNavigateBlog?: () => void; onNavigateContact?: () => void; onOpenLogin?: () => void; onOpenRegister?: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onNavigateHome={onNavigateHome} onNavigateBlog={onNavigateBlog} onNavigateContact={onNavigateContact} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} activePage="contact" />
      
      <main className="flex-1 py-16 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Get in touch
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-12">
                Proin volutpat consequat porttitor cras nullam gravida at.
                Orci molestie a eu arcu. Sed ut tincidunt integer
                elementum id sem. Arcu sed malesuada et magna.
              </p>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900">545 Mavis Island</p>
                    <p className="text-gray-900">Chicago, IL 99191</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                  <p className="text-gray-900">+1 (555) 234-5678</p>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                  <p className="text-gray-900">hello@example.com</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
                      First name
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
                      Last name
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone number
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button type="submit" className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium px-8 py-3 rounded-full transition-colors shadow-sm hover:shadow-md">
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};