<script setup lang="ts">
import Card from "~/components/Main/Card/Card.vue";
import Loader from '~/components/Loader.vue'
import Error from '~/components/Error/Error.vue'
import {$fetch} from "ofetch";
import {useState} from "#app";
import {useCart} from "~/storage/cart";

const card = ref(null)
const pending = ref(false)
const errorText = ref('')
const route = useRoute()

const store = useCart()

// console.log('state', state.value)

onMounted(async () => {
  pending.value = true
  await $fetch(`/api/card/${route.params.slug}`)
      .then((data) => {
        card.value = data
        errorText.value = ''
      })
      .catch((error) => {
        console.error('Error fetch getProducts: ', error)
        errorText.value = error
      })
      .finally(() => {
        pending.value = false
      })
})

const counter = useState('counter', () => Math.round(Math.random() * 1000))

</script>

<template>
  <div class="card">
    <div class="card__container container">
      <div>
        Counter: {{ store.countCart }}
        <button @click="store.countCart++">
          +
        </button>
        <button @click="store.countCart--">
          -
        </button>
      </div>
<!--      <button @click.prevent="cartOne"> cart + 1</button>-->
      <Loader v-if="pending" />
      <Error v-if="errorText" :error-text="errorText" />
      <Card></Card>
      <span v-if="card">{{ card }}</span>
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
</style>
