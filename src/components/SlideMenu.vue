<script setup>
import { ref } from 'vue'
var isActive = ref(false)
function togglemenu() {
  isActive.value = !isActive.value
}
</script>

<template>
  <img
    id="menu_burger"
    v-if="!isActive"
    alt="slide-menu icon"
    src="../assets/icon/icon_menu.svg"
    class="slide-menu-icon"
    @click="togglemenu()"
  />
  <img
    id="icon_x"
    v-if="isActive"
    alt="slide-menu icon"
    src="../assets/icon/icon_x.svg"
    class="slide-menu-icon"
    @click="togglemenu()"
  />
  <Transition>
    <div v-if="isActive" class="slide-menu">
      <h1 class="whowins-logo" @click="togglemenu()">WhoWins</h1>
      <div class="links-wrapper">
        <!-- <router-link to="about" @click="togglemenu()"> Strongest characters </router-link> -->
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
  transition: 0.2s ease-in-out;
}
#menu_burger {
  width: 50px;
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
h1 {
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.slide-menu {
  width: 100vw;
  height: 100svh;
  background-color: var(--color-background);

  /* Position */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

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
.links-wrapper a:hover,
h1:hover {
  text-shadow:
    -3px -3px 0 var(--color-secondary),
    3px -3px 0 var(--color-main),
    5px 5px 0 var(--color-main),
    -3px 3px 0 var(--color-main);
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
