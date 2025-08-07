import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
    nameid: string
    name: string
    email: string
    role: string
    exp: number
}


export function getUserIdFromToken(token: string): number | null {
    try {
        const decoded: any = jwtDecode(token)
        const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        return userId ? parseInt(userId) : null
    } catch {
        return null
    }
}

export function getRoleFromToken(token: string): string | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
  } catch {
    return null;
  }
}
