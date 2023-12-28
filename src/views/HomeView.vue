<script setup>
import FighterCard from '../components/FighterCard.vue'
import SlideMenu from '../components/SlideMenu.vue'
import { ref, computed } from 'vue'
import axios from 'axios'
import store from '../store'
import VersusSeparator from '../components/VersusSeparator.vue'

// ---- Variables ---- //
const initialized = computed(() => {
  return store.state.isInitialized
})
const isInversed = computed(() => {
  return store.state.isInversed
})
const defaultURL = store.state.defaultURL
const showPercentage = ref(false)
var timeOut
const screenWidth = ref(window.innerWidth)
var shake = ref(false) // Because I want to shake only if data get initialized

//  ---- Fights array ------
const allFights = computed(() => {
  // Current fights array
  return store.state.allFights
})
// ------ Current fight ----------
const currentKey = computed(() => {
  return store.state.currentKey
})
const currentFight = computed(() => {
  // Current fight
  return allFights.value[currentKey.value]
})
// ------- Next fight -------------
const preloadFight = computed(() => {
  return initialized.value ? allFights.value[currentKey.value + 1] : null
})
// ------ Fighter Cards Data -------
const fighter1_percentage = ref()
const fighter2_percentage = ref()

const fighter_1_name = computed(() => {
  return initialized.value ? currentFight.value.votes[0].Fighter.name : ''
})
const fighter_1_image = computed(() => {
  return initialized.value ? currentFight.value.votes[0].Fighter.image : null
})
const fighter_1_numberOfVotes = computed(() => {
  return initialized.value ? currentFight.value.votes[0].numberOfVotes : 0
})
const fighter_2_name = computed(() => {
  return initialized.value ? currentFight.value.votes[1].Fighter.name : ''
})
const fighter_2_image = computed(() => {
  return initialized.value ? currentFight.value.votes[1].Fighter.image : null
})
const fighter_2_numberOfVotes = computed(() => {
  return initialized.value ? currentFight.value.votes[1].numberOfVotes : 0
})

// ---- Functions ---- //
// Getting fights data

async function voting(vote) {
  const timeBeforeNewFight = 2500 // in ms
  // Add 1 vote Front end
  var totalVoteFighter_1 = fighter_1_numberOfVotes.value
  var totalVoteFighter_2 = fighter_2_numberOfVotes.value
  if (vote == currentFight.value.votes[0]) {
    totalVoteFighter_1++
  } else {
    totalVoteFighter_2++
  }
  const totalVotes = totalVoteFighter_1 + totalVoteFighter_2
  fighter1_percentage.value = Math.round((totalVoteFighter_1 * 100) / totalVotes)
  fighter2_percentage.value = 100 - fighter1_percentage.value

  console.log('Voting for ' + vote.Fighter.name)
  showPercentage.value = true
  // Add 1 vote Back-End
  try {
    axios.patch('/api/votes/' + vote.id, { numberOfVotes: vote.numberOfVotes + 1 }).then((res) => {
      console.log(res.data)
    })
  } catch (e) {
    console.log(e)
  }
  // Loading the new fight
  timeOut = setTimeout(() => {
    nextFight()
  }, timeBeforeNewFight)
}
async function nextFight() {
  clearTimeout(timeOut) // reset the timeout
  showPercentage.value = false // Removing Percentage
  store.state.isInversed = Math.random() < 0.5 // Sometimes it reverses the name for better dynamics

  if (currentKey.value >= allFights.value.length - 2) {
    store.state.allFights = store.state.nextFights // The current Fights switching to the new Fights
    store.state.currentKey = 0
    store.state.nextFights = await getFightsData() // Fetching the next Fights
  } else {
    store.state.currentKey++
  }
}

// Get request
async function getFightsData() {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/fights/randomFight'
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
async function initialize() {
  try {
    store.state.allFights = await getFightsData()
    store.state.isInitialized = true
    shake.value = true
    store.state.nextFights = await getFightsData()
  } catch (e) {
    console.log(e)
  }
}
// ---- Logic ---- //
if (!store.state.isInitialized) {
  initialize()
}
store.commit('getRanking')
</script>
<template>
  <h1 style="display: none">
    WhoWins - Who is the strongest character ? Vote now for the winner of the craziest fights !
  </h1>
  <!-- Preload image -->
  <img
    style="display: none"
    v-if="initialized"
    :src="defaultURL + preloadFight.votes[0].Fighter.image"
  />
  <img
    style="display: none"
    v-if="initialized"
    :src="defaultURL + preloadFight.votes[1].Fighter.image"
  />
  <!-- Preload image -->
  <div class="wrapper">
    <Transition :name="screenWidth < 1024 ? 'fromTop' : 'fromLeft'">
      <FighterCard
        v-if="initialized"
        :name="fighter_1_name"
        :image="fighter_1_image"
        :percentage="fighter1_percentage"
        :showPercentage="showPercentage"
        :isFirstCard="!isInversed ? true : false"
        :shake="shake"
        @click="showPercentage ? nextFight() : voting(currentFight.votes[0])"
        :class="{ secondCard: isInversed }"
      />
    </Transition>
    <VersusSeparator :shake="shake" />
    <Transition :name="screenWidth <= 1024 ? 'fromBottom' : 'fromRight'">
      <FighterCard
        v-if="initialized"
        :name="fighter_2_name"
        :image="fighter_2_image"
        :percentage="fighter2_percentage"
        :showPercentage="showPercentage"
        :isFirstCard="isInversed ? true : false"
        :shake="shake"
        @click="showPercentage ? nextFight() : voting(currentFight.votes[1])"
      />
    </Transition>
  </div>
  <SlideMenu :shake="shake" />
  <Transition name="fromBottom">
    <img
      v-if="initialized"
      id="cycle-arrows"
      alt="circle-arrows"
      class="icon bottom-left"
      src="../assets/icon/icon_refresh.png"
      @click="nextFight()"
    />
  </Transition>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.secondCard {
  order: 1;
}
.bottom-left {
  position: fixed;
  bottom: 10px;
  right: 5px;
}
#cycle-arrows {
  transition: 0.5s;
}

/* Transition when App starts  Mobile*/
.fromTop-enter-active,
.fromBottom-enter-active {
  transition: all 0.5s ease-in;
}
.fromTop-enter-from {
  transform: translateY(-100%);
}
.fromBottom-enter-from {
  transform: translateY(100%);
}
/* Transition when App starts  Desktop*/

.fromLeft-enter-active {
  transition: all 0.5s ease-in;
}
.fromLeft-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.fromRight-enter-active {
  transition: all 0.5s ease-in;
}
.fromRight-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

/* Hover triggers only in desktop */
@media (hover: hover) {
  #cycle-arrows:hover {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    margin-top: -2px;
    margin-left: -2px;

    filter: drop-shadow(-5px -5px 0px var(--color-background));
  }
}
/*  Style for desktop */
@media (min-device-aspect-ratio: 1.3/1) {
  .wrapper {
    display: flex;
    flex-direction: row;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
