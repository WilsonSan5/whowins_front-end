<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  percentageNumber: {
    type: Number,
    require: true
  },
  active: {
    type: Boolean
  }
})
const displayedPercentage = ref(0)

const animationDuration = 1000 // Total animation time
const incrementStep = (props.percentageNumber / animationDuration) * 100

const animateCountUp = () => {
  // Not displaying the decimal number for better visual
  displayedPercentage.value = Math.round(displayedPercentage.value)
  if (displayedPercentage.value < props.percentageNumber) {
    setTimeout(() => {
      displayedPercentage.value += incrementStep
      animateCountUp() // Appel récursif pour continuer l'animation
    }, 10) // Refresh time speed
  } else {
    displayedPercentage.value = props.percentageNumber
  }
}
onMounted(() => {
  animateCountUp()
})
</script>

<template>
  <h2 class="fighter-percentage">{{ displayedPercentage }} %</h2>
</template>

<style scoped>
.fighter-percentage {
  color: rgb(255, 255, 255);
  font-weight: 500;
  font-size: 5em;
  position: relative;
  top: -10px;
  transition: 0.3s ease-out;
}
</style>
