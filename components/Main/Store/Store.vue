<script setup lang="ts">
import Loader from '~/components/Loader.vue'
import ProductItem from '~/components/Main/ProductItem/ProductItem.vue'
import type { Product } from '~/types'
import type { PropType } from 'vue'

defineComponent([Loader, ProductItem])
defineProps({
  listProducts: {
    type: Object as PropType<Array<Product>>,
    default: []
  },
  pending: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div class="store">
    <div v-show="pending" class="store__loader">
      <Loader></Loader>
    </div>

    <div v-if="listProducts" class="store__wrapper-products">
      <ul class="store__list-products">
        <ProductItem v-for="(item, index) in listProducts" :key="index" :item="item" />
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";

.store {
}

.store__loader {
  min-height: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store__error {
  padding: 25px 0 40px;
  color: $red;
  font-size: 22px;
  line-height: 24px;
}

.store__wrapper-products {
}

.store__list-products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.store__no-date {
}
</style>
