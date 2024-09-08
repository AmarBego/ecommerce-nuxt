import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async register(userData) {
        try {
          const config = useRuntimeConfig()
          const response = await $fetch(`${config.public.apiBase}/users/register`, {
            method: 'POST',
            body: userData
          })
          
          this.user = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            isSeller: response.user.isSeller,
          }
          
          return response
        } catch (error) {
          if (error.response) {
            const errorData = await error.response.json().catch(() => ({}))
            if (error.response.status === 409) {
              throw new Error('Email already in use')
            } else {
              throw new Error(errorData.message || 'Registration failed')
            }
          } else {
            throw new Error('Network error. Please try again.')
          }
        }
      },
    
    logout() {
      this.user = null
    },
    
    async login(credentials) {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch(`${config.public.apiBase}/users/login`, {
          method: 'POST',
          body: credentials
        })
        
        this.user = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          isSeller: response.user.isSeller,
        }
        
        return response
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    isSeller: (state) => state.user?.isSeller || false,
  }
})