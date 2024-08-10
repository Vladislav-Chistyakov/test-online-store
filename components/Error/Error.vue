<script setup lang="ts">
defineProps({
  errorText: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<template>
  <div class="error-block">
    <h2 class="error-block__title">{{errorText}}</h2>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";
.error-block {
  width: 100%;
}

.error-block__title {
  font-size: 22px;
  line-height: 24px;
  color: $red;
}
</style>
