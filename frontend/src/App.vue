<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['checkAuth'])
  },
  async created() {
    // Verificar autenticación al cargar la app
    await this.checkAuth()
  }
}
</script>