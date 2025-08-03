import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getRoleFromToken, getUserIdFromToken } from '../../utils/jwt'
import { getUserById } from '../../services/userService'

function AuthSuccess() {
  const navigate = useNavigate()
 const { setUser, setRole } = useAuth()

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (token) {
        localStorage.setItem('token', token)

        const userId = getUserIdFromToken(token)
        const userRole = getRoleFromToken(token)

        setRole(userRole)

        if (userId) {
          try {
            const user = await getUserById(userId)
            setUser({ ...user, isGoogleAccount: true })
            navigate('/')
          } catch {
            localStorage.removeItem('token')
            setUser(null)
            setRole(null)
            navigate('/login')
          }
        } else {
          navigate('/login')
        }
      } else {
        navigate('/login')
      }
    }

    handleAuth()
  }, [navigate, setUser, setRole])

  return <p className="text-center mt-5">Autenticando com Google...</p>
}

export default AuthSuccess
