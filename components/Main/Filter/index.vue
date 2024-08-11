<script setup lang="ts">
import {computed, type ComputedRef, type PropType, type Ref} from "vue";
import type {Product, Color} from "~/types";

const props = defineProps({
  listProducts: {
    type: Object as PropType<Array<Product>>,
    default: []
  },
  listColors: {
    type: Object as PropType<Array<Color>>,
    default: []
  },
  pending: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['filter-array'])

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
const colorProduct: Ref<string> = ref('')

const clickColorButton = function (code: string) {
  console.log('code', code)
  colorProduct.value === code ? colorProduct.value = '' : colorProduct.value = code
}

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

const filterColorProduct = computed(() => {
  const filterArrayColorProduct: Ref<Array<Product>> = ref([])

  if (colorProduct.value) {
    filterArrayColorProduct.value = computedFilterArray.value.filter(item => {
      const testTwoArray = item.colors.filter(itemColor => {
        return itemColor.code === colorProduct.value
      })
      return testTwoArray.length
    })
    return filterArrayColorProduct.value
  } else {
    return computedFilterArray.value
  }
})


const listColors: ComputedRef<Array<Color>> = computed(() => {
  let textHashColors = ''
  const arrayColors: Ref<Color[]> = ref([])

  if (props.listProducts && props.listProducts.length) {
    props.listProducts.map((item: Product) => {
      item.colors.map((colorItem: Color) => {
        if (!textHashColors.includes(colorItem.code)) {
          textHashColors = textHashColors + ' ' + colorItem.code
          arrayColors.value.push(colorItem)
          return colorItem.code
        }
      })
    })
    return arrayColors.value
  }
  return []
})

const startFilter = function () {
  computedFilterArray.value = filterPrice.value
  computedFilterArray.value = filterNameProduct.value
  computedFilterArray.value = filterColorProduct.value
  emits('filter-array', computedFilterArray.value)
}

</script>

<template>
<div class="filter">
  <h4 class="filter__title">Фильтр</h4>
  <div class="filter__list-label">
    <label class="filter__label">
      <span class="filter__label-span">
        Поиск по названию
      </span>
      <input :disabled="pending" type="text" v-model="nameProduct" class="filter__label-input">
    </label>

    <label class="filter__label">
      <span class="filter__label-span">
        Цена от
      </span>
      <input :disabled="pending" class="filter__label-input" type="number" v-model="priceFrom">
    </label>

    <label class="filter__label">
      <span class="filter__label-span">
        Цена до
      </span>
      <input :disabled="pending" type="number" v-model="priceTo" class="filter__label-input">
    </label>
  </div>
  <div class="filter__block-colors">
    <ul v-if="listColors" class="filter__list-colors">
      <li v-for="(item, index) in listColors" :key="index" class="filter__item-color">
        <button @click="clickColorButton(item.code)"
                class="filter__button-color"
                :disabled="pending"
                :class="{'active-color' : item.code === colorProduct}"
                :style="{backgroundColor: item.code}" />
      </li>
    </ul>
  </div>

  <button @click="startFilter" :disabled="pending" class="filter__button-filter">
    Отфильтровать
  </button>
  <div>
    <pre>
      {{ computedFilterArray }}
    </pre>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";

.filter__title {
  color: $white;
  font-size: 22px;
  line-height: 24px;
  margin-bottom: 10px;
}

.filter__list-label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.filter__label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.filter__label-span {
  color: $white;
  font-size: 12px;
  line-height: 14px;
}

.filter__label-input {
  display: block;
  width: 100%;
  font-size: 12px;
  line-height: 14px;
  &:disabled, &:disabled:hover, &:disabled:active {
    cursor: default;
    opacity: 0.8;
  }
}

.filter__block-colors {
  margin-bottom: 20px;
}

.filter__list-colors {
  display: grid;
  gap: 6px;
  grid-template-columns: 32px 32px 32px 32px 32px;
}

.filter__button-color {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid $black;
  &:disabled, &:disabled:hover, &:disabled:active {
    cursor: default;
    opacity: 0.8;
  }
}

.active-color {
  outline: 2px solid white;
}

.filter__button-filter {
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: $white;
  background-color: $beige;
  &:hover {
    background-color: $beige-hover;
  }
  &:active {
    background-color: $beige-active;
  }
  &:disabled, &:disabled:hover, &:disabled:active {
    cursor: default;
    background-color: $beige;
    opacity: 0.8;
  }
}

</style>
