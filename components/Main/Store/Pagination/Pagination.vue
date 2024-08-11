<script setup lang="ts">

const emits = defineEmits(['newActivePage'])
defineProps({
  numberOfPages: {
    type: Number,
    required: true
  },
  activePage: {
    type: Number,
    required: true
  },
  arrayPages: {
    type: Array<Number>,
    required: true
  }
})

const newActivePage = function (page: number) {
  emits('newActivePage', page)
}

</script>

<template>
  <ul v-if="numberOfPages" class="pagination-list">
    <li v-if="activePage !== 1"
        class="pagination-list__item">
      <button v-text="'<'"
              @click.prevent="newActivePage(activePage - 1)"
              class="pagination-list__button"
      />
    </li>
    <li v-for="(page, indexPage) in arrayPages"
        :key="`page_${indexPage}`"
        class="pagination-list__item">
      <button v-text="page"
              :disabled="page === activePage"
              @click.prevent="newActivePage(page)"
              class="pagination-list__button"
      />
    </li>
    <li v-if="activePage !== numberOfPages"
        class="pagination-list__item">
      <button v-text="'>'"
              @click.prevent="newActivePage(activePage + 1)"
              class="pagination-list__button"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">

.pagination-list {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  padding: 12px 0;
}

.pagination-list__button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  min-height: 30px;
  color: white;
  padding: 5px 7px;
  background-color: #A4A7AA;
  border-radius: 6px;
  &:disabled {
    cursor: default;
    opacity: .4;
  }
}
</style>
