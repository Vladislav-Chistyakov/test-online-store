<script setup lang="ts">
import Store from './Store/Store.vue'
import type {Product} from "~/types";
import {$fetch} from "ofetch";
const components = defineComponent({ Store })

const runtimeConfig = useRuntimeConfig()
const apiGetProducts = runtimeConfig.public.host

const products = ref<null | { items: Array<Product> }>(null)
const pending = ref<Boolean>(false)
const errorText = ref<String>('')


const getProducts = async function () {
  pending.value = true
  await $fetch(apiGetProducts, { method: 'GET' })
      .then((data) => {
        console.warn('data: ', data)
        products.value = data
        errorText.value = ''
      })
      .catch((error) => {
        console.error('Error fetch getProducts: ', error)
        errorText.value = error
      })
      .finally(() => {
        pending.value = false
      })
}

const listResult: ComputedRef<Array<Product>> = computed(() => {
  if (products.value && Array.isArray(products.value.items)) {
    if (products.value.items.length) {
      return products.value.items
    }
  }
  return []
})

onBeforeMount(() => {
  getProducts()
})

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
          <Store v-if="listResult"
                 :pending="pending"
                 :list-products="listResult" />
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
