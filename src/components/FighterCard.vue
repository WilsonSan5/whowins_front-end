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
  },
  shake: {
    type: Boolean,
    require: true
  }
})
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
      :class="[isFirstCard ? 'lowOpacity' : 'highOpacity']"
      class="fighter-img"
      src="https://wallpapers.com/images/hd/luffy-black-backdrop-with-iconic-straw-hat-sd3icj25pykka4kq.jpg"
    />
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
  z-index: 1;

  position: absolute;
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
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50svh;
  cursor: pointer;

  overflow: hidden;
}
/* .card::after {
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  height: 50%;
  opacity: 0.15;

  background-image: url('../assets/dark-vador-darth-vader-article-attakus-art.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 47%;
} */

.fighter-img {
  opacity: 0.2;
  height: 50svh;
  background-size: cover;
  transition: 0.3s ease-out;
}
.card:hover h2 {
  transform: translateY(-15px);
}
.card:hover .fighter-img {
  transform: scale(105%);
}
.lowOpacity {
  opacity: 0.2;
}
.highOpacity {
  opacity: 0.4;
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
    opacity: 0.2;
    height: 100svh;
  }
  h2 {
    font-size: clamp(2.3rem, 4vw, 4em);
  }
}
</style>
