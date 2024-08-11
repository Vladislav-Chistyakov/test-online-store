export default defineEventHandler(async (event) => {
    return await $fetch(`https://vue-study.skillbox.cc/api/products`)
})
