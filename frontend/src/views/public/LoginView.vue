<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <router-link to="/" class="text-3xl font-bold text-primary-600">
          💰 PrestaFácil
        </router-link>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Acceso Administrativo
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Ingresa tus credenciales para acceder al panel de administración
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Mostrar errores -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="form.email"
                class="input-field"
                placeholder="admin@prestafacil.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="form.password"
                class="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary flex justify-center py-3"
              :class="{ 'opacity-50 cursor-not-allowed': loading }"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>
          </div>
        </form>

        <!-- Demo credentials -->
        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 class="text-sm font-medium text-blue-800 mb-2">Credenciales de prueba:</h3>
          <div class="text-sm text-blue-700 space-y-1">
            <p><strong>Email:</strong> admin@prestafacil.com</p>
            <p><strong>Contraseña:</strong> admin123</p>
          </div>
        </div>

        <div class="mt-6 text-center">
          <router-link 
            to="/" 
            class="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Volver al sitio principal
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  computed: {
    ...mapState(['loading', 'error'])
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const result = await this.login({
          email: this.form.email,
          password: this.form.password
        })
        
        if (result.success) {
          this.$router.push('/admin')
        }
      } catch (error) {
        console.error('Error en login:', error)
      }
    }
  },
  mounted() {
    // Prellenar con credenciales de demo para facilitar pruebas
    this.form.email = 'admin@prestafacil.com'
    this.form.password = 'admin123'
  }
}
</script>