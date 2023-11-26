<script setup>
import FighterCard from '../components/FighterCard.vue'
import SlideMenu from '../components/SlideMenu.vue'
import { ref, computed } from 'vue'
import axios from 'axios'

// ---- Variables ---- //
const initialized = ref(false)
const isInversed = ref(false)
const showPercentage = ref(false)
const fighter1_percentage = ref()
const fighter2_percentage = ref()
const allFights = ref([]) // Current fights array
const allNextFights = ref([]) // Next  fights array
const currentKey = ref(0)
var timeOut
const screenWidth = ref(window.innerWidth)

const currentFight = computed(() => {
  return allFights.value[currentKey.value]
})
const fighter_1_name = computed(() => {
  return initialized.value ? currentFight.value.votes[0].Fighter.name : ''
})
const fighter_1_numberOfVotes = computed(() => {
  return initialized.value ? currentFight.value.votes[0].numberOfVotes : 0
})
const fighter_2_name = computed(() => {
  return initialized.value ? currentFight.value.votes[1].Fighter.name : ''
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
  console.log(
    'Total votes for ' +
      fighter_1_name.value +
      ': ' +
      totalVoteFighter_1 +
      ' (' +
      fighter1_percentage.value +
      '%)'
  )
  console.log(
    'Total votes for ' +
      fighter_2_name.value +
      ': ' +
      totalVoteFighter_2 +
      ' (' +
      fighter2_percentage.value +
      '%)'
  )
  showPercentage.value = true
  // Add 1 vote Back-End
  // try {
  //   await axios
  //     .patch('/votes/' + vote.id, { numberOfVotes: vote.numberOfVotes + 1 })
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  // } catch (e) {
  //   console.log(e)
  // }
  // Loading the new fight
  timeOut = setTimeout(() => {
    if (showPercentage.value == true) {
      nextFight()
    }
  }, timeBeforeNewFight)
}
async function nextFight() {
  clearTimeout(timeOut) // reset the timeout
  showPercentage.value = false // Removing Percentage
  isInversed.value = Math.random() < 0.5 // Sometimes it reverses the name for better dynamics
  if (currentKey.value >= allFights.value.length - 1) {
    console.log('reset')
    allFights.value = allNextFights.value // The current Fights switching to the new Fights
    currentKey.value = 0
    allNextFights.value = await getFightsData() // Fetching the next Fights
  } else {
    currentKey.value++
  }
  console.log('currentKey : ' + currentKey.value)
}

// Get request
async function getFightsData() {
  try {
    const response = await axios({
      method: 'GET',
      url: '/fights/randomFight'
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
// Fisher-Yates Shuffle

async function initialize() {
  try {
    allFights.value = await getFightsData()
    initialized.value = true
    allNextFights.value = await getFightsData()
  } catch (e) {
    console.log(e)
  }
}
// ---- Logic ---- //
initialize()
console.log(screenWidth.value)
</script>
<template>
  <div class="wrapper">
    <Transition :name="screenWidth < 1024 ? 'fromTop' : 'fromLeft'">
      <FighterCard
        v-if="initialized"
        :name="fighter_1_name"
        :percentage="fighter1_percentage"
        :showPercentage="showPercentage"
        :isFirstCard="!isInversed ? true : false"
        @click="showPercentage ? nextFight() : voting(currentFight.votes[0])"
        :class="{ secondCard: isInversed, shake: initialized }"
      />
    </Transition>
    <Transition :name="screenWidth <= 1024 ? 'fromBottom' : 'fromRight'">
      <FighterCard
        v-if="initialized"
        :class="{ shake: initialized }"
        :name="fighter_2_name"
        :percentage="fighter2_percentage"
        :backgroundColor="isInversed == false ? 'secondaryColor' : 'mainColor'"
        :showPercentage="showPercentage"
        :isFirstCard="isInversed ? true : false"
        @click="showPercentage ? nextFight() : voting(currentFight.votes[1])"
      />
    </Transition>
  </div>
  <SlideMenu v-if="initialized" />
  <Transition name="fromBottom">
    <img
      v-if="initialized"
      id="cycle-arrows"
      class="icon bottom-left"
      src="../assets/icon/icon_refresh.png"
      @click="nextFight()"
    />
  </Transition>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  display: flex;
  flex-direction: column;
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
  filter: drop-shadow(5px 5px 0px var(--color-background));
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

/*  Shake aniation */
.shake {
  animation: shake 0.1s;
  animation-delay: 0.55s;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }

  20% {
    transform: translate(-3px, 0px);
  }

  50% {
    transform: translate(-2px, 2px);
  }

  70% {
    transform: translate(3px, 1px);
  }

  100% {
    transform: translate(1px, -2px);
  }
}

/* Hover triggers only in desktop */
@media (hover: hover) {
  #cycle-arrows:hover {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);

    filter: drop-shadow(-5px -5px 0px var(--color-background));
  }
}
/*  Style for desktop */
@media (min-width: 1024px) {
  .wrapper {
    display: flex;
    flex-direction: row;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
