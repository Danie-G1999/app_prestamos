<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Gestión de Préstamos</h1>
        <p class="text-gray-600 mt-1">{{ prestamos.length }} préstamo{{ prestamos.length !== 1 ? 's' : '' }} registrado{{ prestamos.length !== 1 ? 's' : '' }}</p>
      </div>
      <button 
        @click="showCreateForm = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
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
    <div class="space-y-6">
      <div v-if="prestamos.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay préstamos</h3>
        <p class="mt-1 text-sm text-gray-500">Comienza creando tu primer préstamo.</p>
        <div class="mt-6">
          <button @click="showCreateForm = true" class="btn-primary">
            Crear Primer Préstamo
          </button>
        </div>
      </div>
      
      <div 
        v-for="prestamo in prestamos" 
        :key="prestamo.id"
        class="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="px-6 py-5">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ prestamo.nombre + ' ' + prestamo.apellido || prestamo.cliente || 'Cliente no especificado' }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ prestamo.numero_prestamo || `PRE-${prestamo.id}` }}</p>
                </div>
              </div>
              
              <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 p-3 rounded-lg">
                  <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">Monto Aprobado</div>
                  <div class="mt-1 text-xl font-bold text-gray-900">
                    ${{ formatMoney(prestamo.monto_aprobado || prestamo.monto_solicitado || prestamo.monto) }}
                  </div>
                </div>
                <div class="bg-blue-50 p-3 rounded-lg">
                  <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">Tasa de Interés</div>
                  <div class="mt-1 text-xl font-bold text-blue-600">{{ prestamo.tasa_interes }}%</div>
                </div>
                <div class="bg-purple-50 p-3 rounded-lg">
                  <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">Plazo</div>
                  <div class="mt-1 text-xl font-bold text-purple-600">{{ prestamo.plazo_meses || prestamo.plazo }} meses</div>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                  <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</div>
                  <div class="mt-1">
                    <span 
                      class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                      :class="getEstadoClass(prestamo.estado)"
                    >
                      {{ getEstadoText(prestamo.estado) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col gap-2 ml-6">
              <button 
                @click="viewPrestamo(prestamo)"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Ver Detalles
              </button>
              <button 
                @click="editPrestamo(prestamo)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalles del Préstamo -->
    <PrestamoModal 
      :is-open="showModal" 
      :prestamo="selectedPrestamo || {}" 
      @close="closeModal"
      @edit="editPrestamo"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PrestamoModal from '@/components/PrestamoModal.vue'

export default {
  name: 'PrestamosView',
  components: {
    PrestamoModal
  },
  data() {
    return {
      showCreateForm: false,
      showModal: false,
      selectedPrestamo: null,
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
      if (!amount || isNaN(amount)) return '0.00'
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Number(amount))
    },
    getEstadoClass(estado) {
      switch (estado?.toLowerCase()) {
        case 'activo':
          return 'bg-green-100 text-green-800'
        case 'completado':
          return 'bg-blue-100 text-blue-800'
        case 'pendiente_aprobacion':
          return 'bg-yellow-100 text-yellow-800'
        case 'rechazado':
          return 'bg-red-100 text-red-800'
        case 'vencido':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    getEstadoText(estado) {
      switch (estado?.toLowerCase()) {
        case 'activo':
          return 'Activo'
        case 'completado':
          return 'Completado'
        case 'pendiente_aprobacion':
          return 'Pendiente'
        case 'rechazado':
          return 'Rechazado'
        case 'vencido':
          return 'Vencido'
        default:
          return estado || 'Desconocido'
      }
    },
    viewPrestamo(prestamo) {
      console.log('Datos del préstamo seleccionado:', prestamo)
      this.selectedPrestamo = prestamo
      this.showModal = true
    },
    editPrestamo(prestamo) {
      console.log('Editar préstamo:', prestamo)
      // Aquí puedes implementar la lógica de edición
      this.closeModal()
    },
    closeModal() {
      this.showModal = false
      this.selectedPrestamo = null
    }
  },
  async mounted() {
    console.log('Cargando préstamos...')
    await this.fetchPrestamos()
    console.log('Préstamos cargados en el componente:', this.prestamos)
  }
}
</script>