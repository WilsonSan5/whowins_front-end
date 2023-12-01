<script setup>
import { ref } from 'vue'
import axios from 'axios'
import LoadingScreen from '../components/LoadingScreen.vue'
import store from '../store'
// form data
const email = ref(null)
const message = ref(null)
const response = ref()
const isLoading = ref(false)

function sendMessage() {
  isLoading.value = true
  axios
    .post('send/mail', {
      email: email.value,
      message: message.value
    })
    .then((r) => {
      console.log(r.data)
      response.value = r
      email.value = null
      message.value = null
      isLoading.value = false
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
<template>
  <LoadingScreen v-if="isLoading" />
  <router-link to="/" @click="store.state.isMenuActive = true">
    <img
      src="../assets/icon/icon_arrow_back.svg"
      alt="cross icon"
      class="slide-menu-icon"
      id="icon_x"
  /></router-link>
  <div class="wrapper">
    <h1>Contact</h1>
    <div v-if="response" class="alert" :class="[response.status == 200 ? 'good' : 'bad']">
      {{ response.data }}
    </div>
    <form @submit.prevent="sendMessage()">
      <label for="email">E-mail</label>
      <input v-model="email" name="email" type="email" placeholder="Your email here ..." required />
      <label for="message-content">Message Content</label>
      <textarea
        v-model="message"
        type="text"
        name="message-content"
        placeholder="Your message here ..."
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
h1 {
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
}
label {
  font-size: 1.5rem;
  font-family: var(--font-secondary);
}
input {
  height: 40px;
}
textarea {
  height: 300px;
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
button {
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
  textarea {
  }
}
</style>
