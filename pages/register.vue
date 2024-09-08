<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="handleRegister" ref="form">
                <v-text-field
                  v-model="name"
                  label="Full Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="[v => !!v || 'Name is required', v => (v && v.length >= 3 && v.length <= 50) || 'Name must be between 3 and 50 characters']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="[v => !!v || 'Password is required', v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).{8,}$/.test(v) || 'Password must be at least 8 characters, including uppercase and lowercase letters, numbers, and a special character']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="[v => !!v || 'Confirm Password is required', v => v === password || 'Passwords must match']"
                  required
                ></v-text-field>
                
                <v-checkbox
                  v-model="isSeller"
                  label="I want to become a seller"
                  @change="toggleSellerFields"
                ></v-checkbox>
  
                <v-expand-transition>
                    <div v-show="isSeller">

                        <v-select
                        v-model="address.country"
                        :items="countries"
                        :loading="isLoadingCountries"
                        item-title="name"
                        item-value="code"
                        label="Country"
                        placeholder="Select a country"
                        prepend-icon="mdi-flag"
                        :rules="isSeller ? [v => !!v || 'Country is required'] : []"
                        :required="isSeller"
                        @focus="loadCountries"
                        @update:modelValue="onCountryChange"
                        return-object
                        clearable
                      ></v-select>

                    <v-text-field
                      v-model="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      prepend-icon="mdi-phone"
                      type="tel"
                      :rules="isSeller ? [v => !!v || 'Phone Number is required', validatePhoneNumber] : []"
                      :required="isSeller"
                    ></v-text-field>
                    <v-text-field
                      v-model="address.street"
                      label="Street Address"
                      name="street"
                      prepend-icon="mdi-map-marker"
                      type="text"
                      :rules="isSeller ? [v => !!v || 'Street Address is required'] : []"
                      :required="isSeller"
                    ></v-text-field>
                    <v-text-field
                      v-model="address.city"
                      label="City"
                      name="city"
                      prepend-icon="mdi-city"
                      type="text"
                      :rules="isSeller ? [v => !!v || 'City is required'] : []"
                      :required="isSeller"
                    ></v-text-field>
                    <v-text-field
                      v-model="address.state"
                      label="State/Province"
                      name="state"
                      prepend-icon="mdi-map"
                      type="text"
                      :rules="isSeller ? [v => !!v || 'State/Province is required'] : []"
                      :required="isSeller"
                    ></v-text-field>
                    <v-text-field
                      v-model="address.postalCode"
                      label="Postal Code"
                      name="postalCode"
                      prepend-icon="mdi-postage-stamp"
                      type="text"
                      :rules="isSeller ? [v => !!v || 'Postal Code is required', validatePostalCode] : []"
                      :required="isSeller"
                    ></v-text-field>
                  </div>
                </v-expand-transition>
                <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
                <v-btn class="mt-4" color="primary" type="submit" block>Register</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'
import { validate as validatePostalCodeLib } from 'postal-codes-js'

const userStore = useUserStore()
const form = ref(null)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phoneNumber = ref('')
const address = ref({
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: ''
})
const error = ref('')
const isSeller = ref(false)

const countries = ref([])
const isLoadingCountries = ref(false)

const loadCountries = async () => {
  console.log('loadCountries function called')
  
  if (countries.value.length > 0) {
    console.log('Countries already loaded, returning early')
    return // Don't reload if already loaded
  }

  console.log('Starting to load countries')
  isLoadingCountries.value = true
  
  try {
    const config = useRuntimeConfig()
    console.log('API Base URL:', config.public.apiBase)
    
    const response = await fetch(`${config.public.apiBase}/countries`)
    console.log('Fetch response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Received countries data:', data)
    
    countries.value = data
    console.log('Countries loaded successfully, count:', countries.value.length)
  } catch (error) {
    console.error('Error loading countries:', error)
    countries.value = []
  } finally {
    isLoadingCountries.value = false
    console.log('Finished loading countries, isLoadingCountries set to false')
  }
}

const onCountryChange = (val) => {
  console.log('Country selected:', val)
  if (val && typeof val === 'object') {
    address.value.country = val.name
    address.value.countryCode = val.code
    countryChanged()
  }
}

const countryChanged = () => {
  phoneNumber.value = ''
  address.value.postalCode = ''
}

const validatePhoneNumber = async (v) => {
  if (!v) return true
  if (!address.value.country) return 'Please select a country first'
  try {
    const country = countries.value.find(c => c.name === address.value.country)
    if (!country) return 'Invalid country selection'
    const phoneNumber = parsePhoneNumberFromString(v, country.code)
    return phoneNumber && isValidPhoneNumber(v, country.code) ? true : 'Invalid phone number for the selected country'
  } catch (error) {
    console.error('Error validating phone number:', error)
    return 'Unable to validate phone number'
  }
}

const validatePostalCode = async (v) => {
  if (!v) return true
  if (!address.value.country) return 'Please select a country first'
  try {
    const country = countries.value.find(c => c.name === address.value.country)
    if (!country) return 'Invalid country selection'
    const result = validatePostalCodeLib(country.code, v)
    return result === true ? true : 'Invalid postal code for the selected country'
  } catch (error) {
    console.error('Error validating postal code:', error)
    return 'Unable to validate postal code'
  }
}

const toggleSellerFields = () => {
  if (!isSeller.value) {
    phoneNumber.value = ''
    address.value = {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  }
}

const handleRegister = async () => {
  const { valid } = await form.value.validate()
  
  if (!valid) {
    error.value = 'Please fill in all required fields correctly.'
    return
  }

  if (isSeller.value) {
    if (!address.value.country || !phoneNumber.value || !address.value.postalCode) {
      error.value = 'Please fill in all required seller information.'
      return
    }
  }

  try {
    const country = countries.value.find(c => c.name === address.value.country)
    const countryCode = country ? country.code : null
    
    const formattedPhoneNumber = isSeller.value && phoneNumber.value && countryCode
      ? parsePhoneNumberFromString(phoneNumber.value, countryCode).format('E.164')
      : ''

    const registrationData = {
      name: name.value,
      email: email.value,
      password: password.value,
      phoneNumber: formattedPhoneNumber,
      address: isSeller.value ? {
        ...address.value,
        countryCode: countryCode
      } : null,
      isSeller: isSeller.value
    }

    await userStore.register(registrationData)
    navigateTo('/login', { query: { registered: 'success' } })
  } catch (err) {
    console.error('Registration error:', err)
    error.value = err.message || 'Registration failed. Please try again.'
  }
}
</script>