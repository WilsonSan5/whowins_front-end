<script setup>
import { computed, ref } from 'vue'
const pixelFromTop = ref()
const crossIsVisible = computed(() => {
  return window.pageYOffset > 0 ? false : true
})

function scrollHandler() {
  pixelFromTop.value = window.pageYOffset
}
</script>
<template>
  <router-link to="/">
    <img
      src="../assets/icon/icon_x.svg"
      alt="cross icon"
      class="slide-menu-icon"
      id="icon_x"
      v-if="crossIsVisible"
  /></router-link>
  <div class="wrapper" @scroll="scrollHandler">
    <h1>About</h1>
    <section>
      <p>
        Ever wondered who would emerge victorious in a face-off between your favorite fictional
        characters?
      </p>
      <p><b>Look no further !</b></p>
      <p>
        WhoWins is a game where you can engage in friendly debates and cast your votes to determine
        the winner of epic clashes between two famous characters.
      </p>
    </section>
    <section>
      <h2>About me</h2>
      <img src="../assets/photo_portfolio.png" alt="picture of my face" />
      <p id="about-me-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis rem delectus temporibus,
        nulla vero praesentium culpa quas cum ea sequi sint maiores nam, vel molestiae est.
      </p>
      <p>To know more about me, check my <a href="https://wilsonsan.fr">website</a>.</p>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 0 1.7em;
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}
section {
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}
h1 {
  margin: auto;
  padding: 1rem 0;
}
h2 {
  text-align: center;
  margin: 1rem auto;
  font-family: var(--font-main);
}
.wrapper p {
  font-size: 1.5em;
  padding: 1rem 0em;
}
b {
  font-weight: 600;
}
.wrapper img {
  margin: auto;
  padding: 0 0 1rem 0;
  width: clamp(360px, 45vw, 450px);
}
/* Desktop */
@media (min-width: 1024px) {
  .wrapper img {
    margin: auto;
    padding: 0;
  }
  #about-me-text {
    margin: 2rem 0;
  }
}
</style>
