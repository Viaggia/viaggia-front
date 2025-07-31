import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import PromoBanner from './pages/Banner/PromoBanner'

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Router>
          <PromoBanner/>
        <Header />
          <main className="flex-grow-1">
            <AppRoutes />
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  )
}


export default App
