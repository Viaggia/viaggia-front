import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';


function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <div className="d-flex flex-column min-vh-100">
          <Router>
            <Header />
            <main className="flex-grow-1">
              <AppRoutes />
            </main>
            <Footer />
          </Router>
        </div>
      </LocalizationProvider>
    </AuthProvider>
  );
}


export default App
