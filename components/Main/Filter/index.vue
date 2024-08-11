<script setup lang="ts">
import {computed, type ComputedRef, type PropType, type Ref} from "vue";
import type {Product, Color} from "~/types";

const props = defineProps({
  listProducts: {
    type: Object as PropType<Array<Product>>,
    default: []
  },
  pending: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['filter-array', 'clear-filter'])

const filterArray: Ref<Array<Product>> = ref([])

onMounted(() => {
  filterArray.value = props.listProducts
})

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
const sortActivePrice: Ref<'up' | 'down' | 'default'> = ref('default')

const clickColorButton = function (code: string) {
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
      const filterColors = item.colors.filter(itemColor => {
        return itemColor.code === colorProduct.value
      })
      return filterColors.length
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
  computedFilterArray.value = startSortPrice.value
  emits('filter-array', computedFilterArray.value)
}

const clearFilter = function () {
  emits('clear-filter', props.listProducts)
}

const startSortPrice = computed(() => {
  if (sortActivePrice.value === 'up') {
    return [...computedFilterArray.value].sort((a, b) => a.price - b.price)
  } else if (sortActivePrice.value === 'down') {
    return [...computedFilterArray.value].sort((a, b) => b.price - a.price)
  }
  return computedFilterArray.value
})

const sortPrice = function() {
  if (sortActivePrice.value === 'default') {
    sortActivePrice.value = 'up'
  } else if (sortActivePrice.value === 'up') {
    sortActivePrice.value = 'down'
  } else {
    sortActivePrice.value = 'default'
  }
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

  <div class="filter__block-sort">
    <button @click="sortPrice" class="filter__button-sort" :disabled="pending">
      Сортировать по сумме
      <span class="filter__span-sort"
            :class="{'active-sort-up' : sortActivePrice === 'up', 'active-sort-down' : sortActivePrice === 'down'}">
        <svg v-show="sortActivePrice === 'up' || sortActivePrice === 'down'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.64645 8.64645C5.84171 8.45118 6.15829 8.45118 6.35355 8.64645L12 14.2929L17.6464 8.64645C17.8417 8.45118 18.1583 8.45118 18.3536 8.64645C18.5488 8.84171 18.5488 9.15829 18.3536 9.35355L12.3536 15.3536C12.1583 15.5488 11.8417 15.5488 11.6464 15.3536L5.64645 9.35355C5.45118 9.15829 5.45118 8.84171 5.64645 8.64645Z" fill="#414141"/>
        </svg>
      </span>
    </button>
  </div>

  <button @click="startFilter" :disabled="pending" class="filter__button-filter">
    Отфильтровать
  </button>
  <button @click="clearFilter" :disabled="pending" class="filter__button-filter">
    Сбросить фильтры
  </button>
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

.filter__block-sort {
  width: 100%;
  margin-bottom: 20px;
}

.filter__button-sort {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  background-color: $white;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
  &:disabled, &:disabled:hover, &:disabled:active {
    cursor: default;
    background-color: $white;
    opacity: 0.6;
  }
}

.filter__span-sort {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotate(180deg);
  svg {
    display: flex;
    width: fit-content;
    height: fit-content;
  }
}

.active-sort-up {
  //top: -10px;
  transform: rotate(0deg);
}

.active-sort-down {
  transform: rotate(180deg);
}

.filter__button-filter {
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: $white;
  background-color: $beige;
  margin-bottom: 10px;
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
