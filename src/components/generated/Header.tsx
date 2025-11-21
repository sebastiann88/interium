import React from 'react';
const NavLink = ({
  children,
  href = "#"
}: {
  children: React.ReactNode;
  href?: string;
}) => <a href={href} className="text-[15px] font-bold text-gray-900 hover:text-[#1DA1F2] transition-colors">
    {children}
  </a>;
export interface HeaderProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onNavigateHome?: () => void;
  onNavigateBlog?: () => void;
  onNavigateContact?: () => void;
}
export const Header: React.FC<HeaderProps> = ({
  onOpenLogin,
  onOpenRegister,
  onNavigateHome,
  onNavigateBlog,
  onNavigateContact
}) => {
  return <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between max-w-6xl">
        <button onClick={onNavigateHome} className="text-2xl font-black tracking-tight text-gray-900 hover:opacity-80 transition-opacity" style={{
        color: "#1da1f2"
      }}>Interium</button>
        
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={onNavigateBlog} className="text-[15px] font-bold text-gray-900 hover:text-[#1DA1F2] transition-colors">Blog</button>
          <button onClick={onNavigateContact} className="text-[15px] font-bold text-gray-900 hover:text-[#1DA1F2] transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={onOpenLogin} className="px-4 py-2 text-[15px] font-bold text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            Login
          </button>
          <button onClick={onOpenRegister} className="px-5 py-2 text-[15px] font-bold text-white bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-full transition-colors shadow-sm">
            Register
          </button>
        </div>
      </div>
    </header>;
};
export default Header;