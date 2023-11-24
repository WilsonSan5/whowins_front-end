<script setup>
import { ref } from 'vue'
var isActive = ref(false)
function togglemenu() {
  isActive.value = !isActive.value
  console.log(isActive)
}
</script>

<template>
  <img
    v-if="!isActive"
    alt="slide-menu icon"
    src="../assets/icon/icon_menu.png"
    class="slide-menu-icon"
    @click="togglemenu()"
  />
  <img
    v-if="isActive"
    alt="slide-menu icon"
    src="../assets/icon/icon_x.svg"
    class="slide-menu-icon"
    @click="togglemenu()"
  />
  <Transition>
    <div v-if="isActive" class="slide-menu">
      <h1 class="whowins-logo">WhoWins</h1>
      <div class="links-wrapper">
        <router-link to="about" @click="togglemenu()"> Submit a fight </router-link>
        <router-link to="about" @click="togglemenu()"> About </router-link>
        <router-link to="about" @click="togglemenu()"> Contact </router-link>
      </div>
    </div>
  </Transition>
</template>

<style>
.slide-menu-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;
  width: 45px;
  height: 45px;

  cursor: pointer;
}
.slide-menu {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);

  /* Position */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.links-wrapper {
  margin-bottom: auto;

  /*  Flex */
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  text-align: center;
  /*  Change anchor point */
  transform: translateY(-50%);
}
.links-wrapper a {
  color: white;
  text-decoration: none;
  font-family: var(--font-main);
  font-size: 2em;
}
.slide-menu h1 {
  margin-bottom: auto;
}

/* Slide-menu toggle animation */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>
