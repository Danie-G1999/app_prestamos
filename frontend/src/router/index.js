import { createRouter, createWebHistory } from 'vue-router'
import requireAuth, { requireGuest } from '../middleware/auth'

// Vistas públicas
import LandingView from '../views/public/LandingView.vue'
import ServiciosView from '../views/public/ServiciosView.vue'
import ContactoView from '../views/public/ContactoView.vue'
import LoginView from '../views/public/LoginView.vue'

// Vistas de administración
import AdminLayout from '../views/admin/AdminLayout.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import PrestamosView from '../views/admin/PrestamosView.vue'
import ClientesView from '../views/admin/ClientesView.vue'
import ReportesView from '../views/admin/ReportesView.vue'

const routes = [
  // Rutas públicas (Landing Page)
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: ServiciosView
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: ContactoView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: requireGuest
  },
  
  // Rutas de administración (protegidas)
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView
      },
      {
        path: 'prestamos',
        name: 'admin-prestamos',
        component: PrestamosView
      },
      {
        path: 'clientes',
        name: 'admin-clientes',
        component: ClientesView
      },
      {
        path: 'reportes',
        name: 'admin-reportes',
        component: ReportesView
      }
    ]
  },
  
  // Ruta de fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router