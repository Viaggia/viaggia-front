import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function GoogleCallback() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://localhost:7164/api/Accounts/google-callback', {
          credentials: 'include',
        })

        const data = await response.json()

        if (data.token) {
          localStorage.setItem('token', data.token)
          setUser(data.user)
          navigate('/')
        } else {
          navigate('/register', { state: { userData: data } })
        }
      } catch (error) {
        console.error('Erro ao processar login com Google:', error)
        navigate('/login')
      }
    }

    fetchUserData()
  }, [navigate, setUser])

  return <p className="text-center mt-5">Processando login com Google...</p>
}

export default GoogleCallback
