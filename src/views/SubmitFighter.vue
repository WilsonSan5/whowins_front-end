<script setup>
import { ref } from 'vue'
import axios from 'axios'
import LoadingScreen from '../components/LoadingScreen.vue'
import router from '../router'
// form data
const fighterName = ref()
const fighter2Name = ref()
const addOpponent = ref(false)
const response = ref()
const isLoading = ref(false)

function toggleField() {
  addOpponent.value = !addOpponent.value
}
function postFighter(fighterName) {
  isLoading.value = true
  axios
    .post('api/fighters', {
      name: fighterName
    })
    .then((r) => {
      response.value = r
      console.log(response.value)
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
    })
}
function submitFighter() {
  postFighter(fighterName.value)
  if (addOpponent.value) {
    postFighter(fighter2Name.value)
  }
  fighterName.value = ''
  fighter2Name.value = ''
  addOpponent.value = false
  setTimeout(() => {
    router.push('/')
  }, 3000)
}
</script>
<template>
  <LoadingScreen v-if="isLoading" />
  <router-link to="/">
    <img src="../assets/icon/icon_x.svg" alt="cross icon" class="slide-menu-icon" id="icon_x"
  /></router-link>
  <div class="wrapper">
    <h1>Submit a fighter</h1>
    <div v-if="response" class="alert" :class="[response.status == 201 ? 'good' : 'bad']">
      Thank you for your contribution !
    </div>
    <form @submit.prevent="submitFighter()">
      <label for="fighter-name">Fighter 1</label>
      <input v-model="fighterName" name="fight-name" type="text" placeholder="Name" required />
      <!-- <select id="category" v-model="category">
        <option value="COM">Comics</option>
        <option value="MAN">Manga / Anime</option>
        <option value="GAM">Video Games</option>
        <option value="MOV">Movies / TV shows</option>
      </select> -->
      <button v-if="!addOpponent" id="addFighter-button" @click="toggleField()" type="button">
        Add an opponent
      </button>
      <label v-if="addOpponent" for="fighter-name">Fighter 2</label>
      <input
        v-if="addOpponent"
        v-model="fighter2Name"
        name="fight-name"
        type="text"
        placeholder="Name"
        required
      />
      <button v-if="addOpponent" id="addFighter-button" @click="toggleField()" type="button">
        Remove
      </button>
      <button id="submit-button" type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 50px;
  padding: 1rem 0;
  text-align: center;
}
.wrapper {
  padding: 0 1.7em;
  margin: auto;
  max-width: 800px;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: left;
}
form {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
label {
  font-size: 1.5rem;
  font-family: var(--font-secondary);
}
input {
  height: 40px;
}
select {
  height: 40px;
  resize: none;
}
input,
textarea {
  /* Position */
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;

  /* color and shape */
  background-color: var(--color-background);
  border-radius: 5px;
  border: 1px solid grey;

  /* text */
  font-size: 1rem;
  color: white;
  font-family: var(--font-secondary);
}
#submit-button {
  margin-top: 10px;
  height: 50px;
  background-image: linear-gradient(to right, #ff4747 0%, #d3779a 51%, #635cbf 100%);
  transition: 0.5s;
  background-size: 200% auto;
  text-transform: uppercase;
  color: white;
  border: 0;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
#addFighter-button {
  height: 40px;
}
button:hover {
  background-position: right center; /* change the direction of the change here */
}
.alert {
  color: black;
  text-align: center;
  margin-top: auto;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
}
.good {
  background-color: rgb(179, 255, 179);
}
.bad {
  background-color: rgb(255, 153, 153);
}
/* Desktop */
@media (min-width: 1024px) {
}
</style>
