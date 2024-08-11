<script setup lang="ts">
import {computed, type ComputedRef, type PropType, type Ref, type WritableComputedRef} from "vue";
import type {Product} from "~/types";


const props = defineProps({
  listProducts: {
    type: Object as PropType<Array<Product>>,
    default: []
  },
  pending: {
    type: Boolean,
    default: false
  }
})

const filterArray: Ref<Array<Product>> = ref([])

const computedFilterArray = computed({
  get () {
    return filterArray.value
  },
  set (newValue: Array<Product>) {
    filterArray.value = newValue
  }
})

const priceFrom: Ref<number | ''> = ref('')
const priceTo: Ref<number | ''> = ref('')
const nameProduct: Ref<string> = ref('')


const takeIntoPriceFrom = computed(() => {
  return !(priceFrom.value === '' || priceFrom.value === 0)
})

const takeIntoPriceTo = computed(() => {
  return !(priceTo.value === '' || priceTo.value === 0)
})

const takeIntoNameProduct = computed(() => {
  return !(nameProduct.value === '')
})


const filterPrice = computed(() => {
  const filterArrayPrice: Ref<Array<Product>> = ref([])

  if (!props.listProducts.length) {
    return []
  }

  if (!takeIntoPriceFrom.value && !takeIntoPriceTo.value) {
    return props.listProducts
  }

  if (takeIntoPriceFrom.value) {
    if (takeIntoPriceFrom.value) {
      filterArrayPrice.value = props.listProducts.filter(item => {
        if (typeof priceFrom.value === "number") {
          return item.price >= priceFrom.value
        }
      })
    }
  }

  if (takeIntoPriceTo.value && takeIntoPriceFrom.value) {
    if (takeIntoPriceTo.value) {
      filterArrayPrice.value = filterArrayPrice.value.filter(item => {
        if (typeof priceTo.value === "number") {
          return item.price <= priceTo.value
        }
      })
    }
  }

  if (takeIntoPriceTo.value && !takeIntoPriceFrom.value) {
    if (takeIntoPriceTo.value) {
      filterArrayPrice.value = props.listProducts.filter(item => {
        if (typeof priceTo.value === "number") {
          return item.price <= priceTo.value
        }
      })
    }
  }

  return filterArrayPrice.value
})

const filterNameProduct = computed(() => {
  const filterArrayNameProduct: Ref<Array<Product>> = ref([])

  if (takeIntoNameProduct.value) {
    filterArrayNameProduct.value = computedFilterArray.value.filter(item => {
      const titleProduct = item.title.toLowerCase()
      return titleProduct.includes(nameProduct.value.toLowerCase())
    })
  } else {
    return computedFilterArray.value
  }

  return filterArrayNameProduct.value
})

const startFilter = function () {
  computedFilterArray.value = filterPrice.value
  computedFilterArray.value = filterNameProduct.value
}

</script>

<template>
<div>
  filter
  <div>
    <label>
      <span>Поиск по названию </span>
      <input type="text" v-model="nameProduct">
    </label>
    <br>
    <label>
      <span>Цена от </span>
      <input type="number" v-model="priceFrom">
    </label>
    <br>
    <label>
      <span>Цена до </span>
      <input type="number" v-model="priceTo">
    </label>
  </div>
  <div>{{ priceFrom }} = {{ priceTo }} | {{ takeIntoPriceFrom }} = {{ takeIntoPriceTo }}</div>

  <button @click="startFilter">Отфильтровать</button>
  <div>
    <pre>
      {{ computedFilterArray }}
    </pre>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
