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
import { fetchProductById, type Product } from '@/services/api'

type State = {
  currentId: number
  product: Product | null
  isLoading: boolean
  error: string | null
  cache: Map<number, Product>
}

type Ctx = State & { loadProduct(id: number): Promise<void> }

export default Vue.extend({
  name: 'ProductDisplay',
  data(): State {
    return {
      currentId: 1,
      product: null,
      isLoading: false,
      error: null,
      cache: new Map<number, Product>()
    }
  },
  computed: {
    pageClass(this: State): string {
      if (!this.product) return 'page-unavailable'
      const cat = this.product.category
      if (cat === "men's clothing") return 'page-men'
      if (cat === "women's clothing") return 'page-women'
      return 'page-unavailable'
    }
  },
  methods: {
    async loadProduct(this: State, id: number) {
      this.isLoading = true
      this.error = null
      try {
        const cached = this.cache.get(id)
        const data = cached ? cached : await fetchProductById(id)
        this.cache.set(id, data)
        const cat = data.category
        if (cat === "men's clothing" || cat === "women's clothing") {
          this.product = data
        } else {
          this.product = null
        }
      } catch (e: unknown) {
        this.error = 'Gagal memuat produk'
      } finally {
        this.isLoading = false
      }
    },
    nextProduct(this: Ctx): void {
      if (this.isLoading) return
      this.currentId = this.currentId % 20 + 1
      this.loadProduct(this.currentId)
    }
  },
  mounted() {
    // Sesuai hint: fetch hanya saat tombol Next Product ditekan
  }
})
</script>

<style scoped>
/* No scoped styles; global classes are in page.css */
</style>
