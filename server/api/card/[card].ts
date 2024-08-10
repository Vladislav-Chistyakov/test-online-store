export default defineEventHandler(async (event) => {
    const card = getRouterParam(event, 'card')
    const config = useRuntimeConfig(event)
    console.warn('${config.public.host}/${card}')
    console.warn(`${config.public.host}/${card}`)
    return await $fetch(`${config.public.host}/${card}`)
})
