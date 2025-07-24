import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'
import SearchSection from './components/Search/Search'
import HospedagemCards from './components/cards/HospedagemCards'
import Details from './pages/Details/Details.jsx'


function App() {
  return (
    <Router>
      <Header />
      <SearchSection />
      <HospedagemCards />
      <AppRoutes />
      <Details />
    </Router>
  )


}
export default App