<script setup>
import PercentageCountUp from './PercentageCountUp.vue'
import store from '../store'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    require: false
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
  },
  shake: {
    type: Boolean,
    require: true
  }
})
const defaultURL = store.state.defaultURL
</script>

<template>
  <div
    class="card"
    :class="[
      isFirstCard ? 'mainColor' : 'secondaryColor',
      shake ? 'shake' : '',
      shake && !isFirstCard ? 'shake2' : ''
    ]"
  >
    <img
      v-if="props.image"
      :class="[isFirstCard ? 'lowOpacity' : 'highOpacity']"
      class="fighter-img"
      :src="defaultURL + image"
    />
    <div class="data-wrapper">
      <h2 v-if="props.name">
        {{ name }}
      </h2>
      <PercentageCountUp v-if="showPercentage" :percentageNumber="percentage" class="percentage" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: white;
  font-weight: 500;
  font-size: clamp(2.3rem, 8vw, 4em);
  font-family: var(--font-main);
  text-align: center;
  transition: 0.3s ease-out;
  text-shadow:
    5px 5px 0 var(--color-background),
    -3px 3px 0 var(--color-background),
    -3px -3px 0 var(--color-background),
    3px -3px 0 var(--color-background);
}
.percentage {
  position: relative;
  z-index: 1;
}

.mainColor {
  background-color: var(--color-main);
}
.secondaryColor {
  background-color: var(--color-secondary);
}
.card {
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50svh;
  cursor: pointer;

  overflow: hidden;
}
.data-wrapper {
  position: absolute;
  z-index: 1;
  transform: translateY(20px);
}
.fighter-img {
  mix-blend-mode: screen;
  width: calc(100% + 2em);
  height: 100%;
  object-fit: cover;
}
.card:hover h2 {
  transform: translateY(-15px);
}
.card:hover .fighter-img {
  transform: scale(105%);
}
.lowOpacity {
  opacity: 0.3;
}
.highOpacity {
  opacity: 0.5;
}
/*  Shake animation */
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
    transform: translate(2px, -2px);
  }
}
.shake2 {
  animation: shake 0.1s;
  animation-delay: 0.55s;
}
@keyframes shake2 {
  0% {
    transform: translate(-2px, -1px);
  }

  20% {
    transform: translate(2px, 0px);
  }

  50% {
    transform: translate(-2px, 2px);
  }

  70% {
    transform: translate(-3px, -1px);
  }

  100% {
    transform: translate(-1px, -2px);
  }
}
@media (min-width: 1024px) {
  .card {
    height: 100svh;
    width: 50vw;
  }
  .fighter-img {
    height: 100svh;
    max-width: 50vw;
    background-size: contain;
  }
  h2 {
    font-size: clamp(2.3rem, 4vw, 4em);
  }
}
</style>
