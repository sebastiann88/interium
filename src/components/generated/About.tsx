import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import profileImage from '../../assets/images/sebastian-nadeau.png';

// Animation variants
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// @component: AboutPage
export const AboutPage = ({ onNavigateHome, onNavigateBlog, onNavigateContact, onOpenLogin, onOpenRegister }: { onNavigateHome?: () => void; onNavigateBlog?: () => void; onNavigateContact?: () => void; onOpenLogin?: () => void; onOpenRegister?: () => void }) => {
  return <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Header onNavigateHome={onNavigateHome} onNavigateBlog={onNavigateBlog} onNavigateContact={onNavigateContact} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />
      
      <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer} className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium uppercase tracking-wider">
              About Us
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-gray-500">Envisioning</span><br /><span style={{color: "#1e9cf0"}}>Interior Spaces.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Built by a designer who understood the problem firsthand.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image Side */}
            <motion.div initial={{
            opacity: 0,
            x: -40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            ease: "easeOut"
          }} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-xl">
                <img src={profileImage} alt="Sebastian Nadeau, Founder of Interium" className="w-full h-full object-cover" />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg">
                  <h3 className="text-xl font-bold text-foreground">Sebastian Nadeau</h3>
                  <p className="text-primary font-medium">Founder & CEO</p>
                  <div className="flex gap-4 mt-4 pt-4 border-t border-border/50">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Globe size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div initial={{
            opacity: 0,
            x: 40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2
          }} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Making design accessible to everyone.
              </h2>

              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I started Interium because I was frustrated with the complexity of existing design tools. As a product designer, I spent years working with software that felt like it was built for engineers, not creators.
                </p>
                <p>
                  The idea was simple: <span className="text-foreground font-semibold">what if professional 3D design could be as intuitive as sketching on paper?</span> That question led to two years of development and the birth of Interium.
                </p>
                <p>
                  Today, we're helping thousands of designers, architects, and homeowners bring their visions to life without the steep learning curve of traditional CAD software.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <div className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium">
                  Product Designer
                </div>
                <div className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium">
                  Self-Taught Developer
                </div>
                <div className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium">
                  Design Advocate
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{
            number: "4.8",
            label: "App Store Rating"
          }, {
            number: "2M+",
            label: "Rooms Scanned"
          }, {
            number: "150k",
            label: "Active Designers"
          }, {
            number: "24/7",
            label: "Support Available"
          }].map((stat, i) => <motion.div key={i} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }}>
                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to redesign your world?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join 150,000+ designers who have already switched to Interium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 transition-all">
                Get Started for Free
              </button>
              <button className="bg-background border border-border text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-muted transition-colors">
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
      
      <Footer />
    </div>;
};