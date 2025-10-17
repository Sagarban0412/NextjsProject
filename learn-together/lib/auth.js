import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }
  return userId
}

export async function requireRole(requiredRole) {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    redirect('/login')
  }
  
  const userRole = sessionClaims?.publicMetadata?.role || 
                   sessionClaims?.metadata?.role || 
                   sessionClaims?.role || 
                   'user'
  
  console.log('RequireRole - User Role:', userRole, 'Required:', requiredRole)
  
  if (userRole !== requiredRole && !(requiredRole === 'teacher' && userRole === 'admin')) {
    redirect('/')
  }
  
  return { userId, role: userRole }
}

export async function getUserRole() {
  const { sessionClaims } = await auth()
  return sessionClaims?.publicMetadata?.role || 
         sessionClaims?.metadata?.role || 
         sessionClaims?.role || 
         'user'
}