<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="footer__container container">
      <h4 class="footer__heading">Kotiki/kayotiki</h4>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "assets/scss/_colors";
@import "assets/scss/container";

.footer {
  width: 100%;
  padding: 30px 0;
  background-color: $application-bg;
  color: $white;
}

.footer__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer__heading {
  font-size: 12px;
  line-height: 14px;
}
</style>
