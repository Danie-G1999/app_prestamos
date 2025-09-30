import { createStore } from 'vuex'

export default createStore({
  state: {
    prestamos: [],
    clientes: [],
    usuario: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },
  getters: {
    totalPrestamos: state => Array.isArray(state.prestamos) ? state.prestamos.length : 0,
    prestamosActivos: state => Array.isArray(state.prestamos) ? state.prestamos.filter(prestamo => prestamo.estado === 'activo') : [],
    totalClientes: state => Array.isArray(state.clientes) ? state.clientes.length : 0,
    clientesActivos: state => Array.isArray(state.clientes) ? state.clientes.filter(cliente => cliente.estado === 'activo') : [],
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.usuario
  },
  mutations: {
    SET_PRESTAMOS(state, prestamos) {
      // Asegurar que siempre sea un array
      state.prestamos = Array.isArray(prestamos) ? prestamos : []
    },
    ADD_PRESTAMO(state, prestamo) {
      // Asegurar que prestamos sea un array antes de hacer push
      if (!Array.isArray(state.prestamos)) {
        state.prestamos = []
      }
      state.prestamos.push(prestamo)
    },
    UPDATE_PRESTAMO(state, prestamoActualizado) {
      // Asegurar que prestamos sea un array
      if (!Array.isArray(state.prestamos)) {
        state.prestamos = []
        return
      }
      const index = state.prestamos.findIndex(p => p.id === prestamoActualizado.id)
      if (index !== -1) {
        state.prestamos.splice(index, 1, prestamoActualizado)
      }
    },
    DELETE_PRESTAMO(state, prestamoId) {
      // Asegurar que prestamos sea un array
      if (Array.isArray(state.prestamos)) {
        state.prestamos = state.prestamos.filter(p => p.id !== prestamoId)
      }
    },
    // Mutaciones para clientes
    SET_CLIENTES(state, clientes) {
      state.clientes = Array.isArray(clientes) ? clientes : []
    },
    ADD_CLIENTE(state, cliente) {
      if (!Array.isArray(state.clientes)) {
        state.clientes = []
      }
      state.clientes.push(cliente)
    },
    UPDATE_CLIENTE(state, clienteActualizado) {
      if (!Array.isArray(state.clientes)) {
        state.clientes = []
        return
      }
      const index = state.clientes.findIndex(c => c.id === clienteActualizado.id)
      if (index !== -1) {
        state.clientes.splice(index, 1, clienteActualizado)
      }
    },
    DELETE_CLIENTE(state, clienteId) {
      if (Array.isArray(state.clientes)) {
        state.clientes = state.clientes.filter(c => c.id !== clienteId)
      }
    },
    SET_AUTH(state, { usuario, token }) {
      state.usuario = usuario
      state.token = token
      state.isAuthenticated = true
      localStorage.setItem('token', token)
    },
    CLEAR_AUTH(state) {
      state.usuario = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        
        const data = await response.json()
        
        if (response.ok) {
          commit('SET_AUTH', { usuario: data.usuario, token: data.token })
          return { success: true }
        } else {
          commit('SET_ERROR', data.message || 'Error al iniciar sesión')
          return { success: false, message: data.message }
        }
      } catch (error) {
        commit('SET_ERROR', 'Error de conexión')
        return { success: false, message: 'Error de conexión' }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async logout({ commit }) {
      commit('CLEAR_AUTH')
    },
    
    // Limpiar autenticación cuando el token es inválido
    clearInvalidAuth({ commit }) {
      console.warn('Token inválido detectado, limpiando autenticación...')
      commit('CLEAR_AUTH')
    },
    
    async checkAuth({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            commit('SET_AUTH', { usuario: data.usuario, token })
          } else {
            commit('CLEAR_AUTH')
          }
        } catch (error) {
          commit('CLEAR_AUTH')
        }
      }
    },
    
    async fetchPrestamos({ commit, state }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null) // Limpiar errores previos
        
        // Preparar headers solo si hay token
        const headers = { 'Content-Type': 'application/json' }
        if (state.token) {
          headers['Authorization'] = `Bearer ${state.token}`
        }
        
        const response = await fetch('/api/prestamos', { headers })
        
        if (response.ok) {
          const data = await response.json()
          console.log('Respuesta del backend:', data) // Debug
          
          // Verificar si la respuesta tiene la estructura esperada
          let prestamos = [];
          if (data.success && Array.isArray(data.data)) {
            prestamos = data.data;
          } else if (Array.isArray(data)) {
            prestamos = data;
          } else if (data.prestamos && Array.isArray(data.prestamos)) {
            prestamos = data.prestamos;
          }
          
          console.log('Préstamos procesados:', prestamos) // Debug
          commit('SET_PRESTAMOS', prestamos)
        } else if (response.status === 401) {
          // Token inválido, limpiar autenticación pero continuar sin error
          console.warn('Token inválido, limpiando autenticación')
          commit('CLEAR_AUTH')
          
          // Intentar de nuevo sin token
          const retryResponse = await fetch('/api/prestamos')
          if (retryResponse.ok) {
            const retryData = await retryResponse.json()
            let prestamos = [];
            if (retryData.success && Array.isArray(retryData.data)) {
              prestamos = retryData.data;
            }
            commit('SET_PRESTAMOS', prestamos)
          } else {
            commit('SET_PRESTAMOS', [])
          }
        } else {
          // Otros errores del servidor
          commit('SET_PRESTAMOS', [])
          commit('SET_ERROR', 'Error al cargar préstamos')
        }
      } catch (error) {
        commit('SET_PRESTAMOS', []) // Asegurar array vacío en caso de error
        console.error('Error fetching prestamos:', error)
        // No mostrar error de conexión si el token es el problema
        if (!error.message.includes('token')) {
          commit('SET_ERROR', 'Error de conexión')
        }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async createPrestamo({ commit, state }, prestamo) {
      try {
        const response = await fetch('/api/prestamos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify(prestamo)
        })
        const nuevoPrestamo = await response.json()
        commit('ADD_PRESTAMO', nuevoPrestamo)
        return { success: true, prestamo: nuevoPrestamo }
      } catch (error) {
        commit('SET_ERROR', 'Error al crear préstamo')
        return { success: false, message: 'Error al crear préstamo' }
      }
    },
    
    async updatePrestamo({ commit, state }, prestamo) {
      try {
        const response = await fetch(`/api/prestamos/${prestamo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify(prestamo)
        })
        const prestamoActualizado = await response.json()
        commit('UPDATE_PRESTAMO', prestamoActualizado)
        return { success: true, prestamo: prestamoActualizado }
      } catch (error) {
        commit('SET_ERROR', 'Error al actualizar préstamo')
        return { success: false, message: 'Error al actualizar préstamo' }
      }
    },
    
    async deletePrestamo({ commit, state }, prestamoId) {
      try {
        await fetch(`/api/prestamos/${prestamoId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        })
        commit('DELETE_PRESTAMO', prestamoId)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', 'Error al eliminar préstamo')
        return { success: false, message: 'Error al eliminar préstamo' }
      }
    },

    // Acciones para clientes
    async fetchClientes({ commit, state }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        // Preparar headers
        const headers = { 'Content-Type': 'application/json' }
        if (state.token) {
          headers['Authorization'] = `Bearer ${state.token}`
        }
        
        const response = await fetch('/api/clientes', { headers })
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && Array.isArray(result.data)) {
            commit('SET_CLIENTES', result.data)
          } else {
            commit('SET_CLIENTES', [])
          }
        } else if (response.status === 401) {
          // Token inválido o expirado
          commit('CLEAR_AUTH')
          commit('SET_CLIENTES', [])
        } else {
          commit('SET_CLIENTES', [])
          commit('SET_ERROR', 'Error al cargar clientes')
        }
      } catch (error) {
        commit('SET_CLIENTES', [])
        console.error('Error fetching clientes:', error)
        if (!error.message.includes('token')) {
          commit('SET_ERROR', 'Error de conexión')
        }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchClienteWithPrestamos({ commit, state }, clienteId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        // Preparar headers
        const headers = { 'Content-Type': 'application/json' }
        if (state.token) {
          headers['Authorization'] = `Bearer ${state.token}`
        }
        
        const response = await fetch(`/api/clientes/${clienteId}/prestamos`, { headers })
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            return { success: true, data: result.data }
          }
        }
        return { success: false, message: 'Error al cargar cliente con préstamos' }
      } catch (error) {
        console.error('Error fetching cliente with prestamos:', error)
        return { success: false, message: 'Error de conexión' }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async createCliente({ commit, state }, cliente) {
      try {
        commit('SET_LOADING', true)
        const response = await fetch('/api/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify(cliente)
        })
        
        const result = await response.json()
        
        if (response.ok && result.success) {
          commit('ADD_CLIENTE', result.data)
          return { success: true, cliente: result.data }
        } else {
          return { success: false, message: result.message || 'Error al crear cliente' }
        }
      } catch (error) {
        console.error('Error creating cliente:', error)
        return { success: false, message: 'Error de conexión' }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async updateCliente({ commit, state }, cliente) {
      try {
        commit('SET_LOADING', true)
        const response = await fetch(`/api/clientes/${cliente.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify(cliente)
        })
        
        const result = await response.json()
        
        if (response.ok && result.success) {
          commit('UPDATE_CLIENTE', result.data)
          return { success: true, cliente: result.data }
        } else {
          return { success: false, message: result.message || 'Error al actualizar cliente' }
        }
      } catch (error) {
        console.error('Error updating cliente:', error)
        return { success: false, message: 'Error de conexión' }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async deleteCliente({ commit, state }, clienteId) {
      try {
        const response = await fetch(`/api/clientes/${clienteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        })
        
        const result = await response.json()
        
        if (response.ok && result.success) {
          commit('DELETE_CLIENTE', clienteId)
          return { success: true }
        } else {
          return { success: false, message: result.message || 'Error al eliminar cliente' }
        }
      } catch (error) {
        console.error('Error deleting cliente:', error)
        return { success: false, message: 'Error de conexión' }
      }
    }
  },
  modules: {
  }
})