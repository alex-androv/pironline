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
     size="xl"
     class="search-input"
     @input="handleSearch"
   )
   USelect(
     v-model="selectedSort"
     :options="sortOptions"
     placeholder="Сортировка"

   )

 .circles-container
   .circles-row(v-for="(row, index) in allRows" :key="index")
     template(v-for="item in row" :key="item.id || 'add-button'")
       CircleItem(
         v-if="!item.isAddButton"
         v-bind="item"
       )
       .state-circle.add-circle(
         v-else
         @dblclick.left="handleAddCircle"
       )
         .add-button
            img(src="../assets/icons/plus.svg")
</template>

<script setup lang="ts">
import type { SortType } from '~/types/circle'

const store = useCirclesListStore()

const searchQuery = ref('')
const selectedSort = ref<SortType | null>(null)
const CIRCLES_PER_ROW = 7

const sortOptions = [
 { 
   label: 'По алфавиту',
   value: 'alphabet',
 },
 { 
   label: 'По цвету',
   value: 'color',
 },
 { 
   label: 'По цвету и алфавиту',
   value: 'colorAndAlphabet',
 }
]


const addButtonItem = {
 isAddButton: true,
 id: 'add-button'
}


const allRows = computed(() => {
 const circles = store.filteredAndSortedCircles
 const rows = []
 let currentRow = []

 for (let i = 0; i < circles.length; i++) {
   currentRow.push(circles[i])

   if (currentRow.length === CIRCLES_PER_ROW || i === circles.length - 1) {
     rows.push([...currentRow])
     currentRow = []
   }
 }


 if (circles.length === 0) {
   rows.push([addButtonItem])
 } else {
   const lastRow = rows[rows.length - 1]
   
   if (lastRow.length < CIRCLES_PER_ROW) {
     lastRow.push(addButtonItem)
   } else {
     rows.push([addButtonItem])
   }
 }

 return rows
})

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
 @media (max-width: 480px)
    padding: 0

.section-title
 font-size: 20px
 font-weight: 700
 margin-bottom: 30px
 color: white

.controls
 display: flex
 align-items: center
 gap: 1rem
 margin-bottom: 2rem
 
 @media (max-width: 768px)
   flex-direction: column
   align-items: flex-start

 .search-input
   flex: 1
   max-width: 400px
   @media (max-width: 480px)
     max-width: 100%

 .sort-select
   width: 200px
   @media (max-width: 480px)
     width: 100%

.circles-container
 display: flex
 flex-direction: column

.circles-row
 display: flex
 gap: 2rem
 align-items: center
 margin-bottom: 2rem
 
 &:last-child
   margin-bottom: 0

.state-circle
 &.add-circle
   border-radius: 50%
   cursor: pointer
   transition: border-color 0.35s
   position: relative
   display: flex
   align-items: center
   justify-content: center
   width: 84px
   height: 87px
   border: 1px solid #33C078

   &:hover
     border-color: #00b341

   .add-button
     display: flex
     align-items: center
     justify-content: center
     width: 100%
     height: 100%
     
     span
       color: white
       font-size: 24px
       font-weight: 300
       margin-top: -2px

@media (max-width: 1120px)
 .circles-row
   flex-wrap: wrap
   justify-content: flex-start
</style>