<script setup lang="ts">
import Loader from '~/components/Loader.vue'
import Error from '~/components/Error/Error.vue'
import {$fetch} from "ofetch";
import {useCart} from "~/storage/cart";
import type { CardProduct, ProductForBasket } from "~/types";
import {computed, type Ref} from 'vue'

const card: Ref<CardProduct | null> = ref(null)
const pending = ref(true)
const errorText = ref('')
const route = useRoute()
const store = useCart()

// TODO Усовершенствовать
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
  urlImage: ''
}

// Убрать в Store
const localPrice = computed(() => {
  if (card.value && card.value.price) {
    return card.value.price.toLocaleString('ru-RU')
  }
  return 0
})

onMounted(async () => {
  pending.value = true
  // Обращение к серверу, оставить
  await $fetch(`/api/card/${route.params.slug}`)
      .then((data: CardProduct) => {
        card.value = data
        errorText.value = ''
        if (product.value && card.value && card.value?.id) {
          product.value.id = card.value?.id || 0
          product.value.name = card.value?.title || ''
          product.value.price = card.value?.price || 0
          product.value.productQuantity = 0
          product.value.urlImage = card.value?.image?.file?.url || ''
          product.value.category = card.value?.category?.slug || ''
        }
      })
      .catch((error) => {
        console.error('Error fetch getProducts: ', error)
        errorText.value = error
      })
      .finally(() => {
        pending.value = false
      })
})

const test = computed(() => {
  return store.arrayItemsCard
})

// Хз что с этим делать, пока оставляем
const productQuantity = computed(() => {
  if (product.value && product.value.productQuantity) {
    return product.value.productQuantity
  }
  return 0
})

// Хз что с этим делать, пока оставляем
const addProduct = function () {
  if (product.value && product.value?.productQuantity >= 0) {
    product.value.productQuantity = product.value.productQuantity + 1
    store.addItemToCart(product.value)
  }
}

// Хз что с этим делать, пока оставляем
const removeProduct = function () {
  if (product.value && product.value?.productQuantity) {
    product.value.productQuantity = product.value.productQuantity - 1
    store.addItemToCart(product.value)
  }
}

const deleteProduct = function () {
  if (product.value) {
    store.deleteProduct(product.value)
  }
}

</script>

<template>
  <div class="card">
    <div class="card__container container">
      <Loader v-if="pending" />
      <Error v-if="errorText" :error-text="errorText" />
      <div v-if="card" class="card__wrapper">

        <div class="card__wrapper-info">
          <picture class="card__picture">
            <img :src="card.image.file.url" alt="item.name" class="card__image">
          </picture>

          <div v-if="card" class="card__info">
            <p class="card__info-description">
              {{ card.title }}
            </p>
            <b class="card__info-price">
              {{ localPrice }}&nbsp;&#8381;
            </b>
          </div>

          <ul v-if="card.colors" class="card__list-colors">
            <li v-for="(color, indexColor) in card.colors"
                :key="indexColor"
                :style="{ backgroundColor: color.code }"
                class="card__list-colors-item" />
          </ul>
        </div>
        <div class="card__wrapper-block-buttons">
          <button v-if="product && product.productQuantity >= 0"
                  class="card__wrapper-button-cart"
                  :disabled="productQuantity > 0"
                  @click="addProduct">

            {{ productQuantity ? 'Товар добавлен в корзину' : 'Добавить товар в корзину' }}
          </button>
<!--          <div v-if="productQuantity"-->
<!--                  class="card__wrapper-button-cart-info">-->
<!--            -->
<!--          </div>-->
          <div v-if="productQuantity" class="card__wrapper-buttons">
            <button @click="removeProduct" class="card__wrapper-buttons-remove">-</button>
            <div class="card__wrapper-product-quantity">{{productQuantity}}</div>
            <button @click="addProduct" class="card__wrapper-buttons-add">+</button>
          </div>
          <button @click="deleteProduct">Удалить продукт</button>
        </div>
      </div>
      <div style="background-color: #A4A7AA">
        <pre>
          {{ test }}
        </pre>
      </div>
      <div style="background-color: #A4666A">
        <pre>
          {{ product }}
        </pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";
@import "assets/scss/container";

.card {
  height: 100%;
  padding-top: 100px;
  background-color: $beige-light;
  padding-bottom: 40px;
}

.card__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
}

.card__wrapper-info {
  display: flex;
  flex-direction: column;
  background-color: #2A2828;
  padding: 15px 20px;
}

.card__picture {
  display: flex;
  max-width: 400px;
  height: 400px;
  margin-bottom: 15px;
}

.card__image {
  display: flex;
  width: 100%;
  height: 100%;
}

.card__info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.card__info-description {
  color: $white;
  font-size: 16px;
  line-height: 18px;
}

.card__info-price {
  color: $white;
  font-size: 18px;
  line-height: 20px;
}

.card__list-colors {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.card__list-colors-item {
  border: 1px solid $black;
  height: 10px;
  width: 10px;
  border-radius: 100%;
}

.card__wrapper-block-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px 20px;
  background-color: $black;
  height: fit-content;
}

.card__wrapper-button-cart {
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

.card__wrapper-buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.card__wrapper-buttons-remove, .card__wrapper-product-quantity, .card__wrapper-buttons-add {
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

.card__wrapper-product-quantity {
  &:hover, &:active {
    cursor: default;
    opacity: 1;
  }
}

</style>
