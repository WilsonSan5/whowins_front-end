<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
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
strength_filter.value = 4
const ranking_by_strength = computed(() => {
  return ranking.value.filter((f) => f.strength === strength_filter.value)
})
</script>
<template>
  <h1>Leaderboard</h1>
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
    <div class="tab" :class="{ active: strength_filter == 2 }" @click="strength_filter = 2">
      <p>2</p>
      <img src="../assets/icon/star.svg" alt="star to indicate strength" />
    </div>
  </div>
  <ol>
    <li v-for="fighter in ranking_by_strength" :key="fighter.name">
      <div class="flex">
        <div>{{ fighter.name }}</div>
        <div>{{ fighter.percentage }} %</div>
      </div>
    </li>
  </ol>
</template>
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1em;
}
ol {
  width: 90%;
  margin: auto;
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

.tabSelector {
  margin: auto;
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
  flex-basis: 25%;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 35px;
  padding: 0 1em;
  cursor: pointer;
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
  background-color: rgb(177, 177, 177);
}
</style>
