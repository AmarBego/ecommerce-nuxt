import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      // In a real application, this would be an API call
      this.products = [
        { id: 1, name: 'Product 1', price: 19.99 },
        { id: 2, name: 'Product 2', price: 29.99 },
        { id: 3, name: 'Product 3', price: 39.99 },
      ]
    }
  }
})