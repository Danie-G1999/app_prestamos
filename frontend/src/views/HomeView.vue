<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Sistema de Gestión de Préstamos
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Administra tus préstamos de manera eficiente y segura. 
        Controla montos, plazos, intereses y pagos desde una sola plataforma.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 mb-12">
      <div class="card text-center">
        <div class="text-3xl mb-4">💰</div>
        <h3 class="text-xl font-semibold mb-2">Gestión de Préstamos</h3>
        <p class="text-gray-600">
          Crea, edita y administra préstamos con facilidad
        </p>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl mb-4">📊</div>
        <h3 class="text-xl font-semibold mb-2">Reportes Detallados</h3>
        <p class="text-gray-600">
          Visualiza estadísticas y reportes de tus préstamos
        </p>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl mb-4">🔒</div>
        <h3 class="text-xl font-semibold mb-2">Seguridad</h3>
        <p class="text-gray-600">
          Toda tu información protegida y encriptada
        </p>
      </div>
    </div>

    <div class="text-center">
      <router-link 
        to="/prestamos" 
        class="btn-primary inline-block text-lg px-8 py-3"
      >
        Comenzar
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>