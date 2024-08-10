export default defineEventHandler(async (event) => {
    const card = getRouterParam(event, 'card')
    const config = useRuntimeConfig(event)
    return await $fetch(`${config.public.host}/${card}`)
})
