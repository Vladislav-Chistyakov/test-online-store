<script setup lang="ts">
import type {CardProduct, Product, ProductForBasket} from '~/types'
import {useCart} from "~/storage/cart";
import {computed, type Ref} from "vue";
const props = defineProps<{
  item: Product
}>()

const store = useCart()

const product: Ref<ProductForBasket | null> = ref(null)
product.value = {
  id: 0,
  color: '',
  price: 0,
  totalPrice: 0,
  productQuantity: 0,
  totalAmount: 0,
  name: '',
  category: '',
  urlImage: '',
  slug: ''
}

onMounted(() => {
  initProduct()
})

watch(() => props.item, () => {
  initProduct()
})

const localPrice = computed(() => props.item.price.toLocaleString('ru-RU'))

const initProduct = function () {
  if (product.value) {
    if (store.ifThisProduct(props.item.id, product.value?.color)) {
      product.value = store.gettingProductDate(props.item.id, product.value?.color)
    } else {
      product.value.id = props.item.id || 0
      product.value.name = props.item.title || ''
      product.value.price = props.item.price || 0
      product.value.productQuantity = 0
      product.value.urlImage = props.item.image.file?.url || ''
      product.value.slug = props.item.slug
    }
  }
}

const productQuantity = computed(() => {
  if (product.value && product.value.productQuantity) {
    return product.value.productQuantity
  }
  return 0
})

const addProduct = function () {
  if (product.value && product.value?.productQuantity >= 0) {
    product.value.productQuantity = product.value.productQuantity + 1
    product.value.totalPrice = product.value?.price * product.value?.productQuantity
    store.addItemToCart(product.value)
  }
}

const removeProduct = function () {
  if (product.value && product.value?.productQuantity) {
    product.value.productQuantity = product.value.productQuantity - 1
    product.value.totalPrice = product.value?.price * product.value?.productQuantity
    store.addItemToCart(product.value)
  }
}

</script>

<template>
  <li class="product-item">
    <div>
      <picture class="product-item__picture">
        <img :src="item.image.file.url"
             :alt="item.title"
             class="product-item__picture-image">
      </picture>

      <NuxtLink :to="{ name: 'card-slug', params: {slug: item.slug }}" class="product-item__bottom">
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
      </NuxtLink>
    </div>

    <div class="product-item__block-cart">
      <button v-if="product && product.productQuantity === 0"
              class="product-item__wrapper-button-cart"
              :disabled="productQuantity > 0"
              @click="addProduct">

        {{ 'Добавить товар в корзину' }}
      </button>
      <div v-if="productQuantity" class="product-item__wrapper-buttons">
        <button @click="removeProduct" class="product-item__wrapper-buttons-remove">-</button>
        <div class="product-item__wrapper-product-quantity">{{productQuantity}}</div>
        <button @click="addProduct" class="product-item__wrapper-buttons-add">+</button>
      </div>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin-bottom: 20px;
}

.product-item__block-cart {
  padding: 10px 10px 0;
}

.product-item__wrapper-button-cart {
  width: 100%;
  padding: 10px;
  align-items: center;
  font-size: 16px;
  line-height: 18px;
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

.product-item__wrapper-buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.product-item__wrapper-buttons-remove, .product-item__wrapper-product-quantity, .product-item__wrapper-buttons-add {
  padding: 6px 10px;
  background-color: $white;
  color: $black;
  font-size: 14px;
  line-height: 16px;
  min-width: 30px;
  text-align: center;

  &:hover {
    opacity: .8;
  }
  &:active {
    opacity: .6;
  }
}

.product-item__wrapper-product-quantity {
  &:hover, &:active {
    cursor: default;
    opacity: 1;
  }
}

</style>
