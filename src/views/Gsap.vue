<template>
  <div class="container">
    <div class="translate" ref="box1"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import myGsap from '../utils/myGsap/index';
import { onMounted, ref } from 'vue';

const box1 = ref(null);

onMounted(() => {
  // gsap.set(box1.value, {
  //   x: 100, y: 100,
  //   scale: 4,
  //   // scaleY: 2,
  //   // scaleX: 2,
  // });
  myGsap.set(box1.value, { x: 100, y: 100, scaleY: 4, scaleX: 4, scale: 6 });
});

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #000;

  .translate {
    width: 100px;
    height: 100px;
    background-color: #fff;
    // transform: translate(100px, 200px) scaleX(2);
    // scale: 2;
    // rotate: 45deg;
  }
}
</style>../utils/myGsap/myGsap../utils/myGsap/myGsap