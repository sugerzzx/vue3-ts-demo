<template>
  <router-link to="/colorSelector">ColorSelector</router-link>
  <router-link to="/dayNight">DayNight</router-link>
  <router-link to="/gsap">Gsap</router-link>
  <router-link to="/testScss">TestScss</router-link>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
a {
  display: block;
  margin: 10px;
  color: #000;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
}
</style>