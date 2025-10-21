<template>
  <div id="app">
    <ProductDisplay />
  </div>
</template>

<script lang="ts">
import ProductDisplay from './components/ProductDisplay.vue'

export default {
  name: 'App',
  components: {
    ProductDisplay
  }
}
</script>

<style>
#app { min-height: 100vh; }
</style>
