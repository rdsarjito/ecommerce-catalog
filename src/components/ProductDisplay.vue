<template>
  <section :class="pageClass" aria-live="polite">
    <div class="card">
      <div v-if="isLoading" class="loader"></div>
      <template v-else>
        <template v-if="product">
          <div class="product-layout">
            <img class="product-image" :src="product.image" :alt="product.title">
            <div class="product-info">
              <h2 class="title">{{ product.title }}</h2>
              <div class="meta">
                <span class="category">{{ product.category }}</span>
                <span class="rating">
                  4.1/5
                  <span class="rating-dots">
                    <span class="dot filled"></span>
                    <span class="dot filled"></span>
                    <span class="dot filled"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </span>
                </span>
              </div>
              <div class="rule"></div>
              <p style="white-space:pre-wrap">{{ product.description }}</p>
              <div class="price-row">
                <div class="divider"></div>
                <div class="price">${{ product.price }}</div>
                <div class="actions">
                  <button class="btn">Buy Now</button>
                  <button class="btn secondary" @click="nextProduct" :disabled="isLoading">Next Product</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div style="text-align:center; padding:40px 0; color:#999">
            <h3>This product is unavailable to show</h3>
            <div class="actions" style="justify-content:center">
              <button class="btn secondary" @click="nextProduct" :disabled="isLoading">Next Product</button>
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
  methods: {
    ...mapActions(useProductStore, ['loadProduct', 'nextProduct'])
  },
  mounted() {
    // no-op on mount; fetch happens on Next button
  }
})
</script>

<style scoped>
/* Layout tightening for product card without changing structure/logic */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px; /* tighter vertical rhythm */
  height: 100%;
}

/* Keep description compact and scrollable if too long */
.product-info p {
  margin: 0;
  max-height: 240px; /* limit height; adjust as needed for design */
  overflow-y: auto;
}

/* Modern subtle separators just under text blocks */
.rule,
.divider {
  height: 1px;
  background-color: #e0e0e0; /* thin grey */
  width: 100%;
  align-self: stretch; /* fit column width only */
}
.rule { margin: -12px 0 12px 0; }
.divider { margin: 0px 0px; }

/* Pin price + actions to bottom of the card area */
.price-row {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Keep buttons aligned horizontally and responsive */
.actions {
  display: flex;
  gap: 16px;
}
.actions .btn {
  flex: 1 1 0;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
}

/* Unavailable title typography (Inter Regular 20px) */
.page-unavailable .card h3 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1; /* 100% */
  letter-spacing: 0;
  color: #000;
  margin: 0;
}

/* Unavailable view: Next Product button specs */
.page-unavailable .actions { justify-content: center; }
.page-unavailable .actions .btn.secondary {
  width: 465px;
  max-width: 100%;
  height: 42px;
  border-radius: 4px;
  border-width: 3px;
  border-color: #000;
  color: #000;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 1; /* 100% */
  letter-spacing: 0;
}

/* Unavailable background illustration behind text/button */
/* sad-face illustration removed per request */
</style>
