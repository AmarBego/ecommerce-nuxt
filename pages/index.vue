<template>
    <v-container>
      <h1>Product List</h1>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
              <p>Price: ${{ product.price }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Add to Cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useProductStore } from '~/stores/products'
  
  const productStore = useProductStore()
  const products = computed(() => productStore.products)
  
  onMounted(() => {
    productStore.fetchProducts()
  })
  </script>