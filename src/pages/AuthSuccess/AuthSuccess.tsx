import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getUserIdFromToken } from '../../utils/jwt'
import { getUserById } from '../../services/userService'

function AuthSuccess() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (token) {
        localStorage.setItem('token', token)

        const userId = getUserIdFromToken(token)
        if (userId) {
          try {
            const user = await getUserById(userId)
            setUser({ ...user, isGoogleAccount: true }) // 👈 Aqui marcamos que veio do Google
            navigate('/')
          } catch {
            localStorage.removeItem('token')
            setUser(null)
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
  }, [navigate, setUser])

  return <p className="text-center mt-5">Autenticando com Google...</p>
}

export default AuthSuccess
