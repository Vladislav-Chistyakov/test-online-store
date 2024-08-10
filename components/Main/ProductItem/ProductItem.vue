<script setup lang="ts">
import type { Product } from '~/types'
const props = defineProps<{
  item: Product
}>()

const localPrice = computed(() => props.item.price.toLocaleString('ru-RU'))
</script>

<template>
  <li class="product-item">
    <picture class="product-item__picture">
      <img :src="item.image.file.url"
           :alt="item.title"
           class="product-item__picture-image">
    </picture>

    <div class="product-item__bottom">
      <div v-if="item" class="product-item__info">
        <p class="product-item__info-description">
          {{ item.title }}
        </p>
        <b class="product-item__info-price">
          {{ localPrice }}&nbsp;&#8381;
        </b>
      </div>


      <ul v-if="item.colors" class="product-item__list-colors">
        <li v-for="(color, indexColor) in item.colors"
            :key="indexColor"
            :style="{ backgroundColor: color.code }"
            class="product-item__list-colors-item" />
      </ul>
    </div>
  </li>
</template>

<style scoped lang="scss">
@import "assets/scss/colors";

.product-item {
  border: 1px solid $black-opacity-80;
  background-color: $black-opacity-80;
  border-radius: 14px;
  overflow: hidden;
  padding-bottom: 20px;
}

.product-item__picture {
  display: block;
  height: 250px;
  margin-bottom: 10px;
}

.product-item__picture-image {
  display: block;
  width: 100%;
  height: 100%;
}

.product-item__bottom {
  padding: 0 10px;
}

.product-item__info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.product-item__info-description {
  color: $white;
  font-size: 16px;
  line-height: 18px;
}

.product-item__info-price {
  color: $white;
  font-size: 18px;
  line-height: 20px;
}

.product-item__list-colors {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.product-item__list-colors-item {
  border: 1px solid $black;
  height: 10px;
  width: 10px;
  border-radius: 100%;
}
</style>
