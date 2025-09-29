<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Préstamos</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalPrestamos }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Préstamos Activos</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.prestamosActivos }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Monto Total</p>
            <p class="text-2xl font-semibold text-gray-900">${{ formatMoney(stats.montoTotal) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Clientes</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalClientes }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid lg:grid-cols-2 gap-8 mb-8">
      <!-- Chart -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Préstamos por Mes</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p class="text-gray-500">Gráfico de préstamos mensuales</p>
          <!-- Aquí se puede integrar Chart.js o similar -->
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Actividad Reciente</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm text-gray-900">{{ activity.description }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(activity.date) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h3 class="text-lg font-semibold mb-4">Acciones Rápidas</h3>
      <div class="grid md:grid-cols-4 gap-4">
        <router-link 
          to="/admin/prestamos" 
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <svg class="w-8 h-8 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
          <div>
            <p class="font-medium">Ver Préstamos</p>
            <p class="text-sm text-gray-500">Gestionar todos los préstamos</p>
          </div>
        </router-link>

        <button 
          @click="showNewPrestamoModal = true"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
        >
          <svg class="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          <div>
            <p class="font-medium">Nuevo Préstamo</p>
            <p class="text-sm text-gray-500">Crear un préstamo nuevo</p>
          </div>
        </button>

        <router-link 
          to="/admin/clientes" 
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <svg class="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
          <div>
            <p class="font-medium">Ver Clientes</p>
            <p class="text-sm text-gray-500">Gestionar clientes</p>
          </div>
        </router-link>

        <router-link 
          to="/admin/reportes" 
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <svg class="w-8 h-8 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
          </svg>
          <div>
            <p class="font-medium">Ver Reportes</p>
            <p class="text-sm text-gray-500">Estadísticas y reportes</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Modal para nuevo préstamo (placeholder) -->
    <div v-if="showNewPrestamoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Crear Nuevo Préstamo</h3>
        <p class="text-gray-600 mb-4">Esta funcionalidad te llevará a la página de gestión de préstamos.</p>
        <div class="flex gap-4">
          <router-link to="/admin/prestamos" class="btn-primary flex-1 text-center">
            Ir a Préstamos
          </router-link>
          <button @click="showNewPrestamoModal = false" class="btn-secondary flex-1">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'DashboardView',
  data() {
    return {
      showNewPrestamoModal: false,
      recentActivity: [
        {
          id: 1,
          description: 'Nuevo préstamo creado para Juan Pérez',
          date: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
        },
        {
          id: 2,
          description: 'Pago recibido de María García',
          date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 horas atrás
        },
        {
          id: 3,
          description: 'Cliente nuevo registrado: Carlos López',
          date: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 horas atrás
        },
        {
          id: 4,
          description: 'Préstamo completado para Ana Rodríguez',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 día atrás
        }
      ]
    }
  },
  computed: {
    ...mapState(['prestamos']),
    ...mapGetters(['totalPrestamos', 'prestamosActivos']),
    stats() {
      const totalPrestamos = this.prestamos.length
      const prestamosActivos = this.prestamos.filter(p => p.estado === 'activo').length
      const montoTotal = this.prestamos.reduce((total, prestamo) => total + parseFloat(prestamo.monto || 0), 0)
      const clientesUnicos = new Set(this.prestamos.map(p => p.cliente)).size
      
      return {
        totalPrestamos,
        prestamosActivos,
        montoTotal,
        totalClientes: clientesUnicos
      }
    }
  },
  methods: {
    ...mapActions(['fetchPrestamos']),
    formatMoney(amount) {
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    },
    formatDate(date) {
      return new Intl.RelativeTimeFormat('es', { numeric: 'auto' }).format(
        Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
        'day'
      )
    }
  },
  async mounted() {
    // Cargar datos iniciales
    await this.fetchPrestamos()
  }
}
</script>