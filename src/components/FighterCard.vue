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
    <h2 v-if="props.name" :class="[isFirstCard ? 'text-shadow-main' : 'text-shadow-secondary']">
      {{ name }}
    </h2>
    <PercentageCountUp
      :class="[isFirstCard ? 'text-shadow-main' : 'text-shadow-secondary']"
      v-if="props.showPercentage"
      :percentageNumber="percentage"
    />
  </div>
</template>

<style scoped>
h2 {
  color: white;
  font-weight: 500;
  font-size: 2.6rem;
  font-family: var(--font-main);
  text-align: center;

  position: relative;
  top: -10px;
  transition: 0.3s ease-out;
}

.text-shadow-main {
  text-shadow:
    5px 5px 0 var(--color-secondary),
    -3px 3px 0 var(--color-secondary),
    -3px -3px 0 var(--color-secondary),
    3px -3px 0 var(--color-secondary);
}
.text-shadow-secondary {
  text-shadow:
    5px 5px 0 var(--color-main),
    -3px 3px 0 var(--color-main),
    -3px -3px 0 var(--color-main),
    3px -3px 0 var(--color-main);
}

.mainColor {
  background-color: var(--color-main);
}
.secondaryColor {
  background-color: var(--color-secondary);
}
.card {
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
}
</style>
