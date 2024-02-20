<script setup>
import { ref, computed, onMounted } from 'vue'
import store from '../store'

// --------------- Variables ------------------------------
const defaultURL = store.state.defaultURL
const ranking = computed(() => {
  return store.state.ranking !== null ? store.state.ranking : null
})
const category_code = ref()
category_code.value = 'all'
const ranking_by_category = computed(() => {
  return category_code.value == 'all'
    ? ranking.value
    : ranking.value.filter((fighter) => fighter.category === category_code.value)
})
const windowTop = ref()
const isScrollingDown = ref()
var scrollRange = 300
var scrollTreshold = 200
// opcity change
const opacity = ref()

function onScroll() {
  if (window.top.scrollY > windowTop.value) {
    isScrollingDown.value = true
  } else {
    isScrollingDown.value = false
  }
  windowTop.value = window.top.scrollY
  if (window.top.scrollY > scrollTreshold) {
    opacity.value = Math.max(1 - (windowTop.value - scrollTreshold) / scrollRange, 0)
  }
  console.log(windowTop.value, opacity.value)
}
onMounted(() => {
  console.log(`the component is now mounted.`)
  window.addEventListener('scroll', onScroll)
})
// ---------------

if (!store.state.ranking) {
  store.commit('getRanking')
}
</script>
<template>
  <div v-if="store.state.ranking" class="wrapper" @scroll="onScroll()">
    <router-link to="/" @click="store.state.isMenuActive = true">
      <img src="../assets/icon/icon_arrow_back.svg" alt="cross icon" class="slide-menu-icon"
        :class="[windowTop > 52 ? 'goDown' : '', isScrollingDown ? 'inactive' : '']" /></router-link>
    <h1>Leaderboard</h1>
    <!-- <p>
      All fighters are categorized by strength from 3 to 5 stars. As they can only fight characters
      with the same strength, leaderboard is separated.
    </p> -->
    <div class="tabSelector stickyTop" :class="{ inactive: isScrollingDown }">
      <div class="tab" :class="{ active: category_code == 'all' }" @click="category_code = 'all'">
        <p>All</p>
      </div>
      <div class="tab" :class="{ active: category_code == 'COM' }" @click="category_code = 'COM'">
        <p v-if="category_code == 'COM'">Comics</p>
        <img v-if="category_code !== 'COM'" src="../assets/icon/icon-comics-2.png"
          alt="comics icon represented by a hero mask" />
      </div>
      <div class="tab" :class="{ active: category_code == 'MAN' }" @click="category_code = 'MAN'">
        <p v-if="category_code == 'MAN'">Manga</p>
        <img v-if="category_code !== 'MAN'" src="../assets/icon/icon-manga-3.png" alt="manga icon" />
      </div>
      <div class="tab" :class="{ active: category_code == 'MOV' }" @click="category_code = 'MOV'">
        <p v-if="category_code == 'MOV'">
          Movie <br />
          TV
        </p>
        <img v-if="category_code !== 'MOV'" src="../assets/icon/icon-movie.png" alt="movie icon" />
      </div>
      <div class="tab" :class="{ active: category_code == 'GAM' }" @click="category_code = 'GAM'">
        <p v-if="category_code == 'GAM'">Video Games</p>
        <img v-if="category_code !== 'GAM'" src="../assets/icon/icon-games-2.png"
          alt="games icon reprensented with a controller" />
      </div>
      <!-- <div class="tab" :class="{ active: strength_filter == 2 }" @click="strength_filter = 2">
      <p>2</p>
      <img src="../assets/icon/star.svg" alt="star to indicate strength" />
    </div> -->
    </div>
    <!-- FIRST PLACE -->
    <div class="podium-wrapper" id="podium-wrapper" :style="{ opacity: opacity }">
      <div class="podium">
        <div class="medal">1</div>
        <img :src="defaultURL + ranking_by_category[0].image" />
        <h2>{{ ranking_by_category[0].name }}</h2>
        <hr />
        <p>winrate <br />{{ ranking_by_category[0].percentage }} %</p>
      </div>
      <div class="flex second-row">
        <!-- SECOND PLACE -->
        <div class="podium second-place">
          <div class="medal">2</div>
          <img :src="defaultURL + ranking_by_category[1].image" />
          <h2>{{ ranking_by_category[1].name }}</h2>
          <hr />
          <p>winrate <br />{{ ranking_by_category[1].percentage }} %</p>
        </div>
        <!-- THIRD PLACE -->
        <div class="podium third-place">
          <div class="medal">3</div>
          <img :src="defaultURL + ranking_by_category[2].image" />
          <h2>{{ ranking_by_category[2].name }}</h2>
          <hr />
          <p>winrate <br />{{ ranking_by_category[2].percentage }} %</p>
        </div>
      </div>
    </div>
    <ul start="4">
      <li v-for="(fighter, key) in ranking_by_category.slice(3)" :key="fighter.name">
        <div>{{ key + 4 }}</div>
        <div>{{ fighter.name }}</div>
        <div>{{ fighter.percentage }} %</div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 0 1.7em;
  margin: auto;
  max-width: 800px;
}

h1 {
  padding: 1rem 0;
  text-align: center;
  margin-bottom: 1em;
}

/*  Tab selector */
.tabSelector {
  margin: 1em auto;
  padding: 5px 5px;
  width: 100%;
  max-width: 430px;
  height: 45px;
  border-radius: 35px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #373737;

  transition: 0.2s ease-in-out;
}

.tab {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 35px;
  padding: 0 15px;
  cursor: pointer;
  /* Flex basis  */
}

.tab img {
  margin-top: -2px;
  height: 25px;
}

.tab p {
  font-size: 15px;
  line-height: 15px;
}

.active {
  color: black;
  background-color: #dcdcdc;
  flex: 0 0 20%;
}

.active p {
  font-weight: bold;
}

.stickyTop {
  position: sticky;
  top: 5px;
  z-index: 2;
}

/* Podium  */

.podium-wrapper {
  margin-top: -30px;
  position: sticky;
  top: -45px;
}

.podium {
  margin: auto;
  width: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.podium img {
  position: relative;
  mix-blend-mode: screen;
  border: 3px solid white;
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: 100%;
  object-fit: cover;

  /* shadow box */
  box-shadow: rgba(255, 255, 0, 0.243) 0px 0px 100px;
}

.podium h2 {
  margin-top: 10px;
  font-size: 20px;
}

.podium>h2,
p {
  text-align: center;
}

.podium p {
  color: rgb(209, 209, 209);
}

.podium hr {
  margin-top: 10px;
  margin-bottom: 5px;
  border-color: rgb(152, 152, 152);
  width: 50%;
}

.medal {
  /* shape */
  border-radius: 50px;
  aspect-ratio: 1/1;
  width: 50px;
  height: 50px;
  /* Position */
  position: relative;
  top: 170px;
  left: 60px;
  z-index: 2;
  /* Font */
  text-align: center;
  font-family: var(--font-logo);
  font-size: 32px;
  /* background */
  background: rgb(255, 255, 36);
  background: linear-gradient(180deg, rgb(255, 220, 42) 28%, rgb(200, 147, 0) 73%);
  padding: 1px 4px;
}

/* Second and third place */
.second-row {
  margin-top: -20px;
}

.second-row .medal {
  top: 130px;
}

.second-place img {
  /* shadow box */
  box-shadow: rgba(0, 191, 255, 0.243) 0px 0px 100px;
}

.third-place img {
  /* shadow box */
  box-shadow: rgba(255, 128, 0, 0.243) 0px 0px 100px;
}

.second-place .medal {
  background: rgb(63, 124, 158);
  background: linear-gradient(0deg, rgba(63, 124, 158, 1) 28%, rgba(69, 173, 232, 1) 73%);
}

.third-place .medal {
  background: rgb(138, 86, 48);
  background: linear-gradient(0deg, rgb(178, 106, 54) 28%, rgba(226, 143, 44, 1) 73%);
}

.second-row .podium img {
  width: 75%;
}

.second-row .medal {
  width: 40px;
  height: 40px;
  font-size: 25px;
}

/*  Leaderboard List */
ul {
  position: relative;
  list-style: none;
  width: 90%;
  margin: 2em auto;
  padding: 0;
  padding-bottom: 2em;
  z-index: 1;
}

li {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;

  padding: 0 10px;
  margin: 12px 0;
  background-color: #4d4d4d;
  border-radius: 10px;
  height: 45px;

  font-size: 20px;
}

li div:nth-child(3) {
  margin-left: auto;
}

.flex {
  display: flex;
}

.goDown {
  top: 70px;
}

.inactive {
  top: -100px;
}</style>
