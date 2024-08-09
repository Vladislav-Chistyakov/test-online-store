<script setup lang="ts">
import ListProducts from './ListProducts/ListProducts.vue'
const components = defineComponent({ ListProducts })

</script>

<template>
  <main class="main">
    <div class="main__container container">
      <div class="main__filter">
        <div class="main__filter-wrapper">
          filter
        </div>
      </div>
      <div class="main__shop">
        <div class="main__shop-wrapper">
          <ListProducts></ListProducts>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "assets/scss/_colors";
@import "assets/scss/container";

.main {
  min-height: 100vh;
  padding-top: 30px;
  background-color: $beige-light;
  padding-bottom: 40px;
}

.main__container {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 30px;
  height: 100%;
  width: 100%;
}

.main__filter {
  padding: 15px 10px;
  background-color: $application-bg;
  color: $white;
}

.main__filter-wrapper{
  padding-right: 0;
  margin-right: 0;
}


.main__shop {
  height: 100%;
  background-color: inherit;
  padding: 15px 20px;
}

.main__shop-wrapper {
  padding-left: 0;
  margin-left: 0;
}
</style>
