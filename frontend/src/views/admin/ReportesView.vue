<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Reportes y Estadísticas</h1>

    <!-- Filtros de fecha -->
    <div class="card mb-6">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
          <input 
            v-model="dateRange.start" 
            type="date" 
            class="input-field"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
          <input 
            v-model="dateRange.end" 
            type="date" 
            class="input-field"
          >
        </div>
        <button @click="generateReport" class="btn-primary">
          Generar Reporte
        </button>
      </div>
    </div>

    <!-- Resumen de estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.totalPrestamos }}</div>
        <div class="text-sm text-gray-600">Total Préstamos</div>
        <div class="text-xs text-green-600 mt-1">+12% vs mes anterior</div>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl font-bold text-green-600 mb-2">${{ formatMoney(stats.montoTotal) }}</div>
        <div class="text-sm text-gray-600">Monto Total Prestado</div>
        <div class="text-xs text-green-600 mt-1">+8% vs mes anterior</div>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl font-bold text-blue-600 mb-2">${{ formatMoney(stats.ingresosPorIntereses) }}</div>
        <div class="text-sm text-gray-600">Ingresos por Intereses</div>
        <div class="text-xs text-green-600 mt-1">+15% vs mes anterior</div>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl font-bold text-purple-600 mb-2">{{ stats.tasaMorosidad }}%</div>
        <div class="text-sm text-gray-600">Tasa de Morosidad</div>
        <div class="text-xs text-red-600 mt-1">+2% vs mes anterior</div>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="grid lg:grid-cols-2 gap-8 mb-8">
      <!-- Gráfico de préstamos por mes -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Préstamos por Mes</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <p class="text-gray-500">Gráfico de barras</p>
            <p class="text-sm text-gray-400">Integración con Chart.js pendiente</p>
          </div>
        </div>
      </div>

      <!-- Gráfico de estados de préstamos -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Estado de Préstamos</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/>
            </svg>
            <p class="text-gray-500">Gráfico circular</p>
            <p class="text-sm text-gray-400">Integración con Chart.js pendiente</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablas de reportes -->
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Top clientes -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Top 5 Clientes</h3>
        <div class="space-y-3">
          <div v-for="cliente in topClientes" :key="cliente.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-primary-600 text-sm font-medium">
                  {{ getInitials(cliente.nombre) }}
                </span>
              </div>
              <div>
                <p class="font-medium text-sm">{{ cliente.nombre }}</p>
                <p class="text-xs text-gray-500">{{ cliente.prestamos }} préstamos</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-sm">${{ formatMoney(cliente.montoTotal) }}</p>
              <p class="text-xs text-gray-500">Total prestado</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Préstamos recientes -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Préstamos Recientes</h3>
        <div class="space-y-3">
          <div v-for="prestamo in prestamosRecientes" :key="prestamo.id" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-sm">{{ prestamo.cliente }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(prestamo.fecha) }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-sm">${{ formatMoney(prestamo.monto) }}</p>
              <span 
                class="text-xs px-2 py-1 rounded-full"
                :class="getStatusClass(prestamo.estado)"
              >
                {{ prestamo.estado }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de exportación -->
    <div class="mt-8 flex gap-4 justify-center">
      <button @click="exportToPDF" class="btn-primary">
        📄 Exportar PDF
      </button>
      <button @click="exportToExcel" class="btn-secondary">
        📊 Exportar Excel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportesView',
  data() {
    return {
      dateRange: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      stats: {
        totalPrestamos: 156,
        montoTotal: 2450000,
        ingresosPorIntereses: 245000,
        tasaMorosidad: 3.2
      },
      topClientes: [
        { id: 1, nombre: 'Juan Pérez', prestamos: 3, montoTotal: 150000 },
        { id: 2, nombre: 'María García', prestamos: 2, montoTotal: 120000 },
        { id: 3, nombre: 'Carlos López', prestamos: 4, montoTotal: 95000 },
        { id: 4, nombre: 'Ana Rodríguez', prestamos: 1, montoTotal: 80000 },
        { id: 5, nombre: 'Luis Martínez', prestamos: 2, montoTotal: 75000 }
      ],
      prestamosRecientes: [
        { id: 1, cliente: 'Pedro Sánchez', monto: 45000, estado: 'activo', fecha: new Date() },
        { id: 2, cliente: 'Laura Gómez', monto: 32000, estado: 'pendiente', fecha: new Date(Date.now() - 86400000) },
        { id: 3, cliente: 'Diego Torres', monto: 28000, estado: 'activo', fecha: new Date(Date.now() - 172800000) },
        { id: 4, cliente: 'Sofia Herrera', monto: 55000, estado: 'pagado', fecha: new Date(Date.now() - 259200000) },
        { id: 5, cliente: 'Roberto Silva', monto: 40000, estado: 'activo', fecha: new Date(Date.now() - 345600000) }
      ]
    }
  },
  methods: {
    generateReport() {
      // Lógica para generar reporte con fechas seleccionadas
      console.log('Generando reporte desde', this.dateRange.start, 'hasta', this.dateRange.end)
      // Aquí se haría la llamada al backend
    },
    exportToPDF() {
      // Lógica para exportar a PDF
      console.log('Exportando a PDF...')
      alert('Funcionalidad de exportación a PDF en desarrollo')
    },
    exportToExcel() {
      // Lógica para exportar a Excel
      console.log('Exportando a Excel...')
      alert('Funcionalidad de exportación a Excel en desarrollo')
    },
    formatMoney(amount) {
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date(date))
    },
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    },
    getStatusClass(status) {
      const classes = {
        'activo': 'bg-green-100 text-green-800',
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'pagado': 'bg-blue-100 text-blue-800',
        'vencido': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>