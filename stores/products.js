import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      try {
        const config = useRuntimeConfig()
        this.products = await $fetch(`${config.public.apiBase}/products`)
      } catch (error) {
        console.error('Error fetching products:', error)
        this.$dispatch('error', 'Failed to fetch products. Please try again later.')
      }
    }
  }
})