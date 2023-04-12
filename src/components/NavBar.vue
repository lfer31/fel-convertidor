<script setup>
import { ref } from 'vue';

const isNavbarActive = ref(false);

const toggleNavbar = () => {
  isNavbarActive.value = !isNavbarActive.value;
}

</script>

<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand" style="width: 100%;">
        <a class="navbar-item title-container" href="/">
          <strong class="main-title">Convertidor de Facturas Electronicas</strong>
          <h3 class="subtitle">LuisFer with ❤️ and vuejs</h3>
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarContent"
          @click="toggleNavbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarContent" class="navbar-menu" :class="{ 'is-active': isNavbarActive }">
        <div class="navbar-start">
          <!-- Tus enlaces de navegación aquí -->
        </div>
        <div class="navbar-end">
          <!-- Otros elementos de la barra de navegación aquí -->
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-title {
  margin-bottom: 0;
  text-transform: uppercase;
}

.subtitle {
  color: white;
  font-size: 10px;
  margin-top: 0;
}
</style>



