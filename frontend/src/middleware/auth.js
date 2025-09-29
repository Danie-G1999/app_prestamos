export default function requireAuth(to, from, next) {
  const token = localStorage.getItem('token')
  
  if (token) {
    // Verificar si el token es válido (esto se puede hacer con una llamada al servidor)
    next()
  } else {
    // Redirigir al login si no está autenticado
    next('/login')
  }
}

export function requireGuest(to, from, next) {
  const token = localStorage.getItem('token')
  
  if (!token) {
    next()
  } else {
    // Si ya está autenticado, redirigir al admin
    next('/admin')
  }
}