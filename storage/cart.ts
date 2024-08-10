import { defineStore } from "pinia";
import {computed} from "vue";

export const useCart = defineStore('cart', () => {
    const countCart = ref(0)
    const products = ref(null)

    const numberCartProduct = computed (() => {
        return countCart
    })

    return {
        numberCartProduct,
        countCart,
        products
    }
})
