import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  )
}
export default App