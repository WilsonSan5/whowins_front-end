<script setup></script>
<template>
  <div class="wrapper">
    <h1 class="whowins-logo">WhoWins</h1>
    <p>By Wilson San</p>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  background-color: var(--color-main);
  width: 100vw;
  height: 100vh;
  z-index: 2;

  /* flex */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  position: absolute;
  margin: auto;
}
p {
  margin-top: auto;
  margin-bottom: 2px;

  font-family: var(--font-text);
  color: var(--color-text-faded);
  font-size: 12px;
}
</style>
