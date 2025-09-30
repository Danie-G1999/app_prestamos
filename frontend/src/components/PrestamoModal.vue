<template>
  <transition name="modal" appear>
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeModal"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- Modal panel -->
        <div 
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          @click.stop
        >
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg leading-6 font-medium text-white">
                    Detalles del Préstamo
                  </h3>
                  <p class="text-sm text-blue-100">
                    {{ prestamo.numero_prestamo || `PRE-${prestamo.id}` }}
                  </p>
                </div>
              </div>
              <button 
                @click="closeModal"
                class="text-white hover:text-gray-200 transition-colors"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-6">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Información del Cliente -->
              <div class="space-y-4">
                <div class="border-l-4 border-blue-500 pl-4">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    <svg class="inline w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                    Información Personal del Cliente
                  </h4>
                  <div class="bg-blue-50 p-4 rounded-lg space-y-3">
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <span class="text-sm font-medium text-gray-500">Nombre Completo:</span>
                        <p class="text-lg font-semibold text-gray-900">
                          {{ prestamo.cliente_nombre || prestamo.cliente || 'No especificado' }}
                        </p>
                      </div>
                      <div>
                        <span class="text-sm font-medium text-gray-500">Email:</span>
                        <p class="text-gray-700">
                          {{ prestamo.cliente_email || prestamo.email || 'No especificado' }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <span class="text-sm font-medium text-gray-500">Teléfono:</span>
                        <p class="text-gray-700">
                          {{ prestamo.cliente_telefono || prestamo.telefono || 'No especificado' }}
                        </p>
                      </div>
                      <div>
                        <span class="text-sm font-medium text-gray-500">Dirección:</span>
                        <p class="text-gray-700">
                          {{ prestamo.cliente_direccion || prestamo.direccion || 'No especificada' }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <span class="text-sm font-medium text-gray-500">Ciudad:</span>
                        <p class="text-gray-700">
                          {{ prestamo.cliente_ciudad || prestamo.ciudad || 'No especificada' }}
                        </p>
                      </div>
                      <div>
                        <span class="text-sm font-medium text-gray-500">Ingresos Mensuales:</span>
                        <p class="text-gray-700 font-semibold text-green-600">
                          {{ prestamo.ingresos_mensuales || prestamo.ingresos ? '$' + formatMoney(prestamo.ingresos_mensuales || prestamo.ingresos) : 'No especificado' }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <span class="text-sm font-medium text-gray-500">Ocupación:</span>
                        <p class="text-gray-700">
                          {{ prestamo.cliente_ocupacion || prestamo.ocupacion || 'No especificada' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Información Financiera -->
                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    <svg class="inline w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                    </svg>
                    Detalles Financieros
                  </h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-3 rounded-lg">
                      <span class="text-sm font-medium text-gray-500">Monto Solicitado</span>
                      <p class="text-xl font-bold text-gray-900">${{ formatMoney(prestamo.monto_solicitado) }}</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                      <span class="text-sm font-medium text-gray-500">Monto Aprobado</span>
                      <p class="text-xl font-bold text-green-600">${{ formatMoney(prestamo.monto_aprobado) }}</p>
                    </div>
                    <div class="bg-blue-50 p-3 rounded-lg">
                      <span class="text-sm font-medium text-gray-500">Tasa de Interés</span>
                      <p class="text-xl font-bold text-blue-600">{{ prestamo.tasa_interes }}%</p>
                    </div>
                    <div class="bg-purple-50 p-3 rounded-lg">
                      <span class="text-sm font-medium text-gray-500">Cuota Mensual</span>
                      <p class="text-xl font-bold text-purple-600">${{ formatMoney(prestamo.cuota_mensual) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Información del Préstamo -->
              <div class="space-y-4">
                <div class="border-l-4 border-yellow-500 pl-4">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    <svg class="inline w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                    Información del Préstamo
                  </h4>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Tipo de Préstamo:</span>
                      <span class="text-sm font-semibold text-gray-900 capitalize">{{ prestamo.tipo_prestamo || 'Personal' }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Plazo:</span>
                      <span class="text-sm font-semibold text-gray-900">{{ prestamo.plazo_meses }} meses</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Estado:</span>
                      <span 
                        class="px-3 py-1 rounded-full text-xs font-medium"
                        :class="getEstadoClass(prestamo.estado)"
                      >
                        {{ getEstadoText(prestamo.estado) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Fechas Importantes -->
                <div class="border-l-4 border-indigo-500 pl-4">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    <svg class="inline w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    Fechas Importantes
                  </h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Fecha de Solicitud:</span>
                      <span class="text-sm text-gray-900">{{ formatDate(prestamo.fecha_solicitud) }}</span>
                    </div>
                    <div v-if="prestamo.fecha_aprobacion" class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Fecha de Aprobación:</span>
                      <span class="text-sm text-gray-900">{{ formatDate(prestamo.fecha_aprobacion) }}</span>
                    </div>
                    <div v-if="prestamo.fecha_primer_pago" class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Primer Pago:</span>
                      <span class="text-sm text-gray-900">{{ formatDate(prestamo.fecha_primer_pago) }}</span>
                    </div>
                    <div v-if="prestamo.fecha_finalizacion" class="flex justify-between">
                      <span class="text-sm font-medium text-gray-500">Fecha de Finalización:</span>
                      <span class="text-sm text-gray-900">{{ formatDate(prestamo.fecha_finalizacion) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Notas -->
                <div v-if="prestamo.notas" class="border-l-4 border-gray-500 pl-4">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    <svg class="inline w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd"/>
                    </svg>
                    Notas Adicionales
                  </h4>
                  <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{{ prestamo.notas }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-6 py-4">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500">
                Creado: {{ formatDate(prestamo.created_at) }}
                <span v-if="prestamo.updated_at && prestamo.updated_at !== prestamo.created_at">
                  • Actualizado: {{ formatDate(prestamo.updated_at) }}
                </span>
              </div>
              <div class="flex gap-3">
                <button 
                  @click="editPrestamo"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Editar
                </button>
                <button 
                  @click="closeModal"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PrestamoModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    prestamo: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'edit'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    editPrestamo() {
      this.$emit('edit', this.prestamo)
    },
    formatMoney(amount) {
      if (!amount || isNaN(amount)) return '0.00'
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Number(amount))
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
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
          return 'Pendiente de Aprobación'
        case 'rechazado':
          return 'Rechazado'
        case 'vencido':
          return 'Vencido'
        default:
          return estado || 'Desconocido'
      }
    }
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  opacity: 0;
  transform: translateY(-50px) scale(0.95);
}
</style>