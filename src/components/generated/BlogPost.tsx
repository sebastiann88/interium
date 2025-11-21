"use client";

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ArrowLeft, Calendar, Tag, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
type Author = {
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
};
type BlogPostData = {
  id: string;
  imageUrl: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  readTime?: string;
};
type RelatedPost = {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  category: string;
  excerpt?: string;
};
export interface BlogPostProps {
  post?: BlogPostData;
  relatedPosts?: RelatedPost[];
  onBackToGrid?: () => void;
  onNavigateHome?: () => void;
  onNavigateBlog?: () => void;
  onNavigateContact?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

// Default blog post data
const defaultPost: BlogPostData = {
  id: '1',
  imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  date: 'Mar 16, 2024',
  category: 'Living Room',
  title: 'Modern Minimalist Living Room Design',
  excerpt: 'Discover how to create a serene and sophisticated living space with clean lines, neutral palettes, and carefully curated furniture pieces that maximize both style and functionality.',
  content: `
    <p>The modern minimalist living room represents the perfect balance between aesthetic beauty and functional simplicity. In today's fast-paced world, creating a space that offers both visual calm and practical utility has become increasingly important for homeowners seeking refuge from daily chaos.</p>

    <h2>Understanding Minimalist Design Principles</h2>
    <p>At its core, minimalism is about intentionality. Every piece of furniture, every decorative element, and every color choice should serve a purpose. This doesn't mean your space needs to be stark or cold – quite the opposite. When done correctly, minimalist design creates warmth through carefully selected pieces that each tell their own story.</p>

    <p>The key to successful minimalist design lies in understanding the fundamental principles that guide this aesthetic philosophy. These principles include simplicity, functionality, clean lines, neutral color palettes, and the strategic use of negative space.</p>

    <h2>Choosing the Right Color Palette</h2>
    <p>A minimalist living room typically features a neutral color palette as its foundation. Think soft whites, warm grays, beiges, and earth tones. These colors create a serene backdrop that allows your carefully selected furniture pieces and artwork to truly shine.</p>

    <p>However, this doesn't mean your space needs to be devoid of color. Strategic pops of color through throw pillows, artwork, or a single statement piece can add personality and visual interest without overwhelming the space. Consider incorporating natural materials like wood and stone to add warmth and texture to your neutral palette.</p>

    <h2>Furniture Selection and Placement</h2>
    <p>When selecting furniture for your minimalist living room, quality trumps quantity every time. Invest in well-crafted pieces with clean lines and timeless designs. A sleek sectional sofa in a neutral tone can serve as your room's anchor, while a sculptural coffee table can double as functional art.</p>

    <p>Consider multi-functional furniture pieces that maximize space efficiency. Storage ottomans, nesting tables, and wall-mounted shelving can help maintain the uncluttered aesthetic that's essential to minimalist design. Remember, every piece should earn its place in the room.</p>

    <h2>Lighting as a Design Element</h2>
    <p>Lighting plays a crucial role in minimalist interiors. Natural light should be maximized whenever possible – consider sheer curtains or no window treatments at all if privacy allows. For artificial lighting, choose fixtures with clean, simple designs that complement rather than compete with your overall aesthetic.</p>

    <p>Layer your lighting with a combination of ambient, task, and accent lights. A statement pendant light can serve as both a functional element and a piece of art, while strategically placed floor lamps can create intimate reading nooks without cluttering the space.</p>

    <h2>The Power of Negative Space</h2>
    <p>Perhaps the most important element of minimalist design is what's not there. Negative space – the empty areas in your room – is just as important as the furniture and decor you choose to include. This breathing room allows your eye to rest and creates a sense of openness and tranquility.</p>

    <p>Don't feel pressured to fill every corner or cover every wall. Sometimes the most powerful design statement is restraint. Allow your chosen pieces to stand out by giving them the space they need to make an impact.</p>

    <h2>Bringing It All Together</h2>
    <p>Creating a modern minimalist living room is an exercise in intentionality and restraint. It's about choosing quality over quantity, function over excess, and calm over chaos. By following these principles and trusting your instincts, you can create a living space that's not only beautiful but also serves as a peaceful retreat from the complexities of modern life.</p>

    <p>Remember, minimalism isn't about deprivation – it's about making room for what truly matters. Your living room should reflect your personality and lifestyle while maintaining the clean, uncluttered aesthetic that makes minimalist design so appealing.</p>
  `,
  author: {
    name: 'Michael Foster',
    role: 'Interior Designer',
    avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Michael Foster is an award-winning interior designer with over 15 years of experience creating beautiful, functional spaces. His work has been featured in numerous design publications, and he specializes in modern minimalist aesthetics that prioritize both form and function.'
  },
  readTime: '8 min read'
};
const defaultRelatedPosts: RelatedPost[] = [{
  id: '2',
  imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  title: 'Contemporary Kitchen Renovation Ideas',
  date: 'Mar 15, 2024',
  category: 'Kitchen',
  excerpt: 'Transform your kitchen into a culinary masterpiece with modern cabinetry, smart storage solutions, and timeless design elements that blend form and function seamlessly.'
}, {
  id: '3',
  imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  title: 'Creating the Perfect Bedroom Sanctuary',
  date: 'Mar 14, 2024',
  category: 'Bedroom',
  excerpt: 'Learn expert tips for designing a tranquil bedroom retreat with soothing color schemes, luxurious textiles, and thoughtful lighting that promotes relaxation and restful sleep.'
}, {
  id: '4',
  imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  title: 'Spa-Inspired Bathroom Transformations',
  date: 'Mar 13, 2024',
  category: 'Bathroom',
  excerpt: 'Elevate your daily routine with bathroom designs that incorporate natural materials, elegant fixtures, and calming aesthetics inspired by luxury spa environments.'
}];

// @component: BlogPost
export const BlogPost: React.FC<BlogPostProps> = ({
  post = defaultPost,
  relatedPosts = defaultRelatedPosts,
  onBackToGrid,
  onNavigateHome,
  onNavigateBlog,
  onNavigateContact,
  onOpenLogin,
  onOpenRegister
}) => {
  const handleBackClick = () => {
    if (onBackToGrid) {
      onBackToGrid();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleShare = (platform: string) => {
    // Placeholder for share functionality
    console.log(`Sharing to ${platform}`);
  };
  return <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigateHome={onNavigateHome} onNavigateBlog={onNavigateBlog} onNavigateContact={onNavigateContact} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />
      
      <main className="flex-1 w-full">
        {/* Hero Image Section */}
        <div className="relative w-full bg-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
            <button onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </button>
          </div>
          
          <div className="mx-auto max-w-5xl px-6 lg:px-8 pb-8">
            <img src={post.imageUrl} alt={post.title} className="w-full aspect-[21/9] object-cover rounded-2xl shadow-lg ring-1 ring-gray-900/5" onError={e => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
          }} />
          </div>
        </div>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="bg-gray-50 px-3 py-1 rounded-full font-medium text-gray-700">
                {post.category}
              </span>
            </div>
            {post.readTime && <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <img src={post.author.avatarUrl} alt={post.author.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200" onError={e => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
          }} />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{post.author.name}</p>
              <p className="text-gray-600">{post.author.role}</p>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
              <button onClick={() => handleShare('twitter')} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors" aria-label="Share on Twitter">
                <Twitter className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('facebook')} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1877f2] hover:text-white flex items-center justify-center transition-colors" aria-label="Share on Facebook">
                <Facebook className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('linkedin')} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0077b5] hover:text-white flex items-center justify-center transition-colors" aria-label="Share on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#1DA1F2] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-li:text-gray-700
              prose-img:rounded-xl prose-img:shadow-md" dangerouslySetInnerHTML={{
          __html: post.content
        }} />

          {/* Author Bio Card */}
          {post.author.bio && <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex gap-6">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-300 flex-shrink-0" onError={e => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
            }} />
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    About the Author
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.author.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </div>}
        </article>

        {/* Related Posts Section */}
        {relatedPosts && relatedPosts.length > 0 && <section className="bg-gray-50 py-16 mt-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => <article key={relatedPost.id} className="group cursor-pointer" onClick={() => console.log(`Navigate to post ${relatedPost.id}`)}>
                    <div className="relative w-full mb-4">
                      <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full aspect-[16/9] object-cover rounded-xl shadow-sm ring-1 ring-gray-900/5 group-hover:opacity-90 transition-opacity" onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
                }} />
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <time className="text-gray-500 font-medium">{relatedPost.date}</time>
                      <span className="bg-white px-3 py-1 rounded-full font-medium text-gray-600 ring-1 ring-gray-200">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>}
                  </article>)}
              </div>

              <div className="mt-12 text-center">
                <button onClick={handleBackClick} className="inline-flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium px-8 py-3 rounded-full transition-colors">
                  View All Articles
                </button>
              </div>
            </div>
          </section>}
      </main>

      <Footer />
    </div>;
};