<script setup>
import axios from 'axios'
import { ref } from 'vue'
const ranking = ref()
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
</script>
<template>
  <h1>Ranking</h1>
  <ol>
    <li v-for="fighter in ranking" :key="fighter.name">
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
  width: 80%;
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
</style>
