import { defineStore } from 'pinia'
import { fetchProductById, type Product } from '@/services/api'

export const useProductStore = defineStore('product', {
  state: () => ({
    currentId: 1 as number,
    product: null as Product | null,
    isLoading: false as boolean,
    error: null as string | null,
    cache: new Map<number, Product>()
  }),
  getters: {
    pageClass(state): string {
      if (!state.product) return 'page-unavailable'
      const cat = state.product.category
      if (cat === "men's clothing") return 'page-men'
      if (cat === "women's clothing") return 'page-women'
      return 'page-unavailable'
    }
  },
  actions: {
    async loadProduct(id: number) {
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
      } catch (e) {
        this.error = 'Gagal memuat produk'
      } finally {
        this.isLoading = false
      }
    },
    nextProduct() {
      if (this.isLoading) return
      this.currentId = this.currentId % 20 + 1
      this.loadProduct(this.currentId)
    }
  }
})
