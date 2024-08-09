<script setup lang="ts">
import { $fetch } from "ofetch";
import Loader from '../../Loader.vue'
import type { Product } from '~/types'

const components = defineComponent([Loader])
const runtimeConfig = useRuntimeConfig()
const apiGetProducts = runtimeConfig.public.host

const products = ref<null | { items: Array<Product> }>(null)
const pending = ref<Boolean>(false)
const error = ref<Boolean>(false)


const getProducts = async function () {
  pending.value = true
  products.value = await $fetch(apiGetProducts, { method: 'GET' })
      .catch((error) => {
        console.error('Error fetch getProducts: ', error)
        error.value = error
      })
      .finally(() => {
        pending.value = false
      })
}

const listResult: ComputedRef<Array<Product>> = computed(() => {
  console.warn('products.value ', products.value)
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
  <div>
    <div v-show="!products && pending">
      <Loader></Loader>
    </div>

    <div v-if="error">Error</div>

    <div v-if="!error && listResult">
      <ul v-if="listResult">
        <li v-for="(item, index) in listResult" :key="index">
          <div style="width: 100px">
            <picture>
              <img style="display: flex; width: 100%" :src="item.image.file.url" :alt="item.title">
            </picture>
          </div>

          <div v-if="item">
            <p>{{ item.title }}</p>
            <b>{{ item.price }}</b>
          </div>


          <ul v-if="item.colors">
            <li v-for="(color, indexColor) in item.colors" :key="indexColor">
              <div :style="{height: '10px', width: '10px', backgroundColor: color.code, borderRadius: '100%' }" />
            </li>
          </ul>
        </li>
      </ul>
      <div v-else>
        Нет данных
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
