<template>
    <div class="intro-container">
      <Header />
  
      <main>
        <section class="hero">
          <h1>Welcome to ShopEase</h1>
          <p>Your one-stop destination for all your shopping needs.</p>
          <div class="cta-buttons">
            <button @click="navigateTo('/login')" class="btn btn-primary">Shop Now</button>
            <button @click="navigateTo('/register')" class="btn btn-secondary">Become a Seller</button>
          </div>
        </section>
  
        <section id="features" class="features">
          <h2>Why Choose ShopEase?</h2>
          <div class="feature-grid">
            <div v-for="(feature, index) in features" :key="index" class="feature-item">
              <div class="feature-icon">
                <i :class="feature.icon"></i>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </section>
  
        <section id="about" class="about">
          <h2>About ShopEase</h2>
          <p>ShopEase is a leading e-commerce platform dedicated to providing an exceptional shopping experience. With a wide range of products, secure transactions, and fast shipping, we aim to make online shopping easy and enjoyable for everyone.</p>
        </section>
  
        <section id="contact" class="contact">
          <h2>Contact Us</h2>
          <div class="contact-info">
            <p>Have questions? We're here to help!</p>
            <p><strong>Email:</strong> support@shopease.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </div>
        </section>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Header from '~/components/common/Header.vue'
  import Footer from '~/components/common/Footer.vue'
  
  const features = ref([
    { title: 'Wide Selection', description: 'Thousands of products at your fingertips', icon: 'fas fa-store' },
    { title: 'Secure Transactions', description: 'Shop with confidence using our secure payment system', icon: 'fas fa-lock' },
    { title: 'Fast Shipping', description: 'Get your orders delivered quickly and efficiently', icon: 'fas fa-shipping-fast' },
    { title: 'Easy Returns', description: 'Hassle-free return policy for your peace of mind', icon: 'fas fa-undo' },
  ])
  
  // Use Nuxt's built-in navigation
  const navigateTo = useRouter().push
  </script>
  
  <style scoped>
  .intro-container {
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
    background-color: #f8f9fa;
  }
  
  .hero {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    text-align: center;
    padding: 4rem 1rem;
    margin-bottom: 2rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .cta-buttons {
    margin-top: 2rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background-color: #fff;
    color: #2575fc;
    margin-right: 1rem;
  }
  
  .btn-secondary {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }
  
  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  
  .features, .about, .contact {
    background-color: #fff;
    padding: 4rem 5%;
    margin-bottom: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .features:hover, .about:hover, .contact:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  
  h2 {
    color: #2575fc;
    margin-bottom: 2rem;
    font-size: 2.2rem;
    text-align: center;
    position: relative;
  }
  
  h2::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #2575fc;
    margin: 1rem auto 0;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem;
  }
  
  .feature-item {
    text-align: center;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid #e0e0e0;
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    background-color: #e6f0ff;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 1.5rem;
  }
  
  .feature-icon i {
    font-size: 2rem;
    color: #2575fc;
  }
  
  .feature-item h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  .about p, .contact-info p {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
  
  .contact-info {
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>