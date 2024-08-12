export default defineEventHandler(async (event) => {
    // const card = getRouterParam(event, 'card')
    // const config = useRuntimeConfig(event)
    return await $fetch(`https://vue-study.skillbox.cc/api/products/${card}`)
})
