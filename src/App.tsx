import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { Home } from './components/generated/Home';
import { Stage } from './components/generated/Stage';
import { BlogGrid } from './components/generated/Blog';
import { ContactPage } from './components/generated/Contact';
import { LoginOverlay } from './components/generated/LoginOverlay';
import { RegisterOverlay } from './components/generated/RegisterOverlay';

const theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
const container: Container = 'none';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'stage' | 'blog' | 'contact'>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleSignIn = () => {
    setIsLoginOpen(false);
    setCurrentView('stage');
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
  };

  const handleNavigateBlog = () => {
    setCurrentView('blog');
  };

  const handleNavigateContact = () => {
    setCurrentView('contact');
  };

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (currentView === 'stage') {
      return <Stage onNavigateHome={handleNavigateHome} onNavigateBlog={handleNavigateBlog} onNavigateContact={handleNavigateContact} onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />;
    }
    if (currentView === 'blog') {
      return <BlogGrid onNavigateHome={handleNavigateHome} onNavigateBlog={handleNavigateBlog} onNavigateContact={handleNavigateContact} onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />;
    }
    if (currentView === 'contact') {
      return <ContactPage onNavigateHome={handleNavigateHome} onNavigateBlog={handleNavigateBlog} onNavigateContact={handleNavigateContact} onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />;
    }
    return <Home onNavigateBlog={handleNavigateBlog} onNavigateContact={handleNavigateContact} onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />;
  }, [currentView]);

  if (container === 'centered') {
    return (
      <>
        <div className="h-full w-full flex flex-col items-center justify-center">
          {generatedComponent}
        </div>
        
        {/* Global Login/Register Overlays */}
        <LoginOverlay 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onGoogleSignIn={handleSignIn}
          onFacebookSignIn={handleSignIn}
          onEmailSignIn={(email, password) => {
            console.log('Email sign in:', email, password);
            handleSignIn();
          }}
        />
        <RegisterOverlay 
          isOpen={isRegisterOpen} 
          onClose={() => setIsRegisterOpen(false)} 
          onGoogleSignUp={() => {
            console.log('Google sign up clicked');
            setIsRegisterOpen(false);
            setCurrentView('stage');
          }}
          onFacebookSignUp={() => {
            console.log('Facebook sign up clicked');
            setIsRegisterOpen(false);
            setCurrentView('stage');
          }}
          onEmailSignUp={(email, password, firstName, lastName) => {
            console.log('Email sign up:', { email, password, firstName, lastName });
            setIsRegisterOpen(false);
            setCurrentView('stage');
          }}
        />
      </>
    );
  } else {
    return (
      <>
        {generatedComponent}
        
        {/* Global Login/Register Overlays */}
        <LoginOverlay 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onGoogleSignIn={handleSignIn}
          onFacebookSignIn={handleSignIn}
          onEmailSignIn={(email, password) => {
            console.log('Email sign in:', email, password);
            handleSignIn();
          }}
        />
        <RegisterOverlay 
          isOpen={isRegisterOpen} 
          onClose={() => setIsRegisterOpen(false)} 
          onGoogleSignUp={() => {
            console.log('Google sign up clicked');
            setIsRegisterOpen(false);
            setCurrentView('stage');
          }}
          onFacebookSignUp={() => {
            console.log('Facebook sign up clicked');
            setIsRegisterOpen(false);
            setCurrentView('stage');
          }}
          onEmailSignUp={(email, password, firstName, lastName) => {
            console.log('Email sign up:', { email, password, firstName, lastName });
            setIsRegisterOpen(false);
            setCurrentView('stage');
          }}
        />
      </>
    );
  }
}

export default App;