<script setup lang="ts">
import Loader from '~/components/Loader.vue'
import ProductItem from '~/components/Main/ProductItem/ProductItem.vue'
import type { Product } from '~/types'
import type {ComputedRef, PropType, Ref} from 'vue'
import Pagination from "~/components/Main/Store/Pagination/Pagination.vue";

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

const numberOfCard: Ref<number> = ref(4)
const activePage: Ref<number> = ref(1)

const numberOfPages: ComputedRef<number> = computed(() => {
  if (activePageCards.value && numberOfCard.value) {
    return Math.ceil(props.listProducts.length / numberOfCard.value)
  }
  return 0
})

const activePageCards: ComputedRef<Boolean> = computed(() => {
  return numberOfCard.value < props.listProducts.length
})

const arrayPages: ComputedRef<Array<number>> | ComputedRef<[]> = computed(() => {
  const arrayNumber: Array<number> = []
  if (numberOfPages) {
    for (let i = 1; i <= numberOfPages.value; i++) {
      arrayNumber.push(i)
    }
  }
  return arrayNumber
})

const visibleListCard: ComputedRef<Array<Product>> = computed(() => {
  if (activePage.value === 1) {
    return props.listProducts.slice(0, numberOfCard.value)
  } else {
    return props.listProducts.slice(numberOfCard.value * (activePage.value - 1), numberOfCard.value * activePage.value )
  }
})

</script>

<template>
  <div class="store">
    <div v-show="pending" class="store__loader">
      <Loader></Loader>
    </div>

    <div v-if="listProducts && visibleListCard" class="store__wrapper-products">
      <ul class="store__list-products">
        <ProductItem v-for="(item, index) in visibleListCard" :key="index" :item="item" />
      </ul>
    </div>

    <div v-if="activePageCards" class="store__pagination">
      <Pagination :array-pages="arrayPages"
                  :active-page="activePage"
                  :number-of-pages="numberOfPages"
                  @new-active-page="activePage = $event"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";

.store__loader {
  min-height: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store__list-products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 30px;
}

.store__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
