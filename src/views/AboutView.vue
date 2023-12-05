<script setup>
import { computed, ref } from 'vue'
import store from '../store'
const pixelFromTop = ref()
const crossIsVisible = computed(() => {
  return window.pageYOffset > 0 ? false : true
})

function scrollHandler() {
  pixelFromTop.value = window.pageYOffset
}
</script>
<template>
  <router-link to="/" @click="store.state.isMenuActive = true">
    <img
      src="../assets/icon/icon_arrow_back.svg"
      alt="cross icon"
      class="slide-menu-icon"
      id="icon_x"
      v-if="crossIsVisible"
  /></router-link>
  <div class="wrapper" @scroll="scrollHandler">
    <h1>About</h1>
    <section>
      <p><b>If Spiderman and Darth Vader are fighting, which side are you on? </b></p>
      <p>
        WhoWins is a "Would you rather" type of game where you cast your votes for the strongest
        characters.
      </p>
    </section>
    <section>
      <h2>About me</h2>
      <a href="https://wilsonsan.fr" id="link-wrapper" target="_blank">
        <div id="indication">
          <p id="indication-text">My Portfolio</p>
          <img src="../assets/curved-arrow.png" id="curved-arrow" />
        </div>
        <img src="../assets/photo_portfolio.png" alt="picture of my face" id="portfolio-img" />
      </a>
      <p id="about-me-text">
        Hi, I'm a full stack web developer specialized in VueJS and Symfony, but above all, I'm a
        fan of geek culture. 👾<br />If you're interested in my skills and want to know more, click
        on my portfolio website.<br />
        Otherwise, we can always talk about video games!🤓
      </p>
    </section>
  </div>
  <!-- <router-link to="contact">
    <div id="contact-CTA"></div>
  </router-link> -->
</template>

<style scoped>
.wrapper {
  padding: 0 1.7em;
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
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

/*  Portfolio image */
#link-wrapper {
  margin-top: -60px;
  text-align: center;
  color: white;
}
#portfolio-img {
  margin: auto;
  padding: 0 0 1rem 0;
  width: 100%;
  max-width: 500px;
}
#indication-text {
  margin: auto;
  width: max-content;
  position: absolute;
  font-size: clamp(1.2em, 3vw, 2rem);
  font-family: var(--font-main);
  position: relative;
  left: clamp(100px, 20vw, 250px);
}
#curved-arrow {
  margin: auto;
  position: relative;
  width: clamp(100px, 15vw, 150px);
  left: 10%;
}

#indication {
  position: relative;
  top: 100px;
}

#contact-CTA {
  position: fixed;
  bottom: 15px;
  right: 15px;
  aspect-ratio: 1/1;
  width: 80px;
  background-color: orange;
  border-radius: 50%;
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
