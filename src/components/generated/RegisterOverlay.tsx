import React from 'react';
import { X } from 'lucide-react';

// Google Icon SVG Component
const GoogleIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4" />
    <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853" />
    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.82999 3.96409 7.28999V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
    <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
  </svg>;

// Facebook Icon SVG Component
const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.514c-1.491 0-1.955.93-1.955 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>;
export interface RegisterOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
  onGoogleSignUp?: () => void;
  onFacebookSignUp?: () => void;
  onEmailSignUp?: (email: string, password: string, firstName: string, lastName: string) => void;
}
export const RegisterOverlay: React.FC<RegisterOverlayProps> = ({
  isOpen = true,
  onClose,
  onGoogleSignUp,
  onFacebookSignUp,
  onEmailSignUp
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  if (!isOpen) return null;
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    onEmailSignUp?.(email, password, firstName, lastName);
  };
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };
  return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Close">
          <X className="w-5 h-5 text-gray-900" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
            <p className="text-[15px] text-gray-700">
              Join Interium and start designing
            </p>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3 mb-6">
            <button onClick={onGoogleSignUp} className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full text-[15px] font-bold text-gray-900 transition-all flex items-center justify-center gap-3 hover:shadow-md">
              <GoogleIcon />
              Continue with Google
            </button>
            
            <button onClick={onFacebookSignUp} className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full text-[15px] font-bold text-gray-900 transition-all flex items-center justify-center gap-3 hover:shadow-md">
              <FacebookIcon />
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-[13px]">
              <span className="px-4 bg-white text-gray-500 font-bold">OR</span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-[13px] font-bold text-gray-900 mb-2">
                  First Name
                </label>
                <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required className="w-full px-4 py-3 text-[15px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1DA1F2] transition-colors placeholder:text-gray-500" />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-[13px] font-bold text-gray-900 mb-2">
                  Last Name
                </label>
                <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required className="w-full px-4 py-3 text-[15px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1DA1F2] transition-colors placeholder:text-gray-500" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] font-bold text-gray-900 mb-2">
                Email Address
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full px-4 py-3 text-[15px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1DA1F2] transition-colors placeholder:text-gray-500" />
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-bold text-gray-900 mb-2">
                Password
              </label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required className="w-full px-4 py-3 text-[15px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1DA1F2] transition-colors placeholder:text-gray-500" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[13px] font-bold text-gray-900 mb-2">
                Confirm Password
              </label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required className="w-full px-4 py-3 text-[15px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1DA1F2] transition-colors placeholder:text-gray-500" />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-2 border-gray-300 text-[#1DA1F2] focus:ring-[#1DA1F2] focus:ring-2" />
              <label htmlFor="terms" className="text-[13px] text-gray-700 font-bold cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-[#1DA1F2] hover:underline">
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-[#1DA1F2] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-full text-[15px] font-bold transition-colors shadow-sm">
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-[15px] text-gray-700 mt-6">
            Already have an account?{' '}
            <a href="#" className="text-[#1DA1F2] font-bold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>;
};
export default RegisterOverlay;