<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <p class="text-gray-600 mt-1">{{ filteredClientes.length }} cliente{{ filteredClientes.length !== 1 ? 's' : '' }} registrado{{ filteredClientes.length !== 1 ? 's' : '' }}</p>
      </div>
      <button 
        @click="showNewClienteModal = true"
        class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Nuevo Cliente
      </button>
    </div>

    <!-- Buscador y filtros -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input 
              v-model="searchTerm"
              type="text" 
              placeholder="Buscar cliente por nombre, email o teléfono..."
              class="input-field pl-10"
            >
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
        <div class="w-full sm:w-auto">
          <select v-model="filterStatus" class="input-field w-full sm:w-auto">
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Lista de clientes - Vista Desktop -->
    <div class="hidden lg:block card">
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
                      {{ getInitials(cliente.nombre, cliente.apellido) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ cliente.nombre }} {{ cliente.apellido || '' }}
                    </div>
                    <div class="text-sm text-gray-500">ID: {{ cliente.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ cliente.email }}</div>
                <div class="text-sm text-gray-500">{{ cliente.telefono }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ (cliente.prestamos || []).length }} préstamos</div>
                <div class="text-sm text-gray-500">
                  ${{ formatMoney((cliente.prestamos || []).reduce((sum, p) => sum + (p.monto_aprobado || p.monto_solicitado || 0), 0)) }}
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
                <div class="flex flex-col sm:flex-row gap-2">
                  <button 
                    @click="editCliente(cliente)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                  </button>
                  <button 
                    @click="viewPrestamos(cliente)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Ver Préstamos
                  </button>
                  <button 
                    @click="deleteCliente(cliente)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Lista de clientes - Vista Mobile (Tarjetas) -->
    <div class="lg:hidden space-y-4">
      <div 
        v-for="cliente in filteredClientes" 
        :key="cliente.id"
        class="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="px-4 py-5">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-medium text-lg">
                {{ getInitials(cliente.nombre, cliente.apellido) }}
              </span>
            </div>
            <div class="ml-4 flex-1">
              <div class="text-lg font-medium text-gray-900">
                {{ cliente.nombre }} {{ cliente.apellido || '' }}
              </div>
              <div class="text-sm text-gray-500">ID: {{ cliente.id }}</div>
            </div>
            <span 
              class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="getStatusClass(cliente.estado)"
            >
              {{ cliente.estado }}
            </span>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</div>
              <div class="text-sm text-gray-900">{{ cliente.email }}</div>
            </div>
            <div>
              <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Teléfono</div>
              <div class="text-sm text-gray-900">{{ cliente.telefono }}</div>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Préstamos</div>
            <div class="text-sm text-gray-900">
              {{ (cliente.prestamos || []).length }} préstamos · 
              <span class="font-semibold">${{ formatMoney((cliente.prestamos || []).reduce((sum, p) => sum + (p.monto_aprobado || p.monto_solicitado || 0), 0)) }}</span>
            </div>
          </div>
          
          <div class="flex flex-col gap-2">
            <button 
              @click="editCliente(cliente)"
              class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Editar Cliente
            </button>
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="viewPrestamos(cliente)"
                class="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Ver Préstamos
              </button>
              <button 
                @click="deleteCliente(cliente)"
                class="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredClientes.length === 0" class="card">
      <div class="text-center py-12">
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
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Agregar Cliente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para nuevo/editar cliente -->
    <div v-if="showNewClienteModal || editingCliente" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ editingCliente ? 'Editar Cliente' : 'Nuevo Cliente' }}
            </h3>
            <button 
              @click="cancelEdit"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        
        <form @submit.prevent="saveCliente" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
              <input 
                v-model="clienteForm.nombre" 
                type="text" 
                required
                class="input-field"
                placeholder="Juan"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
              <input 
                v-model="clienteForm.apellido" 
                type="text" 
                required
                class="input-field"
                placeholder="Pérez"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
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
                class="input-field"
                placeholder="+1 (555) 123-4567"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
              <select v-model="clienteForm.tipo_documento" class="input-field">
                <option value="DNI">DNI</option>
                <option value="NIE">NIE</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Documento de Identidad</label>
              <input 
                v-model="clienteForm.documento_identidad" 
                type="text" 
                class="input-field"
                placeholder="12345678A"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input 
                v-model="clienteForm.ciudad" 
                type="text" 
                class="input-field"
                placeholder="Madrid"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ocupación</label>
              <input 
                v-model="clienteForm.ocupacion" 
                type="text" 
                class="input-field"
                placeholder="Ingeniero"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ingresos Mensuales</label>
              <input 
                v-model="clienteForm.ingresos_mensuales" 
                type="number" 
                step="0.01"
                class="input-field"
                placeholder="3000.00"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
              <select v-model="clienteForm.estado_civil" class="input-field">
                <option value="soltero">Soltero</option>
                <option value="casado">Casado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viudo">Viudo</option>
              </select>
            </div>
            <div class="md:col-span-2">
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
          
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              type="submit" 
              class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ editingCliente ? 'Actualizar' : 'Crear' }} Cliente
            </button>
            <button 
              type="button" 
              @click="cancelEdit"
              class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancelar
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>

    <!-- Modal de Préstamos del Cliente -->
    <div v-if="showPrestamosModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">
                Préstamos de {{ selectedClienteForPrestamos?.nombre }}
              </h3>
              <p class="text-gray-600 mt-1">{{ selectedClienteForPrestamos?.prestamos.length }} préstamo{{ selectedClienteForPrestamos?.prestamos.length !== 1 ? 's' : '' }} encontrado{{ selectedClienteForPrestamos?.prestamos.length !== 1 ? 's' : '' }}</p>
            </div>
            <button 
              @click="closePrestamosModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Lista de préstamos del cliente -->
          <div v-if="selectedClienteForPrestamos?.prestamos.length > 0" class="space-y-4">
            <div 
              v-for="(prestamo, index) in selectedClienteForPrestamos.prestamos" 
              :key="index"
              class="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">Préstamo #{{ prestamo.numero_prestamo || (index + 1) }}</h4>
                      <p class="text-sm text-gray-500">{{ prestamo.fecha_creacion || prestamo.created_at || 'Fecha no disponible' }}</p>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div class="bg-white p-3 rounded-lg border">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Monto</div>
                      <div class="text-lg font-bold text-gray-900">${{ formatMoney(prestamo.monto_aprobado || prestamo.monto_solicitado || 0) }}</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg border">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Estado</div>
                      <div>
                        <span 
                          class="inline-flex px-2 py-1 rounded-full text-xs font-semibold"
                          :class="getPrestamoStatusClass(prestamo.estado)"
                        >
                          {{ getPrestamoStatusText(prestamo.estado) }}
                        </span>
                      </div>
                    </div>
                    <div class="bg-white p-3 rounded-lg border">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tasa</div>
                      <div class="text-lg font-bold text-blue-600">{{ prestamo.tasa_interes || '0' }}%</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg border">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Plazo</div>
                      <div class="text-lg font-bold text-purple-600">{{ prestamo.plazo_meses || 'N/A' }} meses</div>
                    </div>
                  </div>

                  <div v-if="prestamo.descripcion || prestamo.proposito" class="mt-3">
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Descripción</div>
                    <p class="text-sm text-gray-700">{{ prestamo.descripcion || prestamo.proposito }}</p>
                  </div>
                </div>

                <div class="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row gap-2">
                  <button 
                    @click="editPrestamo(prestamo)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                  </button>
                  <button 
                    @click="viewPrestamoDetails(prestamo)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Estado vacío de préstamos -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay préstamos</h3>
            <p class="mt-1 text-sm text-gray-500">
              Este cliente no tiene préstamos registrados.
            </p>
            <div class="mt-6">
              <button 
                @click="createPrestamoForCliente"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Crear Primer Préstamo
              </button>
            </div>
          </div>

          <!-- Resumen financiero -->
          <div v-if="selectedClienteForPrestamos?.prestamos.length > 0" class="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Resumen Financiero</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">${{ formatMoney(getTotalPrestamos()) }}</div>
                <div class="text-sm text-gray-600">Total Prestado</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ getPrestamosActivos() }}</div>
                <div class="text-sm text-gray-600">Préstamos Activos</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-600">{{ getPrestamosPagados() }}</div>
                <div class="text-sm text-gray-600">Préstamos Pagados</div>
              </div>
            </div>
          </div>

          <!-- Botones del modal -->
          <div class="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button 
              @click="closePrestamosModal"
              class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ClientesView',
  data() {
    return {
      searchTerm: '',
      filterStatus: '',
      showNewClienteModal: false,
      editingCliente: null,
      showPrestamosModal: false,
      selectedClienteForPrestamos: null,
      clienteForm: {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        documento_identidad: '',
        tipo_documento: 'DNI',
        direccion: '',
        ciudad: '',
        ocupacion: '',
        ingresos_mensuales: '',
        estado_civil: 'soltero',
        estado: 'activo'
      }
    }
  },
  computed: {
    ...mapState(['clientes', 'loading', 'error']),
    filteredClientes() {
      let filtered = this.clientes || []
      
      // Filtrar por término de búsqueda
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        filtered = filtered.filter(cliente => {
          const nombreCompleto = `${cliente.nombre} ${cliente.apellido || ''}`.toLowerCase()
          return nombreCompleto.includes(term) ||
                 cliente.email?.toLowerCase().includes(term) ||
                 cliente.telefono?.includes(term)
        })
      }
      
      // Filtrar por estado
      if (this.filterStatus) {
        filtered = filtered.filter(cliente => cliente.estado === this.filterStatus)
      }
      
      return filtered
    }
  },
  methods: {
    ...mapActions(['fetchClientes', 'fetchClienteWithPrestamos', 'createCliente', 'updateCliente', 'deleteCliente']),
    getInitials(nombre, apellido = '') {
      const first = nombre ? nombre[0] : ''
      const last = apellido ? apellido[0] : ''
      return (first + last).toUpperCase()
    },
    getStatusClass(status) {
      return status === 'activo' 
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800'
    },
    formatMoney(amount) {
      if (!amount || isNaN(amount)) return '0.00'
      return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Number(amount))
    },
    editCliente(cliente) {
      this.editingCliente = cliente
      this.clienteForm = { 
        ...cliente,
        apellido: cliente.apellido || '',
        documento_identidad: cliente.documento_identidad || '',
        tipo_documento: cliente.tipo_documento || 'DNI',
        ciudad: cliente.ciudad || '',
        ocupacion: cliente.ocupacion || '',
        ingresos_mensuales: cliente.ingresos_mensuales || '',
        estado_civil: cliente.estado_civil || 'soltero'
      }
    },
    async viewPrestamos(cliente) {
      try {
        const result = await this.fetchClienteWithPrestamos(cliente.id)
        if (result.success) {
          this.selectedClienteForPrestamos = result.data
          this.showPrestamosModal = true
        } else {
          alert('Error al cargar los préstamos del cliente')
        }
      } catch (error) {
        console.error('Error loading client prestamos:', error)
        alert('Error al cargar los préstamos del cliente')
      }
    },
    closePrestamosModal() {
      this.showPrestamosModal = false
      this.selectedClienteForPrestamos = null
    },
    getPrestamoStatusClass(status) {
      switch (status?.toLowerCase()) {
        case 'activo':
          return 'bg-green-100 text-green-800'
        case 'completado':
        case 'pagado':
          return 'bg-blue-100 text-blue-800'
        case 'vencido':
          return 'bg-red-100 text-red-800'
        case 'pendiente_aprobacion':
        case 'pendiente':
          return 'bg-yellow-100 text-yellow-800'
        case 'rechazado':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    getPrestamoStatusText(status) {
      switch (status?.toLowerCase()) {
        case 'activo':
          return 'Activo'
        case 'completado':
        case 'pagado':
          return 'Pagado'
        case 'vencido':
          return 'Vencido'
        case 'pendiente_aprobacion':
        case 'pendiente':
          return 'Pendiente'
        case 'rechazado':
          return 'Rechazado'
        default:
          return status || 'Desconocido'
      }
    },
    getTotalPrestamos() {
      if (!this.selectedClienteForPrestamos || !this.selectedClienteForPrestamos.prestamos) return 0
      return this.selectedClienteForPrestamos.prestamos.reduce((sum, p) => sum + (p.monto_aprobado || p.monto_solicitado || 0), 0)
    },
    getPrestamosActivos() {
      if (!this.selectedClienteForPrestamos || !this.selectedClienteForPrestamos.prestamos) return 0
      return this.selectedClienteForPrestamos.prestamos.filter(p => p.estado === 'activo').length
    },
    getPrestamosPagados() {
      if (!this.selectedClienteForPrestamos || !this.selectedClienteForPrestamos.prestamos) return 0
      return this.selectedClienteForPrestamos.prestamos.filter(p => p.estado === 'completado' || p.estado === 'pagado').length
    },
    editPrestamo(prestamo) {
      // Redirigir a la vista de edición de préstamo
      console.log('Editar préstamo:', prestamo)
      this.$router.push({ name: 'admin-prestamos', query: { edit: prestamo.id } })
    },
    viewPrestamoDetails(prestamo) {
      // Mostrar detalles completos del préstamo
      console.log('Ver detalles del préstamo:', prestamo)
      this.$router.push({ name: 'admin-prestamos', query: { view: prestamo.id } })
    },
    createPrestamoForCliente() {
      // Redirigir a crear préstamo con el cliente preseleccionado
      console.log('Crear préstamo para:', this.selectedClienteForPrestamos.nombre)
      this.$router.push({ 
        name: 'admin-prestamos', 
        query: { 
          newPrestamo: true, 
          clienteId: this.selectedClienteForPrestamos.id,
          clienteNombre: `${this.selectedClienteForPrestamos.nombre} ${this.selectedClienteForPrestamos.apellido || ''}`
        } 
      })
      this.closePrestamosModal()
    },
    async deleteCliente(cliente) {
      if (confirm(`¿Estás seguro de eliminar a ${cliente.nombre} ${cliente.apellido || ''}?`)) {
        try {
          const result = await this.deleteCliente(cliente.id)
          if (result.success) {
            alert('Cliente eliminado correctamente')
          } else {
            alert(result.message || 'Error al eliminar cliente')
          }
        } catch (error) {
          console.error('Error deleting cliente:', error)
          alert('Error al eliminar cliente')
        }
      }
    },
    async saveCliente() {
      try {
        let result
        if (this.editingCliente) {
          // Actualizar cliente existente
          result = await this.updateCliente(this.clienteForm)
        } else {
          // Crear nuevo cliente
          result = await this.createCliente(this.clienteForm)
        }
        
        if (result.success) {
          alert(this.editingCliente ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente')
          this.cancelEdit()
        } else {
          alert(result.message || 'Error al guardar cliente')
        }
      } catch (error) {
        console.error('Error saving cliente:', error)
        alert('Error al guardar cliente')
      }
    },
    cancelEdit() {
      this.showNewClienteModal = false
      this.editingCliente = null
      this.clienteForm = {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        documento_identidad: '',
        tipo_documento: 'DNI',
        direccion: '',
        ciudad: '',
        ocupacion: '',
        ingresos_mensuales: '',
        estado_civil: 'soltero',
        estado: 'activo'
      }
    }
  },
  async mounted() {
    console.log('Cargando clientes desde la API...')
    await this.fetchClientes()
    console.log('Clientes cargados:', this.clientes)
  }
}
</script>