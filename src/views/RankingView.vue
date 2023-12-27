<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import store from '../store'
const defaultURL = store.state.defaultURL
const ranking = ref()
const strength_filter = ref()
const category_code = ref()
async function getRanking() {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/ranking'
    })
    console.log(response)
    ranking.value = response.data
  } catch (error) {
    console.log(error)
  }
}
getRanking()

// strength_filter.value = 5
category_code.value = 'all'
// const ranking_by_strength = computed(() => {
//   return ranking.value.filter((fighter) => fighter.strength === strength_filter.value)
// })
const ranking_by_category = computed(() => {
  return category_code.value == 'all'
    ? ranking.value
    : ranking.value.filter((fighter) => fighter.category === category_code.value)
})
</script>
<template>
  <div class="wrapper">
    <h1>Leaderboard</h1>
    <!-- <p>
      All fighters are categorized by strength from 3 to 5 stars. As they can only fight characters
      with the same strength, leaderboard is separated.
    </p> -->
    <div class="tabSelector">
      <div class="tab" :class="{ active: category_code == 'all' }" @click="category_code = 'all'">
        <p>All</p>
      </div>
      <div class="tab" :class="{ active: category_code == 'COM' }" @click="category_code = 'COM'">
        <p v-if="category_code == 'COM'">Comics</p>
        <img v-if="category_code !== 'COM'" src="../assets/icon/icon-comics-2.png" />
      </div>
      <div class="tab" :class="{ active: category_code == 'MAN' }" @click="category_code = 'MAN'">
        <p v-if="category_code == 'MAN'">Manga</p>
        <img v-if="category_code !== 'MAN'" src="../assets/icon/icon-manga-3.png" />
      </div>
      <div class="tab" :class="{ active: category_code == 'MOV' }" @click="category_code = 'MOV'">
        <p v-if="category_code == 'MOV'">Cinema</p>
        <img v-if="category_code !== 'MOV'" src="../assets/icon/icon-movie.png" />
      </div>
      <div class="tab" :class="{ active: category_code == 'GAM' }" @click="category_code = 'GAM'">
        <p v-if="category_code == 'GAM'">Video Games</p>
        <img v-if="category_code !== 'GAM'" src="../assets/icon/icon-games-2.png" />
      </div>
      <!-- <div class="tab" :class="{ active: strength_filter == 2 }" @click="strength_filter = 2">
      <p>2</p>
      <img src="../assets/icon/star.svg" alt="star to indicate strength" />
    </div> -->
    </div>
    <!-- FIRST PLACE -->
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
    <ol start="4">
      <li v-for="fighter in ranking_by_category.slice(3)" :key="fighter.name">
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
  width: 100%;
  max-width: 430px;
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
  font-size: 20px;
}
.podium > h2,
p {
  text-align: center;
}
.podium p {
  color: rgb(209, 209, 209);
}
.podium hr {
  margin-top: 10px;
  margin-bottom: 5px;
  border-color: rgb(0, 0, 0);
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
</style>
