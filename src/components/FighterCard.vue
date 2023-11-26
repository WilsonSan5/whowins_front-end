<script setup>
import PercentageCountUp from './PercentageCountUp.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    require: true
  },
  showPercentage: {
    type: Boolean,
    require: true
  },
  isFirstCard: {
    type: Boolean,
    require: true
  }
})
</script>

<template>
  <div class="card" :class="[isFirstCard ? 'mainColor' : 'secondaryColor']">
    <h2 v-if="props.name">
      {{ name }}
    </h2>
    <PercentageCountUp v-if="props.showPercentage" :percentageNumber="percentage" />
  </div>
</template>

<style scoped>
h2 {
  color: white;
  font-weight: 500;
  font-size: clamp(2.3rem, 8vw, 4em);
  font-family: var(--font-main);
  text-align: center;

  position: relative;
  top: -10px;
  transition: 0.3s ease-out;
  text-shadow:
    5px 5px 0 var(--color-background),
    -3px 3px 0 var(--color-background),
    -3px -3px 0 var(--color-background),
    3px -3px 0 var(--color-background);
}

.mainColor {
  background-color: var(--color-main);
}
.secondaryColor {
  background-color: var(--color-secondary);
}
.card {
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50svh;
  cursor: pointer;
}
.card:hover h2 {
  transform: translateY(-15px);
}

@media (min-width: 1024px) {
  .card {
    height: 100svh;
    width: 50vw;
  }
  h2 {
    font-size: clamp(2.3rem, 4vw, 4em);
  }
}
</style>
