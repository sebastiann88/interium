import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
type Author = {
  name: string;
  role: string;
  avatarUrl: string;
};
type BlogPost = {
  id: string;
  imageUrl: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  author: Author;
};
const authors: Record<string, Author> = {
  michael: {
    name: 'Michael Foster',
    role: 'Interior Designer',
    avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
};
const allBlogPosts: BlogPost[] = [{
  id: '1',
  imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 16, 2024',
  category: 'Living Room',
  title: 'Modern Minimalist Living Room Design',
  excerpt: 'Discover how to create a serene and sophisticated living space with clean lines, neutral palettes, and carefully curated furniture pieces that maximize both style and functionality.',
  author: authors.michael
}, {
  id: '2',
  imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 15, 2024',
  category: 'Kitchen',
  title: 'Contemporary Kitchen Renovation Ideas',
  excerpt: 'Transform your kitchen into a culinary masterpiece with modern cabinetry, smart storage solutions, and timeless design elements that blend form and function seamlessly.',
  author: authors.michael
}, {
  id: '3',
  imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 14, 2024',
  category: 'Bedroom',
  title: 'Creating the Perfect Bedroom Sanctuary',
  excerpt: 'Learn expert tips for designing a tranquil bedroom retreat with soothing color schemes, luxurious textiles, and thoughtful lighting that promotes relaxation and restful sleep.',
  author: authors.michael
}, {
  id: '4',
  imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 13, 2024',
  category: 'Bathroom',
  title: 'Spa-Inspired Bathroom Transformations',
  excerpt: 'Elevate your daily routine with bathroom designs that incorporate natural materials, elegant fixtures, and calming aesthetics inspired by luxury spa environments.',
  author: authors.michael
}, {
  id: '5',
  imageUrl: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 12, 2024',
  category: 'Home Office',
  title: 'Productive Home Office Design Solutions',
  excerpt: 'Maximize productivity and creativity with ergonomic furniture, smart organization systems, and inspiring design choices that make working from home a pleasure.',
  author: authors.michael
}, {
  id: '6',
  imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 11, 2024',
  category: 'Lighting',
  title: 'Layered Lighting Design Techniques',
  excerpt: 'Master the art of illumination with strategic placement of ambient, task, and accent lighting to create depth, mood, and visual interest in any room.',
  author: authors.michael
}, {
  id: '7',
  imageUrl: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 10, 2024',
  category: 'Color Theory',
  title: 'Choosing the Perfect Color Palette',
  excerpt: 'Explore color psychology and expert techniques for selecting harmonious color schemes that reflect your personal style and enhance the atmosphere of your home.',
  author: authors.michael
}, {
  id: '8',
  imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 9, 2024',
  category: 'Small Spaces',
  title: 'Smart Storage for Compact Living',
  excerpt: 'Unlock the potential of small spaces with innovative storage solutions, multi-functional furniture, and design tricks that make every square foot count.',
  author: authors.michael
}, {
  id: '9',
  imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 8, 2024',
  category: 'Outdoor Living',
  title: 'Outdoor Living Space Inspiration',
  excerpt: 'Extend your living area outdoors with stylish patio furniture, cozy fire features, and weather-resistant design elements that create an inviting alfresco retreat.',
  author: authors.michael
}];
const POSTS_PER_PAGE = 6;

// @component: BlogGrid
export const BlogGrid = ({ onNavigateHome, onNavigateBlog, onNavigateContact, onOpenLogin, onOpenRegister, onViewPost }: { onNavigateHome?: () => void; onNavigateBlog?: () => void; onNavigateContact?: () => void; onOpenLogin?: () => void; onOpenRegister?: () => void; onViewPost?: (postId: string) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, endIndex);
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateBlog={onNavigateBlog} onNavigateContact={onNavigateContact} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} activePage="blog" />
      
      <main className="flex-1 bg-white py-12 sm:py-16 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {currentPosts.map(post => <article key={post.id} className="flex flex-col items-start justify-between group cursor-pointer" onClick={() => onViewPost?.(post.id)}>
                <div className="relative w-full">
                  <img src={post.imageUrl} alt={post.title} className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:opacity-90 transition-opacity duration-300 shadow-sm ring-1 ring-gray-900/5" onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
              }} />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl w-full mt-8">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500 font-medium">
                      {post.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      {post.category}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img src={post.author.avatarUrl} alt={post.author.name} className="h-10 w-10 rounded-full bg-gray-100 object-cover ring-1 ring-gray-200" onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
                }} />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {post.author.name}
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>)}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors" aria-label="Previous page">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({
              length: totalPages
            }, (_, i) => i + 1).map(page => <button key={page} onClick={() => handlePageClick(page)} className={`flex items-center justify-center w-10 h-10 rounded-full font-medium transition-colors ${currentPage === page ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`} aria-label={`Go to page ${page}`} aria-current={currentPage === page ? 'page' : undefined}>
                  {page}
                </button>)}
            </div>

            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors" aria-label="Next page">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};