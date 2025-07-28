import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'
import Footer from './components/Footer/Footer'
import PromoBanner from './pages/Banner/PromoBanner'

function App() {


  return (
    <>
      <Router>
        <PromoBanner/>
        <Header />
        <AppRoutes />
        <Footer/>
      </Router>
    </>
  )


}

export default App
