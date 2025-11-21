import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { Home } from './components/generated/Home';
import { Stage } from './components/generated/Stage';

const theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
const container: Container = 'none';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'stage'>('home');

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const handleSignIn = () => {
    setCurrentView('stage');
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
  };

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (currentView === 'stage') {
      return <Stage onNavigateHome={handleNavigateHome} />;
    }
    return <Home onSignIn={handleSignIn} />;
  }, [currentView]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;