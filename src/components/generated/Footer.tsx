import React from 'react';
import { MapPin, Mail, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
export const Footer: React.FC = () => {
  return <footer className="bg-gray-900 text-white py-12 md:py-16">
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
    </footer>;
};
export default Footer;