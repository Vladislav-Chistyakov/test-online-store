export default defineEventHandler(async (event) => {
    // const config = useRuntimeConfig(event)
    return await $fetch('https://vue-study.skillbox.cc/api/products')
})
