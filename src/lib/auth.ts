import bcrypt from 'bcryptjs'

const DASHBOARD_USERNAME = process.env.DASHBOARD_USERNAME
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  if (!DASHBOARD_USERNAME || !DASHBOARD_PASSWORD) {
    console.error('Dashboard credentials not configured')
    return false
  }

  if (email !== DASHBOARD_USERNAME) {
    return false
  }

  return password === DASHBOARD_PASSWORD
}

export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}
