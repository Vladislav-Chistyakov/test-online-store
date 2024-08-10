<script setup lang="ts">
import Card from "~/components/Main/Card/Card.vue";
import Loader from '~/components/Loader.vue'
import {$fetch} from "ofetch";

const dataThree = ref(null)
const route = useRoute()

onMounted(async () => {
  dataThree.value = await $fetch(`/api/card/${route.params.slug}`)
})

</script>

<template>
  <div class="card">
    <div class="card__container container">
      <span v-if="dataThree">{{ dataThree }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";
@import "assets/scss/container";

.card {
  height: 100%;
  padding-top: 100px;
  background-color: $beige-light;
  padding-bottom: 40px;
}
</style>
