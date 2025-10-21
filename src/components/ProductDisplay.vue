<template>
  <section :class="pageClass" aria-live="polite">
    <div class="card">
      <div v-if="isLoading" class="loader"></div>
      <template v-else>
        <template v-if="product">
          <div style="display:flex; gap:24px; align-items:flex-start">
            <img :src="product.image" :alt="product.title" width="200" height="200" style="object-fit:contain">
            <div style="flex:1">
              <h3>{{ product.title }}</h3>
              <p style="margin:8px 0">{{ product.category }}</p>
              <p style="white-space:pre-wrap">{{ product.description }}</p>
              <div class="actions">
                <button class="btn">Buy now • ${{ product.price }}</button>
                <button class="btn secondary" @click="nextProduct" :disabled="isLoading">Next product</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div style="text-align:center; padding:40px 0; color:#999">
            <h3>This product is unavailable to show</h3>
            <div class="actions" style="justify-content:center">
              <button class="btn secondary" @click="nextProduct" :disabled="isLoading">Next product</button>
            </div>
          </div>
        </template>

        <p v-if="error" style="color:#b00020; margin-top:12px">{{ error }}</p>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { useProductStore } from '@/stores/product'
import { mapState, mapGetters, mapActions } from 'pinia'

export default Vue.extend({
  name: 'ProductDisplay',
  computed: {
    ...mapState(useProductStore, ['currentId', 'product', 'isLoading', 'error']),
    ...mapGetters(useProductStore, ['pageClass'])
  },
  computed: {
    
  },
  methods: {
    ...mapActions(useProductStore, ['loadProduct', 'nextProduct'])
  },
  mounted() {
    // no-op on mount; fetch happens on Next button
  }
})
</script>

<style scoped>
/* No scoped styles; global classes are in page.css */
</style>
