import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/router';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { DirectionProvider } from '@/context/DirectionContext';
import DirectionToggle from '@/components/ui/DirectionToggle';

const App = () => {
  return (
    <ThemeProvider>
      <DirectionProvider>
        <AuthProvider>
          <DirectionToggle />
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
};

export default App;
