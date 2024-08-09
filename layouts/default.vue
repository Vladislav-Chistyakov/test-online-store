<script setup lang="ts">

</script>

<template>
  <div class="layouts">
    <Header></Header>
    <slot />
    <Footer></Footer>
  </div>
</template>

<style scoped lang="scss">
.layouts {
  height: 100vh;
}
</style>
