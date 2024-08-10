<script setup lang="ts">
import Store from './Store/Store.vue'
import type {Product} from "~/types";
import {$fetch} from "ofetch";
import type { Ref, ComputedRef } from 'vue'
const components = defineComponent({ Store })
// const runtimeConfig = useRuntimeConfig()
// const apiGetProducts = runtimeConfig.public.host

const products: Ref<null | { items: Array<Product> }> = ref(null)
const pending: Ref<Boolean> = ref<Boolean>(false)
const errorText: Ref<String> = ref('')


const getProducts = async function () {
  pending.value = true
  await $fetch('/api/list/list')
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
  height: 100%;
  padding-top: 30px;
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
}

.main__shop-wrapper {
  padding-left: 0;
  margin-left: 0;
}
</style>
