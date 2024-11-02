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
         :ui="uiConfig"
         :class="$style.sortSelect"
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
               span +
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
       icon: 'i-heroicons-pencil-square'
     },
     { 
       label: 'По цвету',
       value: 'color',
       icon: 'i-heroicons-pencil-square'
     },
     { 
       label: 'По цвету и алфавиту',
       value: 'colorAndAlphabet',
       icon: 'i-heroicons-pencil-square'
     }
    ]
    
    const uiConfig = {
     base: 'relative',
     button: 'bg-white dark:bg-gray-900 hover:bg-[#E6FFFC]',
     container: 'w-full relative',
     width: 'w-full',
     height: 'h-10',
     rounded: 'rounded-lg',
     ring: 'focus:ring-0',
     padding: 'px-3 py-2',
     icon: {
       base: 'flex-shrink-0 text-gray-400 dark:text-gray-500',
       selected: 'text-gray-400',
       active: 'text-gray-400',
       inactive: 'text-gray-400'
     },
     option: {
       base: 'relative flex items-center gap-2 p-2 cursor-pointer select-none',
       active: 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800',
       inactive: 'text-gray-900 dark:text-white',
       icon: {
         base: 'flex-shrink-0 h-4 w-4 text-gray-400'
       }
     }
    }
    
    // Создаем специальный элемент для кнопки добавления
    const addButtonItem = {
     isAddButton: true,
     id: 'add-button'
    }
    
    // Вычисляем все ряды, включая ряд с кнопкой добавления
    const allRows = computed(() => {
     const circles = store.filteredAndSortedCircles
     const rows = []
     let currentRow = []
    
     // Распределяем круги по рядам
     for (let i = 0; i < circles.length; i++) {
       currentRow.push(circles[i])
       
       // Если ряд заполнен или это последний круг
       if (currentRow.length === CIRCLES_PER_ROW || i === circles.length - 1) {
         rows.push([...currentRow])
         currentRow = []
       }
     }
    
     // Добавляем кнопку добавления
     if (circles.length === 0) {
       // Если нет кругов, кнопка будет единственным элементом в первом ряду
       rows.push([addButtonItem])
     } else {
       const lastRow = rows[rows.length - 1]
       
       if (lastRow.length < CIRCLES_PER_ROW) {
         // Если в последнем ряду есть место, добавляем кнопку туда
         lastRow.push(addButtonItem)
       } else {
         // Если последний ряд полный, создаем новый ряд для кнопки
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
    
    .circles-container
     display: flex
     flex-direction: column
     gap: 2rem
    
    .circles-row
     display: flex
     gap: 2rem
     align-items: center
     margin-bottom: 2rem
     
     &:last-child
       margin-bottom: 0
    
    .state-circle
     &.add-circle
       width: 60px
       height: 60px
       border: 2px solid #2f363d
       border-radius: 50%
       cursor: pointer
       transition: border-color 0.35s
       position: relative
       display: flex
       align-items: center
       justify-content: center
       border-style: dashed
    
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
    
    @media (max-width: 768px)
     .circles-row
       flex-wrap: wrap
       justify-content: flex-start
    </style>
    
    <style module lang="sass">
    .sortSelect
     :global(.u-select)
       position: relative
       max-width: 200px
       transition: background-color 0.35s
    
     :global(.u-select-button)
       background-color: white
       border-radius: 10px
       transition: background-color 0.35s
       font-size: 16px
       font-weight: 400
       color: #1F2937
       height: auto
       padding: 12px 16px
    
       &:hover
         background-color: #E6FFFC
    
     :global(.u-select-dropdown)
       background-color: white
       border-radius: 10px
       padding: 8px 0
       margin-top: 4px
       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
    
     :global(.u-select-option)
       padding: 12px 16px
       font-size: 16px
       font-weight: 400
       color: #1F2937
       transition: background-color 0.35s
       display: flex
       align-items: center
       gap: 8px
    
       &:hover
         background-color: #E6FFFC
    
       svg
         width: 20px
         height: 20px
         color: #6B7280
    </style>