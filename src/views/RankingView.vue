<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import store from '../store'
const defaultURL = store.state.defaultURL
const ranking = ref()
const strength_filter = ref()
async function getRanking() {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/ranking'
    })
    ranking.value = response.data
  } catch (error) {
    console.log(error)
  }
}
getRanking()

strength_filter.value = 5
const ranking_by_strength = computed(() => {
  return ranking.value.filter((f) => f.strength === strength_filter.value)
})
</script>
<template>
  <div class="wrapper">
    <h1>Leaderboard</h1>
    <p>
      All fighters are categorized by strength from 3 to 5 stars. As they can only fight characters
      with the same strength, leaderboard is separated.
    </p>
    <div class="tabSelector">
      <div class="tab" :class="{ active: strength_filter == 5 }" @click="strength_filter = 5">
        <p>5</p>
        <img src="../assets/icon/star.svg" alt="star to indicate strength" />
      </div>
      <div class="tab" :class="{ active: strength_filter == 4 }" @click="strength_filter = 4">
        <p>4</p>
        <img src="../assets/icon/star.svg" alt="star to indicate strength" />
      </div>
      <div class="tab" :class="{ active: strength_filter == 3 }" @click="strength_filter = 3">
        <p>3</p>
        <img src="../assets/icon/star.svg" alt="star to indicate strength" />
      </div>
      <!-- <div class="tab" :class="{ active: strength_filter == 2 }" @click="strength_filter = 2">
      <p>2</p>
      <img src="../assets/icon/star.svg" alt="star to indicate strength" />
    </div> -->
    </div>
    <!-- FIRST PLACE -->
    <div class="podium">
      <div class="medal">1</div>
      <img :src="defaultURL + ranking_by_strength[0].image" />
      <h2>{{ ranking_by_strength[0].name }}</h2>
      <p>winrate <br />{{ ranking_by_strength[0].percentage }} %</p>
    </div>
    <div class="flex second-row">
      <!-- SECOND PLACE -->
      <div class="podium second-place">
        <div class="medal">2</div>
        <img :src="defaultURL + ranking_by_strength[1].image" />
        <h2>{{ ranking_by_strength[1].name }}</h2>
        <p>winrate <br />{{ ranking_by_strength[1].percentage }} %</p>
      </div>
      <!-- THIRD PLACE -->
      <div class="podium third-place">
        <div class="medal">3</div>
        <img :src="defaultURL + ranking_by_strength[2].image" />
        <h2>{{ ranking_by_strength[2].name }}</h2>
        <p>winrate <br />{{ ranking_by_strength[2].percentage }} %</p>
      </div>
    </div>
    <ol start="4">
      <li v-for="fighter in ranking_by_strength.slice(3)" :key="fighter.name">
        <div class="flex">
          <div>{{ fighter.name }}</div>
          <div>{{ fighter.percentage }} %</div>
        </div>
      </li>
    </ol>
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
.tabSelector {
  margin: 1em auto;
  padding: 5px 5px;
  width: 90%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373737;
  border-radius: 35px;
}
.tab {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 35px;
  padding: 0 1em;
  cursor: pointer;
  /* Flex basis  */
  flex-basis: 33%;
}
.tab img {
  margin-top: -2px;
  height: 20px;
}
.tab p {
  font-size: 20px;
}
.active {
  color: black;
  background-color: #dcdcdc;
}
ol {
  width: 90%;
  margin: 2em auto;
  padding-bottom: 2em;
}
li {
  padding: 5px 0px;
  font-size: 1.5em;
  font-family: var(--font-main);
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* Podium  */
.podium {
  margin: auto;
  width: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.podium img {
  position: relative;
  mix-blend-mode: screen;
  border: 3px solid white;
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: 100%;
  object-fit: cover;
}
.podium h2 {
  font-size: 20px;
}
.podium > h2,
p {
  text-align: center;
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
  margin-top: -70px;
}
.second-row .medal {
  top: 130px;
}
.second-row .podium img {
  width: 80%;
}
.second-place .medal {
  width: 40px;
  height: 40px;
  font-size: 25px;
  background: rgb(63, 124, 158);
  background: linear-gradient(0deg, rgba(63, 124, 158, 1) 28%, rgba(69, 173, 232, 1) 73%);
}
.third-place .medal {
  width: 40px;
  height: 40px;
  font-size: 25px;
  background: rgb(138, 86, 48);
  background: linear-gradient(0deg, rgba(138, 86, 48, 1) 28%, rgba(226, 143, 44, 1) 73%);
}
.second-row .podium img {
  width: 80%;
}
</style>
