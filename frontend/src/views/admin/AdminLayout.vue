<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out" 
         :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">
      
      <!-- Logo -->
      <div class="flex items-center justify-center h-16 px-4 bg-primary-600">
        <h1 class="text-xl font-bold text-white">💰 Admin Panel</h1>
      </div>

      <!-- Navigation -->
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link 
            to="/admin" 
            exact-active-class="bg-primary-50 text-primary-600 border-r-2 border-primary-600"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            Dashboard
          </router-link>

          <router-link 
            to="/admin/prestamos" 
            active-class="bg-primary-50 text-primary-600 border-r-2 border-primary-600"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
            Préstamos
          </router-link>

          <router-link 
            to="/admin/clientes" 
            active-class="bg-primary-50 text-primary-600 border-r-2 border-primary-600"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            Clientes
          </router-link>

          <router-link 
            to="/admin/reportes" 
            active-class="bg-primary-50 text-primary-600 border-r-2 border-primary-600"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            Reportes
          </router-link>
        </div>
      </nav>

      <!-- Usuario info -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {{ currentUser?.nombre ? currentUser.nombre.charAt(0).toUpperCase() : 'A' }}
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-700">{{ currentUser?.nombre || 'Administrador' }}</p>
            <p class="text-xs text-gray-500">{{ currentUser?.email || 'admin@prestafacil.com' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:ml-64">
      <!-- Top bar -->
      <header class="bg-white shadow-sm border-b">
        <div class="flex items-center justify-between px-4 py-4">
          <!-- Mobile menu button -->
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- Page title -->
          <div class="flex-1">
            <h1 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h1>
          </div>

          <!-- User menu -->
          <div class="relative">
            <button 
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {{ currentUser?.nombre ? currentUser.nombre.charAt(0).toUpperCase() : 'A' }}
              </div>
            </button>

            <!-- Dropdown menu -->
            <div v-if="userMenuOpen" 
                 class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                 @click="userMenuOpen = false">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Perfil</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuración</a>
              <hr class="my-1">
              <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver sitio público</router-link>
              <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" 
         @click="sidebarOpen = false"
         class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminLayout',
  data() {
    return {
      sidebarOpen: false,
      userMenuOpen: false
    }
  },
  computed: {
    ...mapState(['usuario']),
    ...mapGetters(['currentUser']),
    pageTitle() {
      const routeNames = {
        'dashboard': 'Dashboard',
        'admin-prestamos': 'Gestión de Préstamos',
        'admin-clientes': 'Gestión de Clientes',
        'admin-reportes': 'Reportes y Estadísticas'
      }
      return routeNames[this.$route.name] || 'Panel de Administración'
    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  },
  mounted() {
    // Verificar autenticación al montar el componente
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  }
}
</script>