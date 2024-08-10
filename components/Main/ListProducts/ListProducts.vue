<script setup lang="ts">
import { $fetch } from "ofetch";
import type { Product } from '~/types'
import Loader from '~/components/Loader.vue'
import ProductItem from '~/components/Main/ProductItem/ProductItem.vue'

const components = defineComponent([Loader, ProductItem])
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
  <div class="market">
    <div v-show="!errorText && products === null || pending" class="market__loader">
      <Loader></Loader>
    </div>

    <div v-if="errorText" class="market__error">
      Error {{ errorText }}
    </div>

    <div v-if="!errorText && listResult" class="market__wrapper-products">
      <ul v-if="listResult" class="market__list-products">
        <ProductItem v-for="(item, index) in listResult" :key="index" :item="item" />
      </ul>
      <div v-else class="market__no-date">
        Нет данных
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "assets/scss/colors";

.market {
}

.market__loader {
  min-height: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.market__error {
  padding: 25px 0 40px;
  color: $red;
  font-size: 22px;
  line-height: 24px;
}

.market__wrapper-products {
}

.market__list-products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.market__no-date {
}
</style>
