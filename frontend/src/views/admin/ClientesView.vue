<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Gestión de Clientes</h1>

    <!-- Buscador y filtros -->
    <div class="card mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Buscar cliente por nombre, email o teléfono..."
            class="input-field"
          >
        </div>
        <div>
          <select v-model="filterStatus" class="input-field">
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button 
          @click="showNewClienteModal = true"
          class="btn-primary whitespace-nowrap"
        >
          Nuevo Cliente
        </button>
      </div>
    </div>

    <!-- Lista de clientes -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Préstamos
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="cliente in filteredClientes" :key="cliente.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span class="text-primary-600 font-medium text-sm">
                      {{ getInitials(cliente.nombre) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ cliente.nombre }}</div>
                    <div class="text-sm text-gray-500">ID: {{ cliente.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ cliente.email }}</div>
                <div class="text-sm text-gray-500">{{ cliente.telefono }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ cliente.prestamos.length }} préstamos</div>
                <div class="text-sm text-gray-500">
                  ${{ formatMoney(cliente.prestamos.reduce((sum, p) => sum + p.monto, 0)) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(cliente.estado)"
                >
                  {{ cliente.estado }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="editCliente(cliente)"
                  class="text-primary-600 hover:text-primary-900 mr-3"
                >
                  Editar
                </button>
                <button 
                  @click="viewPrestamos(cliente)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Ver Préstamos
                </button>
                <button 
                  @click="deleteCliente(cliente)"
                  class="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredClientes.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.121l-.004-.003z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay clientes</h3>
        <p class="mt-1 text-sm text-gray-500">
          Comienza agregando un nuevo cliente.
        </p>
        <div class="mt-6">
          <button 
            @click="showNewClienteModal = true"
            class="btn-primary"
          >
            Agregar Cliente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para nuevo/editar cliente -->
    <div v-if="showNewClienteModal || editingCliente" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">
          {{ editingCliente ? 'Editar Cliente' : 'Nuevo Cliente' }}
        </h3>
        
        <form @submit.prevent="saveCliente" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input 
                v-model="clienteForm.nombre" 
                type="text" 
                required
                class="input-field"
                placeholder="Juan Pérez"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="clienteForm.email" 
                type="email" 
                required
                class="input-field"
                placeholder="juan@example.com"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input 
                v-model="clienteForm.telefono" 
                type="tel" 
                required
                class="input-field"
                placeholder="+1 (555) 123-4567"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select v-model="clienteForm.estado" class="input-field">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <textarea 
              v-model="clienteForm.direccion" 
              rows="2"
              class="input-field"
              placeholder="Dirección completa"
            ></textarea>
          </div>
          
          <div class="flex gap-4 pt-4">
            <button type="submit" class="btn-primary flex-1">
              {{ editingCliente ? 'Actualizar' : 'Crear' }} Cliente
            </button>
            <button 
              type="button" 
              @click="cancelEdit"
              class="btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientesView',
  data() {
    return {
      searchTerm: '',
      filterStatus: '',
      showNewClienteModal: false,
      editingCliente: null,
      clienteForm: {
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        estado: 'activo'
      },
      // Datos de ejemplo
      clientes: [
        {
          id: 1,
          nombre: 'Juan Pérez',
          email: 'juan@example.com',
          telefono: '+1 (555) 123-4567',
          direccion: 'Av. Principal 123',
          estado: 'activo',
          prestamos: [
            { monto: 50000, estado: 'activo' },
            { monto: 25000, estado: 'pagado' }
          ]
        },
        {
          id: 2,
          nombre: 'María García',
          email: 'maria@example.com',
          telefono: '+1 (555) 987-6543',
          direccion: 'Calle Secundaria 456',
          estado: 'activo',
          prestamos: [
            { monto: 75000, estado: 'activo' }
          ]
        },
        {
          id: 3,
          nombre: 'Carlos López',
          email: 'carlos@example.com',
          telefono: '+1 (555) 456-7890',
          direccion: 'Plaza Central 789',
          estado: 'inactivo',
          prestamos: []
        }
      ]
    }
  },
  computed: {
    filteredClientes() {
      let filtered = this.clientes
      
      // Filtrar por término de búsqueda
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        filtered = filtered.filter(cliente =>
          cliente.nombre.toLowerCase().includes(term) ||
          cliente.email.toLowerCase().includes(term) ||
          cliente.telefono.includes(term)
        )
      }
      
      // Filtrar por estado
      if (this.filterStatus) {
        filtered = filtered.filter(cliente => cliente.estado === this.filterStatus)
      }
      
      return filtered
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    },
    getStatusClass(status) {
      return status === 'activo' 
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800'
    },
    formatMoney(amount) {
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    },
    editCliente(cliente) {
      this.editingCliente = cliente
      this.clienteForm = { ...cliente }
    },
    viewPrestamos(cliente) {
      // Redirigir a préstamos filtrados por cliente
      this.$router.push({
        name: 'admin-prestamos',
        query: { cliente: cliente.nombre }
      })
    },
    deleteCliente(cliente) {
      if (confirm(`¿Estás seguro de eliminar a ${cliente.nombre}?`)) {
        const index = this.clientes.findIndex(c => c.id === cliente.id)
        if (index !== -1) {
          this.clientes.splice(index, 1)
        }
      }
    },
    saveCliente() {
      if (this.editingCliente) {
        // Actualizar cliente existente
        const index = this.clientes.findIndex(c => c.id === this.editingCliente.id)
        if (index !== -1) {
          this.clientes.splice(index, 1, { ...this.clienteForm, id: this.editingCliente.id })
        }
      } else {
        // Crear nuevo cliente
        const newCliente = {
          ...this.clienteForm,
          id: Date.now(),
          prestamos: []
        }
        this.clientes.push(newCliente)
      }
      this.cancelEdit()
    },
    cancelEdit() {
      this.showNewClienteModal = false
      this.editingCliente = null
      this.clienteForm = {
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        estado: 'activo'
      }
    }
  }
}
</script>