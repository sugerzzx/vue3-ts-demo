<template>
  <div class="app" :font-ratio="ratio" :style="{ '--fontRatio': ratio, '--font': '16px' }">
    <div class="title">This is Title</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ratio = ref(1);
</script>

<style scoped lang="scss">
// @function calculate($a) {

//   // @return .app[font-ratio=1] .title
//   @return 
// }

@mixin font-size($size) {
  font-size: calc($size * var(--fontRatio));
}

.app {
  .title {
    color: red;
    // font-size: calculate-rem(32px, var(--fontRatio));
    // font-size: calc(16px * var(--fontRatio));
    @include font-size(32px);
  }
}
</style>