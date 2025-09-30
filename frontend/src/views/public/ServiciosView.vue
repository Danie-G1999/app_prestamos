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
            <router-link to="/contacto" class="text-gray-700 hover:text-primary-600">Contacto</router-link>
            <router-link to="/login" class="btn-primary text-sm">Acceso Admin</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-12 px-4">
      <h1 class="text-4xl font-bold text-center text-gray-900 mb-12">
        Nuestros Servicios
      </h1>

      <!-- Servicios principales -->
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        <!-- <div class="card text-center">
          <div class="text-5xl mb-6">🏠</div>
          <h2 class="text-2xl font-bold mb-4">Préstamos Hipotecarios</h2>
          <p class="text-gray-600 mb-6">
            Financia la compra de tu casa propia con las mejores condiciones del mercado
          </p>
          <div class="space-y-2 text-left mb-6">
            <div class="flex justify-between">
              <span class="font-medium">Monto máximo:</span>
              <span>$500,000</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Plazo:</span>
              <span>Hasta 30 años</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Tasa desde:</span>
              <span class="text-green-600 font-bold">8.5% anual</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Enganche:</span>
              <span>Desde 10%</span>
            </div>
          </div>
          <button class="btn-primary w-full">Solicitar</button>
        </div> -->

        <div class="card text-center">
          <div class="text-5xl mb-6">💼</div>
          <h2 class="text-2xl font-bold mb-4">Préstamos Personales</h2>
          <p class="text-gray-600 mb-6">
            Para cualquier proyecto personal: vacaciones, estudios, emergencias
          </p>
          <div class="space-y-2 text-left mb-6">
            <div class="flex justify-between">
              <span class="font-medium">Monto máximo:</span>
              <span>$100,000</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Plazo:</span>
              <span>Hasta 5 años</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Tasa desde:</span>
              <span class="text-green-600 font-bold">12% anual</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Sin garantía:</span>
              <span class="text-blue-600">✓</span>
            </div>
          </div>
          <button class="btn-primary w-full">Solicitar</button>
        </div>

        <!-- <div class="card text-center">
          <div class="text-5xl mb-6">🚗</div>
          <h2 class="text-2xl font-bold mb-4">Préstamos Vehiculares</h2>
          <p class="text-gray-600 mb-6">
            Financia tu auto nuevo o usado de manera fácil y rápida
          </p>
          <div class="space-y-2 text-left mb-6">
            <div class="flex justify-between">
              <span class="font-medium">Monto máximo:</span>
              <span>$200,000</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Plazo:</span>
              <span>Hasta 7 años</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Tasa desde:</span>
              <span class="text-green-600 font-bold">10% anual</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Enganche:</span>
              <span>Desde 20%</span>
            </div>
          </div>
          <button class="btn-primary w-full">Solicitar</button>
        </div> -->
      </div>

      <!-- Proceso de solicitud -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">¿Cómo solicitar tu préstamo?</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 class="font-semibold mb-2">Solicita en línea</h3>
            <p class="text-gray-600 text-sm">Completa nuestro formulario simple en 5 minutos</p>
          </div>
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 class="font-semibold mb-2">Evaluación rápida</h3>
            <p class="text-gray-600 text-sm">Revisamos tu solicitud en menos de 24 horas</p>
          </div>
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 class="font-semibold mb-2">Documentación</h3>
            <p class="text-gray-600 text-sm">Envía los documentos requeridos digitalmente</p>
          </div>
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">4</span>
            </div>
            <h3 class="font-semibold mb-2">¡Listo!</h3>
            <p class="text-gray-600 text-sm">Recibe tu dinero en tu cuenta bancaria</p>
          </div>
        </div>
      </section>

      <!-- Calculadora de préstamo -->
      <section class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center mb-8">Calculadora de Préstamo</h2>
        <div class="max-w-2xl mx-auto">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Monto del préstamo</label>
              <input 
                v-model="calculator.monto" 
                type="number" 
                class="input-field"
                placeholder="50000"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Plazo (meses)</label>
              <input 
                v-model="calculator.plazo" 
                type="number" 
                class="input-field"
                placeholder="36"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tasa de interés anual (%)</label>
              <input 
                v-model="calculator.tasa" 
                type="number" 
                step="0.1"
                class="input-field"
                placeholder="12.0"
              >
            </div>
            <div class="flex items-end">
              <button @click="calcular" class="btn-primary w-full">Calcular</button>
            </div>
          </div>
          
          <div v-if="calculator.resultado" class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-semibold mb-4">Resultado:</h3>
            <div class="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-sm text-gray-600">Cuota mensual</p>
                <p class="text-2xl font-bold text-primary-600">${{ calculator.resultado.cuotaMensual }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Total a pagar</p>
                <p class="text-2xl font-bold text-gray-900">${{ calculator.resultado.totalPagar }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Total intereses</p>
                <p class="text-2xl font-bold text-red-600">${{ calculator.resultado.totalIntereses }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiciosView',
  data() {
    return {
      calculator: {
        monto: 50000,
        plazo: 36,
        tasa: 12,
        resultado: null
      }
    }
  },
  methods: {
    calcular() {
      const { monto, plazo, tasa } = this.calculator
      
      if (!monto || !plazo || !tasa) return
      
      const tasaMensual = tasa / 100 / 12
      const cuotaMensual = (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / 
                          (Math.pow(1 + tasaMensual, plazo) - 1)
      
      const totalPagar = cuotaMensual * plazo
      const totalIntereses = totalPagar - monto
      
      this.calculator.resultado = {
        cuotaMensual: Math.round(cuotaMensual).toLocaleString(),
        totalPagar: Math.round(totalPagar).toLocaleString(),
        totalIntereses: Math.round(totalIntereses).toLocaleString()
      }
    }
  },
  mounted() {
    this.calcular()
  }
}
</script>