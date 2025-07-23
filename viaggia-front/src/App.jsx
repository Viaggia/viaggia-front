import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header.jsx'
import AppRoutes from './routes/Router/AppRoutes'
import SearchSection from './components/Search/Search.jsx'
import HospedagemCards from './components/cards/HospedagemCards.jsx'


function App() {
  return (
    <Router>
      <Header />
      <SearchSection />
      <HospedagemCards />
      <AppRoutes />
    </Router>
  )


}
export default App