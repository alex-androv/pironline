<template lang="pug">
.circles-section
  h2.section-title Поиск и сортировка

  .controls
    UInput(
      v-model="searchQuery"
      placeholder="Поиск"
      icon="i-heroicons-magnifying-glass"
      color="white"
      variant="outline"
      size="lg"
      class="search-input"
      @input="handleSearch"
    )
    USelect(
      v-model="selectedSort"
      :options="sortOptions"
      placeholder="Сортировка"
      color="white"
      variant="outline"
      size="lg"
      class="sort-select"
    )

  .circles-grid
    CircleItem(
      v-for="circle in store.filteredAndSortedCircles"
      :key="circle.id"
      v-bind="circle"
    )
    .state-circle.add-circle(@dblclick.left="handleAddCircle")
      .semicircle.top
        span +
      .semicircle.bottom
</template>

<script setup lang="ts">
import type { SortType } from '~/types/circle'

const store = useCirclesListStore()

const searchQuery = ref('')
const selectedSort = ref<SortType | null>(null)

const sortOptions = [
  { label: 'По алфавиту', value: 'alphabet' },
  { label: 'По цвету', value: 'color' },
  { label: 'По цвету и алфавиту', value: 'colorAndAlphabet' }
]

const handleSearch = () => {
  store.setSearchQuery(searchQuery.value)
}

const handleAddCircle = () => {
    store.addRandomCircle()
}

watch(searchQuery, (newValue) => {
  store.setSearchQuery(newValue)
})

watch(selectedSort, (newValue) => {
  store.setSortType(newValue)
})
</script>

<style lang="sass" scoped>
.circles-section
  padding: 2rem

.section-title
  font-size: 2rem
  font-weight: 500
  margin-bottom: 2rem
  color: white

.controls
  display: flex
  gap: 1rem
  margin-bottom: 2rem
  
  @media (max-width: 480px)
    flex-direction: column

  .search-input
    flex: 1
    max-width: 400px
    @media (max-width: 480px)
      max-width: 100%

  .sort-select
    width: 200px
    @media (max-width: 480px)
      width: 100%

.circles-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr))
  gap: 1rem
  justify-items: center

.state-circle
  width: 60px
  height: 64px
  position: relative

  &.add-circle
    .semicircle
      border-style: dashed
      cursor: pointer
      transition: border-color 0.35s

      &:hover
        border-color: #00b341

      &.top
        span
          font-size: 1.5rem
          margin-top: 4px

.semicircle
  width: 60px
  height: 30px
  border: 2px solid #2f363d
  position: absolute
  left: 0

  &.top
    top: 0
    border-radius: 30px 30px 0 0
    border-bottom: none
    display: flex
    align-items: center
    justify-content: center
    
    span
      color: white
      margin-top: 8px

  &.bottom
    bottom: 0
    border-radius: 0 0 30px 30px
    border-top: none
    margin-top: 2px
</style>