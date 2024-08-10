import { defineStore } from "pinia";
import {computed} from "vue";
import type {ItemsInCart, ProductForBasket} from "~/types";

export const useCart = defineStore('cart', () => {
    const countCart = ref(0)
    const products = ref(null)
    const itemsInCart: Ref<ItemsInCart> = ref([])

    const arrayItemsCard = computed(() => {
        return itemsInCart
    })

    const numberCartProduct = computed (() => {
        return countCart
    })

    const ifThisProduct = function (id: number): boolean {
        for (const item of itemsInCart.value) {
            if (item.id === id) {
                return true
            }
        }
        return false
    }

    const gettingProductDate = function (id: number): ProductForBasket | null {
        for (const item of itemsInCart.value) {
            if (item.id === id) {
                return {...item}
            }
        }
        return null
    }

    return {
        arrayItemsCard,
        numberCartProduct,
        countCart,
        products,
        ifThisProduct,
        gettingProductDate
    }
})
