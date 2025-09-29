<template>
  <div class="min-h-screen">
    <!-- Navegación pública -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary-600">
              💰 PrestaFácil
            </router-link>
          </div>
          <div class="hidden md:flex space-x-8">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Inicio
            </router-link>
            <router-link 
              to="/servicios" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Servicios
            </router-link>
            <router-link 
              to="/contacto" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Contacto
            </router-link>
            <router-link 
              to="/login" 
              class="btn-primary text-sm"
            >
              Acceso Admin
            </router-link>
          </div>
          
          <!-- Menú móvil -->
          <div class="md:hidden">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path v-else d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Menú móvil desplegable -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <router-link to="/" class="block px-3 py-2 text-gray-700 hover:text-primary-600">Inicio</router-link>
            <router-link to="/servicios" class="block px-3 py-2 text-gray-700 hover:text-primary-600">Servicios</router-link>
            <router-link to="/contacto" class="block px-3 py-2 text-gray-700 hover:text-primary-600">Contacto</router-link>
            <router-link to="/login" class="block px-3 py-2 text-primary-600 font-medium">Acceso Admin</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Espaciado para la navegación fija -->
    <div class="h-16"></div>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Préstamos <span class="text-yellow-300">Fáciles</span> y <span class="text-yellow-300">Rápidos</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Obtén el financiamiento que necesitas con las mejores condiciones del mercado. 
          Proceso 100% digital y aprobación en minutos.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition">
            Solicitar Préstamo
          </button>
          <button class="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-primary-600 transition">
            Calcular Cuota
          </button>
        </div>
      </div>
    </section>

    <!-- Características principales -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
          ¿Por qué elegir PrestaFácil?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Proceso Rápido</h3>
            <p class="text-gray-600">Aprobación en menos de 24 horas sin papeleos complicados</p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Mejores Tasas</h3>
            <p class="text-gray-600">Tasas de interés competitivas y transparentes sin sorpresas</p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">100% Seguro</h3>
            <p class="text-gray-600">Tus datos protegidos con la más alta seguridad y encriptación</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tipos de préstamos -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
          Nuestros Productos
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card hover:shadow-lg transition">
            <div class="text-3xl mb-4">💼</div>
            <h3 class="text-xl font-semibold mb-2">Préstamo Personal</h3>
            <p class="text-gray-600 mb-4">Para cualquier proyecto personal que tengas en mente</p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Hasta $100,000</li>
              <li>• Plazo hasta 5 años</li>
              <li>• Tasa desde 12%</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">¿Listo para solicitar tu préstamo?</h2>
        <p class="text-xl mb-8 opacity-90">
          Completa nuestra solicitud en línea y recibe una respuesta en minutos
        </p>
        <button class="bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition">
          Solicitar Ahora
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">PrestaFácil</h3>
            <p class="text-gray-400">
              Tu socio financiero de confianza para hacer realidad tus proyectos.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Productos</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Préstamos Hipotecarios</li>
              <li>Préstamos Personales</li>
              <li>Préstamos Vehiculares</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Soporte</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Centro de Ayuda</li>
              <li>Contacto</li>
              <li>Términos y Condiciones</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Contacto</h4>
            <ul class="space-y-2 text-gray-400">
              <li>📧 info@prestafacil.com</li>
              <li>📞 (555) 123-4567</li>
              <li>📍 Ciudad, País</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PrestaFácil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingView',
  data() {
    return {
      mobileMenuOpen: false
    }
  }
}
</script>