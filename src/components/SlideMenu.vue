<script setup>
import { computed } from 'vue'
import store from '../store'
var isMenuActive = computed(() => {
  return store.state.isMenuActive
})
function togglemenu() {
  store.state.isMenuActive = !store.state.isMenuActive
}
</script>
<template>
  <img
    id="menu_burger"
    v-if="!isMenuActive"
    alt="slide-menu icon"
    src="../assets/icon/icon_menu.svg"
    class="slide-menu-icon"
    @click="togglemenu()"
  />
  <img
    id="icon_x"
    v-if="isMenuActive"
    alt="slide-menu icon"
    src="../assets/icon/icon_x.svg"
    class="slide-menu-icon"
    @click="togglemenu()"
  />
  <Transition>
    <div v-if="isMenuActive" class="slide-menu">
      <h1 class="whowins-logo" @click="togglemenu()">WhoWins</h1>
      <div class="links-wrapper">
        <router-link to="ranking" @click="togglemenu()"> Ranking </router-link>
        <router-link to="submitFighter" @click="togglemenu()"> Submit a fighter </router-link>
        <router-link to="about" @click="togglemenu()"> About </router-link>
        <router-link to="contact" @click="togglemenu()"> Contact </router-link>
      </div>
    </div>
  </Transition>
</template>

<style>
.slide-menu-icon {
  position: fixed;
  top: 12px;
  right: 10px;
  z-index: 4;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
#menu_burger {
  width: 57px;
}
#icon_x {
  margin-right: 3px;
}
#menu_burger:hover {
  margin-top: -2px;
  margin-right: 2px;
  filter: drop-shadow(5px 5px 0px var(--color-background));
}
#icon_x:hover {
  filter: invert(39%) sepia(87%) saturate(3855%) hue-rotate(340deg) brightness(100%) contrast(90%);
}
.slide-menu h1 {
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.slide-menu h1:hover,
.slide-menu a:hover {
  text-shadow:
    -3px -3px 0 var(--color-secondary),
    3px -3px 0 var(--color-main),
    5px 5px 0 var(--color-main),
    -3px 3px 0 var(--color-main);
}
.slide-menu {
  width: 100vw;
  height: 100svh;
  background-color: var(--color-background);

  /* Position */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  /* Flex */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.links-wrapper {
  margin: auto;

  /*  Flex */
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  text-align: center;
  /*  Change anchor point */
  transform: translateY(-40%);
}
.links-wrapper a {
  color: white;
  text-decoration: none;
  font-family: var(--font-main);
  font-size: 2em;
  text-align: center;

  transition: 0.2s ease-in-out;
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
