<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Acerca del Sistema</h1>
    
    <div class="card mb-8">
      <h2 class="text-xl font-semibold mb-4">Sistema de Gestión de Préstamos</h2>
      <p class="text-gray-600 mb-4">
        Esta aplicación está diseñada para ayudarte a gestionar préstamos de manera eficiente y profesional. 
        Permite crear, editar, eliminar y monitorear préstamos con todas sus características importantes como 
        monto, tasa de interés, plazo y estado.
      </p>
      
      <h3 class="text-lg font-semibold mb-2">Características principales:</h3>
      <ul class="list-disc list-inside text-gray-600 space-y-1">
        <li>Gestión completa de préstamos</li>
        <li>Cálculo automático de intereses</li>
        <li>Seguimiento del estado de pagos</li>
        <li>Reportes y estadísticas</li>
        <li>Interfaz intuitiva y responsive</li>
        <li>Seguridad en el manejo de datos</li>
      </ul>
    </div>
    
    <div class="card">
      <h2 class="text-xl font-semibold mb-4">Tecnologías Utilizadas</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-semibold mb-2">Frontend</h3>
          <ul class="text-gray-600 space-y-1">
            <li>• Vue.js 3</li>
            <li>• Tailwind CSS</li>
            <li>• Vue Router</li>
            <li>• Vuex</li>
            <li>• Axios</li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Backend</h3>
          <ul class="text-gray-600 space-y-1">
            <li>• Node.js</li>
            <li>• Express.js</li>
            <li>• MongoDB/MySQL</li>
            <li>• JWT Authentication</li>
            <li>• REST API</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>