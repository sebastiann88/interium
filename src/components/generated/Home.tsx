import React, { useState } from 'react';
import { Play, Volume2, Maximize, User, MapPin, Mail, Twitter, Facebook, Linkedin, Instagram, ChevronRight } from 'lucide-react';
import { LoginOverlay } from './LoginOverlay';
import { RegisterOverlay } from './RegisterOverlay';

// --- Icons & Assets ---

const ImagePlaceholder = ({
  className = ""
}: {
  className?: string;
}) => <div className={`bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden ${className}`}>
    <svg viewBox="0 0 200 150" className="w-1/2 h-1/2 text-gray-300 fill-current">
      <path d="M20 130 L80 50 L140 130 Z" opacity="0.8" />
      <path d="M100 130 L150 70 L200 130 Z" opacity="0.8" />
      <circle cx="160" cy="40" r="20" opacity="0.8" />
    </svg>
  </div>;
const VideoPlayerMock = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return <div className="w-full aspect-video border border-gray-200 bg-black rounded-2xl overflow-hidden flex flex-col shadow-sm">
    <div className="flex-1 relative">
      {/* Video Content Area */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" onClick={togglePlay} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} controls>
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>;
};

// --- Sub-Components ---

const NavLink = ({
  children,
  href = "#"
}: {
  children: React.ReactNode;
  href?: string;
}) => <a href={href} className="text-[15px] font-bold text-gray-900 hover:text-[#1DA1F2] transition-colors">
    {children}
  </a>;
const StepSection = ({
  number,
  title,
  subtitle,
  description,
  imageRight = false
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageRight?: boolean;
}) => {
  return <div className="py-16 md:py-20 border-b border-gray-200 last:border-0">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${imageRight ? '' : 'md:flex-row-reverse'}`}>
          {/* Text Content */}
          <div className="flex-1 space-y-3">
            <div className="text-sm text-[#1DA1F2] font-bold">{subtitle}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-[#1DA1F2] mr-2">{number}.</span>
              {title}
            </h2>
            <p className="text-[15px] text-gray-700 leading-relaxed max-w-lg">
              {description}
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg">
              Quisque volutpat mattis eros. Nullam malesuada erat ut turpis urna nibh viverra non semper suscipit posuere a pede.
            </p>
          </div>
          
          {/* Image Placeholder */}
          <div className="flex-1 w-full aspect-square md:aspect-[4/3]">
            <ImagePlaceholder className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>;
};
const BlogPost = ({
  title,
  date,
  author,
  category
}: {
  title: string;
  date: string;
  author: string;
  category: string;
}) => <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-[#1DA1F2]">
    <div className="aspect-[16/9] w-full">
      <ImagePlaceholder className="w-full h-full rounded-none" />
    </div>
    <div className="p-5 space-y-3">
      <h3 className="text-lg font-bold text-gray-900 leading-snug">{title}</h3>
      <div className="flex items-center text-[13px] text-gray-500 gap-2">
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          {date}
        </span>
        <span>·</span>
        <span className="flex items-center gap-1.5">
          <User size={14} />
          {author}
        </span>
        <span>·</span>
        <span>{category}</span>
      </div>
      <p className="text-[15px] text-gray-700 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio urna nibh viverra non semper suscipit, Lorem ipsum dolor sit amet, consectetuer adipiscing.
      </p>
      <button className="text-[15px] font-bold text-[#1DA1F2] hover:underline">
        Read More
      </button>
    </div>
  </div>;
const PricingCard = ({
  name,
  price,
  period,
  features,
  highlighted = false
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}) => <div className={`bg-white rounded-2xl border-2 ${highlighted ? 'border-[#1DA1F2] shadow-xl' : 'border-gray-200'} p-6 flex flex-col transition-all hover:shadow-lg ${highlighted ? '' : 'hover:border-[#1DA1F2]'}`}>
    <div className="text-center pb-6 border-b border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
      <div className="mb-1">
        <span className="text-5xl font-bold text-gray-900">${price}</span>
        <span className="text-[15px] text-gray-500">/{period}</span>
      </div>
    </div>
    
    <ul className="space-y-3 py-6 flex-1">
      {features.map((feature, index) => <li key={index} className="flex items-start gap-2 text-[15px] text-gray-700">
          <ChevronRight className="w-5 h-5 text-[#1DA1F2] shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>)}
    </ul>
    
    <button className={`w-full py-3 rounded-full text-[15px] font-bold transition-all ${highlighted ? 'bg-[#1DA1F2] text-white hover:bg-[#1a8cd8]' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
      Get Started
    </button>
  </div>;

// @component: Home
export const Home = ({ onSignIn, onNavigateBlog, onNavigateContact }: { onSignIn?: () => void; onNavigateBlog?: () => void; onNavigateContact?: () => void }) => {
  const [activeTab, setActiveTab] = useState('Canvas');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Tab content data
  const tabContent = {
    'Canvas': {
      title: 'Canvas',
      description: 'Canvas delivers the most accurate, detailed, and editable as-built documentation on the market with the ease and simplicity of taking a video.'
    },
    'Scan to CAD': {
      title: 'Scan to CAD',
      description: 'Transform your physical space into precise CAD drawings with automated conversion. Our advanced algorithms ensure accuracy and maintain all dimensional data.'
    },
    'Stage': {
      title: 'Stage',
      description: 'Your digital workspace where creativity meets precision. Arrange, modify, and visualize your design elements in real-time with intuitive controls.'
    },
    'Design': {
      title: 'Design',
      description: 'Bring your vision to life with professional design tools. Customize materials, colors, and furniture placement to create the perfect interior space.'
    }
  };

  // @return
  return <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between max-w-6xl">
          <div className="text-2xl font-black tracking-tight text-gray-900" style={{
          color: "#1da1f2"
        }}>Interium</div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={onNavigateBlog} className="text-[15px] font-bold text-gray-900 hover:text-[#1DA1F2] transition-colors">Blog</button>
            <button onClick={onNavigateContact} className="text-[15px] font-bold text-gray-900 hover:text-[#1DA1F2] transition-colors">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 text-[15px] font-bold text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              Login
            </button>
            <button onClick={() => setIsRegisterOpen(true)} className="px-5 py-2 text-[15px] font-bold text-white bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-full transition-colors shadow-sm">
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-16 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block text-[13px] font-bold text-[#1DA1F2] bg-blue-50 px-4 py-1.5 rounded-full">
            IMMERSIVE INTERIORS
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-gray-900" style={{
          fontFamily: "'Playfair Display', Georgia, serif"
        }}>
            Design Your Interior <br />
            Spaces in 3D
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 text-[17px] leading-relaxed">
            Envision your new space, re-designed in 3D, with physical dimensions included with every scan. Explore interior design, on a playground that we call a stage.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* Video Player Area */}
          <div className="md:col-span-8">
            <VideoPlayerMock />
          </div>

          {/* Feature Tabs */}
          <div className="md:col-span-4 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Your Stage is Your Playground</h3>
            
            <div className="flex flex-col gap-2 mb-4">
              {['Canvas', 'Scan to CAD', 'Stage', 'Design'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-4 text-left text-[15px] font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-[#1DA1F2] text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  {tab}
                </button>)}
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex-1">
              <p className="text-[15px] leading-relaxed text-gray-700">
                {tabContent[activeTab as keyof typeof tabContent].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <div className="bg-gray-50 w-full">
        <StepSection number="1" title="Scan Your Room" subtitle="SCAN YOUR INTERIOR WITH YOUR IPHONE / IPAD" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio urna nibh viverra non semper suscipit." imageRight={true} />
        <StepSection number="2" title="Import Your 3D Model" subtitle="CONVERT TO CAD" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio urna nibh viverra non semper suscipit." imageRight={false} />
        <StepSection number="3" title="Design Your Interior" subtitle="START DESIGNING YOUR HOME" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio urna nibh viverra non semper suscipit." imageRight={true} />
      </div>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">Choose Your Plan</h2>
            <p className="text-[15px] max-w-xl mx-auto text-gray-700 leading-relaxed">
              Select the perfect plan for your interior design needs. All plans include access to our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard name="Starter" price="29" period="month" features={["Scan up to 3 rooms", "Basic 3D model export", "Standard support", "1 GB cloud storage", "Mobile app access"]} />
            <PricingCard name="Professional" price="79" period="month" features={["Unlimited room scans", "Advanced CAD export", "Priority support", "10 GB cloud storage", "Desktop & mobile access", "Collaboration tools"]} highlighted={true} />
            <PricingCard name="Enterprise" price="199" period="month" features={["Everything in Professional", "Custom integrations", "Dedicated account manager", "Unlimited cloud storage", "White-label options", "API access"]} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 container mx-auto px-4 md:px-6 max-w-6xl bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">Latest Blog Posts</h2>
          <p className="text-[15px] max-w-xl mx-auto text-gray-700 leading-relaxed">
            When you commit to our workouts you will notice a change in your health and physical appearance. Stay consistent and you will see exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <BlogPost title="Lidar Scans" date="Oct 5, 2024" author="Jonathan" category="Design" />
          <BlogPost title="Interior Design" date="Oct 5, 2024" author="Jonathan" category="Design" />
          <BlogPost title="Design Your Home" date="Oct 5, 2024" author="Jonathan" category="Design" />
        </div>
      </section>

      {/* Newsletter Bar */}
      <section className="bg-[#1DA1F2] py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left text-white">
            <div className="text-[13px] font-bold mb-1 opacity-90">JOIN OUR NEWSLETTER</div>
            <h3 className="text-2xl md:text-3xl font-black">Subscribe Newsletter</h3>
          </div>

          <div className="flex w-full md:w-auto max-w-md gap-2">
            <input type="email" placeholder="Enter Your Email Address" className="bg-white rounded-full px-5 py-3 flex-1 md:w-80 text-[15px] focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-500" />
            <button className="bg-gray-900 text-white px-6 py-3 text-[15px] font-bold rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl grid md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h4 className="text-2xl font-black">Interium</h4>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio urna nibh viverra non semper suscipit. Lorem ipsum dolor sit amet.
            </p>
            <div className="flex gap-2 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1DA1F2] transition-colors flex items-center justify-center">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1DA1F2] transition-colors flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1DA1F2] transition-colors flex items-center justify-center">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1DA1F2] transition-colors flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Get in Touch</h4>
            <div className="space-y-3 text-[15px] text-gray-400">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio urna nibh viverra non semper suscipit.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 hover:text-[#1DA1F2] transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Ottawa, Ontario, Canada</span>
                </div>
                <div className="flex items-center gap-2 hover:text-[#1DA1F2] transition-colors">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:sebastian@skylightdesigns.ca">sebastian@skylightdesigns.ca</a>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Recent Posts</h4>
            <div className="space-y-4">
              {[1, 2].map(post => <div key={post} className="flex gap-3 group cursor-pointer">
                  <div className="w-14 h-14 bg-gray-800 rounded-lg shrink-0 group-hover:bg-[#1DA1F2] transition-colors" />
                  <div className="space-y-1">
                    <p className="text-[13px] leading-snug text-gray-400 group-hover:text-white transition-colors">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    </p>
                    <p className="text-[11px] text-gray-500">Oct 5, 2024</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Newsletter Form (Footer) */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Newsletter</h4>
            <form className="space-y-3">
              <input type="text" placeholder="Enter Your First Name" className="w-full px-4 py-2.5 text-[15px] text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] placeholder:text-gray-500" />
              <input type="email" placeholder="Enter Your Email Address" className="w-full px-4 py-2.5 text-[15px] text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] placeholder:text-gray-500" />
              <button className="px-5 py-2.5 text-[15px] font-bold bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors rounded-lg w-full">
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </footer>

      {/* Login Overlay */}
      <LoginOverlay isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onGoogleSignIn={() => {
      console.log('Google sign in clicked');
      // Add your Google sign in logic here
      setIsLoginOpen(false);
      onSignIn?.();
    }} onFacebookSignIn={() => {
      console.log('Facebook sign in clicked');
      // Add your Facebook sign in logic here
      setIsLoginOpen(false);
      onSignIn?.();
    }} onEmailSignIn={(email, password) => {
      console.log('Email sign in:', email, password);
      // Add your email sign in logic here
      setIsLoginOpen(false);
      onSignIn?.();
    }} />

      {/* Register Overlay */}
      <RegisterOverlay isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onGoogleSignUp={() => {
      console.log('Google sign up clicked');
      // Add your Google sign up logic here
    }} onFacebookSignUp={() => {
      console.log('Facebook sign up clicked');
      // Add your Facebook sign up logic here
    }} onEmailSignUp={(email, password, firstName, lastName) => {
      console.log('Email sign up:', {
        email,
        password,
        firstName,
        lastName
      });
      // Add your email sign up logic here
      setIsRegisterOpen(false);
    }} />
    </div>;
};