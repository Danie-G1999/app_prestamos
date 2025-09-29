import { createStore } from 'vuex'

export default createStore({
  state: {
    prestamos: [],
    usuario: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },
  getters: {
    totalPrestamos: state => Array.isArray(state.prestamos) ? state.prestamos.length : 0,
    prestamosActivos: state => Array.isArray(state.prestamos) ? state.prestamos.filter(prestamo => prestamo.estado === 'activo') : [],
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
        const response = await fetch('/api/prestamos', {
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          // Asegurar que siempre sea un array
          const prestamos = Array.isArray(data) ? data : (data.prestamos && Array.isArray(data.prestamos) ? data.prestamos : [])
          commit('SET_PRESTAMOS', prestamos)
        } else {
          // Si hay error, establecer array vacío
          commit('SET_PRESTAMOS', [])
          commit('SET_ERROR', 'Error al cargar préstamos')
        }
      } catch (error) {
        commit('SET_PRESTAMOS', []) // Asegurar array vacío en caso de error
        commit('SET_ERROR', 'Error al cargar préstamos')
        console.error('Error fetching prestamos:', error)
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
    }
  },
  modules: {
  }
})