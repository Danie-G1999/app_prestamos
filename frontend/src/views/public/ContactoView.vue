<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navegación simplificada -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="text-xl font-bold text-primary-600">
            💰 PrestaFácil
          </router-link>
          <div class="flex space-x-4">
            <router-link to="/" class="text-gray-700 hover:text-primary-600">Inicio</router-link>
            <router-link to="/servicios" class="text-gray-700 hover:text-primary-600">Servicios</router-link>
            <router-link to="/login" class="btn-primary text-sm">Acceso Admin</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto py-12 px-4">
      <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">
        Contáctanos
      </h1>
      <p class="text-xl text-center text-gray-600 mb-12">
        Estamos aquí para ayudarte con todas tus dudas sobre préstamos
      </p>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Información de contacto -->
        <div>
          <h2 class="text-2xl font-bold mb-6">Información de Contacto</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-primary-100 p-3 rounded-lg mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Email</h3>
                <p class="text-gray-600">info@prestafacil.com</p>
                <p class="text-gray-600">soporte@prestafacil.com</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="bg-primary-100 p-3 rounded-lg mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Teléfono</h3>
                <p class="text-gray-600">+1 (555) 123-4567</p>
                <p class="text-gray-600">+1 (555) 987-6543</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="bg-primary-100 p-3 rounded-lg mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Oficina Principal</h3>
                <p class="text-gray-600">Av. Principal 123, Piso 5</p>
                <p class="text-gray-600">Ciudad, País 12345</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="bg-primary-100 p-3 rounded-lg mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Horarios de Atención</h3>
                <p class="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                <p class="text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <!-- Redes sociales -->
          <div class="mt-8">
            <h3 class="font-semibold text-lg mb-4">Síguenos</h3>
            <div class="flex space-x-4">
              <a href="#" class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Formulario de contacto -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
          
          <form @submit.prevent="enviarMensaje" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
              <input 
                v-model="form.nombre" 
                type="text" 
                required
                class="input-field"
                placeholder="Tu nombre completo"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                required
                class="input-field"
                placeholder="tu@email.com"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input 
                v-model="form.telefono" 
                type="tel" 
                class="input-field"
                placeholder="+1 (555) 123-4567"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de consulta</label>
              <select v-model="form.tipoConsulta" class="input-field">
                <option value="">Selecciona una opción</option>
                <option value="prestamo">Información sobre préstamos</option>
                <option value="solicitud">Estado de mi solicitud</option>
                <option value="soporte">Soporte técnico</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea 
                v-model="form.mensaje" 
                rows="4"
                required
                class="input-field"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="btn-primary w-full py-3"
              :disabled="enviando"
            >
              {{ enviando ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
          </form>

          <div v-if="mensajeEnviado" class="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactoView',
  data() {
    return {
      form: {
        nombre: '',
        email: '',
        telefono: '',
        tipoConsulta: '',
        mensaje: ''
      },
      enviando: false,
      mensajeEnviado: false
    }
  },
  methods: {
    async enviarMensaje() {
      this.enviando = true
      
      try {
        // Aquí se enviaría el mensaje al backend
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simular envío
        
        this.mensajeEnviado = true
        this.form = {
          nombre: '',
          email: '',
          telefono: '',
          tipoConsulta: '',
          mensaje: ''
        }
        
        setTimeout(() => {
          this.mensajeEnviado = false
        }, 5000)
        
      } catch (error) {
        console.error('Error enviando mensaje:', error)
      } finally {
        this.enviando = false
      }
    }
  }
}
</script>