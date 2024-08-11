import { defineStore } from "pinia";
import {computed} from "vue";
import type {ItemsInCart, ProductForBasket} from "~/types";
import type { Ref } from 'vue'

export const useCart = defineStore('cart', () => {
    const countCart = ref(0)
    const products = ref(null)
    const itemsInCart: Ref<Array<ProductForBasket>> = ref([]);

    const arrayItemsCard = computed<Array<ProductForBasket>>({
        get() {
            return itemsInCart.value;
        },
        set(newValue: Array<ProductForBasket>) {
            console.log('itemsInCart.value, newValue', itemsInCart.value, newValue)
            itemsInCart.value = newValue;
        }
    })

    function addItemToCart(newItem: ProductForBasket) {
        for (let index = 0; index < itemsInCart.value.length; index++) {
            if (itemsInCart.value[index].id === newItem.id && itemsInCart.value[index].color === newItem.color) {
                itemsInCart.value[index] = {...newItem}
                if (newItem.productQuantity === 0) {
                    cleaningOfProductArray()
                }
                return
            }
        }
        itemsInCart.value.push(newItem);
    }

    function deleteProduct (product: ProductForBasket) {
        for (let index = 0; index < itemsInCart.value.length; index++) {
            if (itemsInCart.value[index].id === product.id && itemsInCart.value[index].color === product.color) {
                product.productQuantity = 0
                itemsInCart.value[index] = {...product}
                cleaningOfProductArray()
                return
            }
        }
    }

    function cleaningOfProductArray () {
        arrayItemsCard.value = arrayItemsCard.value.filter(item => item.productQuantity !== 0)
    }

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

    const gettingArrayProductDate = function (id: number): Array<ProductForBasket> {
        return itemsInCart.value.filter(item => item.id === id) || []
    }

    const gettingProductDate = function (id: number, color: string): ProductForBasket | null {
        const arrayProducts = gettingArrayProductDate(id)
        if (arrayProducts.length) {
            for (const item of arrayProducts) {
                if (item.id === id && item.color === color) {
                    return {...item}
                }
            }
        }
        return null
    }

    return {
        addItemToCart,
        deleteProduct,
        numberCartProduct,
        countCart,
        products,
        itemsInCart,
        arrayItemsCard,
        ifThisProduct,
        gettingArrayProductDate,
        gettingProductDate,
    }
})
