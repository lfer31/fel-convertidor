<script setup>
import { ref } from 'vue';

const isNavbarActive = ref(false);

const toggleNavbar = () => {
  isNavbarActive.value = !isNavbarActive.value;
}

</script>

<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <strong>Convertidor de Pequeño contribuyente By LuisFer</strong>
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
.navbar-item {
  text-transform: uppercase;
}

</style>
