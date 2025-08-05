import { createContext, useContext, useEffect, useState } from 'react'
import { getRoleFromToken, getUserIdFromToken } from '../utils/jwt'
import { getUserById } from '../services/userService'
import { User } from '../types/User'

interface AuthContextType {
  user: User | null;
  role: string | null;
  setUser: (user: User | null) => void;
  setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  setUser: () => { },
  setRole: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)

 useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userId = getUserIdFromToken(token)
      const userRole = getRoleFromToken(token)
      setRole(userRole)
      if (userId) {
        getUserById(userId).then(setUser).catch(() => setUser(null))
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
