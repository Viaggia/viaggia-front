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

