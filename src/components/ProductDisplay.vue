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
            <img class="unavailable-illustration" :src="sadFace" alt="Unavailable illustration" />
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
import sadFace from '@/assets/sad-face.png'
import { useProductStore } from '@/stores/product'
import { mapState, mapGetters, mapActions } from 'pinia'

export default Vue.extend({
  name: 'ProductDisplay',
  data() {
    return { sadFace }
  },
  computed: {
    ...mapState(useProductStore, ['currentId', 'product', 'isLoading', 'error']),
    ...mapGetters(useProductStore, ['pageClass'])
  },
  methods: {
    ...mapActions(useProductStore, ['loadProduct', 'nextProduct'])
  },
  mounted() {}
})
</script>

<style scoped>
.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.product-info p {
  margin: 0;
  max-height: 240px;
  overflow-y: auto;
}

.rule,
.divider {
  height: 1px;
  background-color: #e0e0e0;
  width: 100%;
  align-self: stretch; /* fit column width only */
}
.rule { margin: -12px 0 12px 0; }
.divider { margin: 0 0; }

.price-row {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

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

.page-unavailable .card h3 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0;
  color: #000;
  margin: 0;
}

.page-unavailable .actions { justify-content: center; width: 100%; }
.page-unavailable .actions .btn.secondary {
  width: 100%;
  max-width: 50%;
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
  line-height: 1;
  letter-spacing: 0;
}
@media (max-width: 768px) {
  .page-unavailable .actions .btn.secondary { max-width: 100%; }
}

.page-unavailable .card > div {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.unavailable-illustration {
  position: absolute;
  left: 56.5%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%; /* image scales to full card width */
  height: auto; /* keep aspect ratio */
  object-fit: contain;
  z-index: 0;
  pointer-events: none;
  opacity: 2;
}
.page-unavailable .card h3,
.page-unavailable .actions {
  position: relative;
  z-index: 1;
}

.page-unavailable .card {
  min-height: 600px;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
55%