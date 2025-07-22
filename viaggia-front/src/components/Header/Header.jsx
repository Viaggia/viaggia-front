import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/details">Details</Link></li>
          <li><Link to="/payment">Payment</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
