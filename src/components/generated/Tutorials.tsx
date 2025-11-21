import React, { useState } from 'react';
import { Play, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import { Footer } from './Footer';
type Tutorial = {
  id: number;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
};
type VideoCardProps = {
  tutorial: Tutorial;
  index: number;
};
const TUTORIALS: Tutorial[] = [{
  id: 1,
  title: 'Getting Started with Interium',
  category: 'Getting Started',
  description: 'Learn the basics of navigating the Interium interface and setting up your first project.',
  videoUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  duration: '3:45',
  level: 'Beginner'
}, {
  id: 2,
  title: 'Scanning Your Room',
  category: 'Scanning',
  description: 'Step-by-step guide to capturing accurate 3D scans of your interior spaces using your device.',
  videoUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop',
  duration: '5:20',
  level: 'Beginner'
}, {
  id: 3,
  title: 'Importing 3D Models',
  category: 'Import',
  description: 'Import and process your scanned data to create editable 3D models in the workspace.',
  videoUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
  duration: '4:15',
  level: 'Intermediate'
}, {
  id: 4,
  title: 'Working with the Canvas Tool',
  category: 'Design',
  description: 'Master the canvas tool to create accurate floor plans and spatial measurements.',
  videoUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
  duration: '6:30',
  level: 'Intermediate'
}, {
  id: 5,
  title: 'Adding Furniture & Decor',
  category: 'Design',
  description: 'Browse our extensive library and place furniture and decorative elements in your space.',
  videoUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop',
  duration: '7:45',
  level: 'Beginner'
}, {
  id: 6,
  title: 'Material & Texture Editing',
  category: 'Design',
  description: 'Change wall colors, flooring materials, and apply realistic textures to surfaces.',
  videoUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1000&auto=format&fit=crop',
  duration: '5:50',
  level: 'Intermediate'
}, {
  id: 7,
  title: 'Lighting & Rendering',
  category: 'Advanced',
  description: 'Set up realistic lighting scenarios and render high-quality images of your designs.',
  videoUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop',
  duration: '8:20',
  level: 'Advanced'
}, {
  id: 8,
  title: 'Exporting Your Project',
  category: 'Export',
  description: 'Export your designs in various formats including CAD files, images, and 3D models.',
  videoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
  duration: '4:00',
  level: 'Beginner'
}, {
  id: 9,
  title: 'Collaboration Features',
  category: 'Advanced',
  description: 'Share projects with team members and collaborate in real-time on design decisions.',
  videoUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop',
  duration: '6:10',
  level: 'Advanced'
}];
const categories = ['All', 'Getting Started', 'Scanning', 'Import', 'Design', 'Advanced', 'Export'];
const VideoCard = ({
  tutorial,
  index
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: index * 0.05
  }} className="group cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
        <img src={tutorial.videoUrl} alt={tutorial.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
        
        <motion.div className="absolute inset-0 flex items-center justify-center" animate={{
        scale: isHovered ? 1.1 : 1
      }} transition={{
        duration: 0.2
      }}>
          <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
            <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
          </div>
        </motion.div>

        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs rounded flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {tutorial.duration}
        </div>

        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
          {tutorial.level}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-primary tracking-wide uppercase">
          {tutorial.category}
        </p>
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {tutorial.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tutorial.description}
        </p>
      </div>
    </motion.div>;
};

// @component: VideoTutorialsPage
export const VideoTutorialsPage = ({ onNavigateHome, onNavigateBlog, onNavigateContact, onOpenLogin, onOpenRegister }: { onNavigateHome?: () => void; onNavigateBlog?: () => void; onNavigateContact?: () => void; onOpenLogin?: () => void; onOpenRegister?: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTutorials = TUTORIALS.filter(tutorial => {
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // @return
  return <div className="min-h-screen bg-background">
      <Header onNavigateHome={onNavigateHome} onNavigateBlog={onNavigateBlog} onNavigateContact={onNavigateContact} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-sm font-semibold text-primary tracking-wide uppercase mb-4">
            VIDEO TUTORIALS
          </motion.p>
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Learn How to Use Interium
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="text-lg text-muted-foreground">
            Watch step-by-step video guides to master every feature of our interior design software.
          </motion.p>
        </div>
      </section>

      {/* Tutorial Grid Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder="Search tutorials..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={cn("px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all", selectedCategory === category ? "bg-primary text-white" : "bg-background text-foreground hover:bg-muted")}>
                    {category}
                  </button>)}
              </div>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map((tutorial, index) => <VideoCard key={tutorial.id} tutorial={tutorial} index={index} />)}
            </div>

            {/* Empty State */}
            {filteredTutorials.length === 0 && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No tutorials found matching your search.
                </p>
              </motion.div>}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};