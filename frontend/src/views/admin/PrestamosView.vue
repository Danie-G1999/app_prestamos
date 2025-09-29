<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Gestión de Préstamos</h1>
      <button 
        @click="showCreateForm = true"
        class="btn-primary"
      >
        Nuevo Préstamo
      </button>
    </div>

    <!-- Formulario de creación de préstamo -->
    <div v-if="showCreateForm" class="card mb-8">
      <h2 class="text-xl font-semibold mb-4">Crear Nuevo Préstamo</h2>
      <form @submit.prevent="createPrestamo" class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <input 
            v-model="newPrestamo.cliente" 
            type="text" 
            required
            class="input-field"
            placeholder="Nombre del cliente"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Monto</label>
          <input 
            v-model="newPrestamo.monto" 
            type="number" 
            required
            class="input-field"
            placeholder="0.00"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tasa de Interés (%)</label>
          <input 
            v-model="newPrestamo.tasaInteres" 
            type="number" 
            step="0.01"
            required
            class="input-field"
            placeholder="0.00"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Plazo (meses)</label>
          <input 
            v-model="newPrestamo.plazo" 
            type="number" 
            required
            class="input-field"
            placeholder="12"
          >
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea 
            v-model="newPrestamo.descripcion" 
            class="input-field"
            rows="3"
            placeholder="Descripción del préstamo"
          ></textarea>
        </div>
        
        <div class="md:col-span-2 flex gap-4">
          <button type="submit" class="btn-primary">
            Crear Préstamo
          </button>
          <button 
            type="button" 
            @click="cancelCreate"
            class="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de préstamos -->
    <div class="grid gap-6">
      <div v-if="prestamos.length === 0" class="card text-center">
        <p class="text-gray-500">No hay préstamos registrados aún.</p>
      </div>
      
      <div 
        v-for="prestamo in prestamos" 
        :key="prestamo.id"
        class="card"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ prestamo.cliente }}</h3>
            <p class="text-gray-600">{{ prestamo.descripcion }}</p>
            <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span class="font-medium">Monto:</span>
                <span class="block text-lg font-bold text-primary-600">
                  ${{ formatMoney(prestamo.monto) }}
                </span>
              </div>
              <div>
                <span class="font-medium">Tasa:</span>
                <span class="block">{{ prestamo.tasaInteres }}%</span>
              </div>
              <div>
                <span class="font-medium">Plazo:</span>
                <span class="block">{{ prestamo.plazo }} meses</span>
              </div>
              <div>
                <span class="font-medium">Estado:</span>
                <span 
                  class="block px-2 py-1 rounded text-xs font-medium"
                  :class="getEstadoClass(prestamo.estado)"
                >
                  {{ prestamo.estado }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="text-blue-600 hover:text-blue-800">Editar</button>
            <button class="text-red-600 hover:text-red-800">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PrestamosView',
  data() {
    return {
      showCreateForm: false,
      newPrestamo: {
        cliente: '',
        monto: '',
        tasaInteres: '',
        plazo: '',
        descripcion: ''
      }
    }
  },
  computed: {
    ...mapState(['prestamos'])
  },
  methods: {
    ...mapActions(['fetchPrestamos', 'createPrestamo']),
    async createPrestamo() {
      try {
        await this.createPrestamo({
          ...this.newPrestamo,
          estado: 'activo',
          fechaCreacion: new Date().toISOString()
        })
        this.cancelCreate()
      } catch (error) {
        console.error('Error creating prestamo:', error)
      }
    },
    cancelCreate() {
      this.showCreateForm = false
      this.newPrestamo = {
        cliente: '',
        monto: '',
        tasaInteres: '',
        plazo: '',
        descripcion: ''
      }
    },
    formatMoney(amount) {
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    },
    getEstadoClass(estado) {
      switch (estado) {
        case 'activo':
          return 'bg-green-100 text-green-800'
        case 'pagado':
          return 'bg-blue-100 text-blue-800'
        case 'vencido':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  },
  mounted() {
    this.fetchPrestamos()
  }
}
</script>