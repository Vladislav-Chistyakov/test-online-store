<script setup lang="ts">
import Loader from "~/components/Loader.vue";
import {useCart} from "~/storage/cart";
import {type Ref} from 'vue'
import type {ProductForBasket} from "~/types";

const arrayCart: Ref<Array<ProductForBasket>> = ref([])

const pending: Ref<boolean> = ref(true)
const state = useCart()

onMounted(async () => {
  if (state && state.arrayItemsCard) {
    arrayCart.value = state.arrayItemsCard
  }
  pending.value = false
})

</script>

<template>
  <div class="cart">
    <div class="cart__container container">
      <Loader v-if="pending" />
      <div class="cart__wrapper" v-if="arrayCart && arrayCart.length">
        <ul class="cart__list-product">
          <li v-for="(item, index) in arrayCart"
              :key="`${item.id}__${index}`"
              class="cart__item-product">
            <picture class="cart__item-product-picture">
              <img :src="item.urlImage"
                   :alt="item.name"
                   class="cart__item-product-image">
            </picture>
            <div class="cart__item-product-block" v-if="item">
              <div class="cart__item-product-left">
                <span class="cart__item-product-name">
                  Название: {{ item.name }}
                </span>
                <span class="cart__item-product-quantity">
                  Количество: {{ item.productQuantity }}
                </span>
                <span class="cart__item-product-color">
                  Цвет: {{ item.color }}
                </span>
                <span class="cart__item-product-price">
                  Цена: {{ item.price }}
                </span>
              </div>
              <div class="cart__item-product-right">
                <NuxtLink :to="`card/${item.slug}`" class="cart__item-product-page">Перейти к странице товара</NuxtLink>
                <b class="cart__item-product-total-price">Общаая&nbsp;сумма:&nbsp;{{ item.totalPrice.toLocaleString('ru-RU') }}&nbsp;&#8381;</b>
              </div>
            </div>
          </li>
        </ul>
        <div class="cart__wrapper-right">
          <NuxtLink class="cart__wrapper-right-link">Перейти к оплате</NuxtLink>
          <b class="cart__wrapper-right-total-price" v-if="state.totalPriceProducts">
            Общаая сумма за все товары: {{ state.totalPriceProducts.toLocaleString('ru-RU') }}&nbsp;&#8381;
          </b>
        </div>
      </div>
      <div v-if="state.arrayItemsCard.length === 0 ">
        <span>Корзина пуста</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";
@import "@/assets/scss/container";

.cart {
  height: 100%;
  padding-top: 100px;
  background-color: $beige-light;
  padding-bottom: 40px;
}

.cart__wrapper {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.cart__list-product {
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: $black;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart__item-product {
  display: flex;
  flex-direction: row;
  gap: 20px;
  border: 1px solid $white;
  background-color: $white;
  padding: 10px;
}

.cart__item-product-picture {
  display: block;
  height: 200px;
  width: 300px;
  padding-right: 10px;
  border-right: 1px solid $black;
}

.cart__item-product-image {
  display: block;
  width: 100%;
  height: 100%;
}

.cart__item-product-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
}

.cart__item-product-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
}

.cart__item-product-name {
}

.cart__item-product-quantity {
}

.cart__item-product-color {
}

.cart__item-product-price {
}

.cart__item-product-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  text-align: end;
  gap: 8px;
}

.cart__item-product-remove {
}

.cart__item-product-total-price {
}

.cart__wrapper-right {
  height: fit-content;
  background-color: $black;
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
  min-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
}

.cart__wrapper-right-link {
  cursor: pointer;
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
}

.cart__wrapper-right-total-price {
  color: $white;
}
</style>
