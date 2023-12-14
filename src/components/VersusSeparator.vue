<script setup>
defineProps({
  shake: {
    type: Boolean,
    require: true
  }
})
</script>
<template>
  <div id="wrapper" :class="{ shake: shake }">
    <div id="line"></div>
    <p id="VS">VS</p>
  </div>
</template>

<style scoped>
#wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
}
#line {
  position: absolute;
  top: 50%;
  left: -50vw;
  transform-origin: center;
  background-color: white;
  height: 6px;
  width: 100vw;
  z-index: 2;
}

#VS {
  /* Position */
  position: absolute;
  top: calc(50% - 33px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  /* Font */
  font-family: var(--font-logo);
  font-size: clamp(3em, 5vw, 5em);

  /* Color */
  color: var(--color-background);

  /*  Gradient color */
  /* background: rgb(196, 32, 32);
  background: linear-gradient(0deg, rgba(196, 32, 32, 1) 22%, rgba(27, 61, 191, 1) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}
p:after {
  content: 'VS';
  -webkit-text-stroke: 8px #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
@media (min-width: 1024px) {
  #line {
    top: -50svh;
    width: 8px;
    height: 101svh;
    left: calc(50% - 8px);
  }
  #VS {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
  }
  p:after {
    left: 50%;
    transform: translateX(-50%);
  }
}
.shake {
  animation: shake 0.1s;
  animation-delay: 0.55s;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
