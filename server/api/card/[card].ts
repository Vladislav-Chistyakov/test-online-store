export default defineEventHandler(async (event) => {
    const card = getRouterParam(event, 'card')
    const config = 'https://vue-study.skillbox.cc/api/products'
    return await $fetch(`${config}/${card}`)
})
