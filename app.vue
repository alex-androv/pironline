<template lang="pug">
    .main-container
      .split-layout
        //- Левая секция
        .section-left
          h1.section-title Состояния
          .states-diagram
            .state-item
              .state-circle
                .semicircle.top
                  span AA
                .semicircle.bottom
              .arrow-container
                svg.arrow(width="200" height="20" viewBox="0 0 200 20")
                  path(d="M0 10 L190 10 M180 5 L190 10 L180 15" stroke="white" fill="none")
              .state-circle
                .semicircle.top
                  span ББ
                .semicircle.bottom
            .button-group
              UButton(
                color="green"
                icon="i-heroicons-pencil-square"
                @click="openAA"
              ) Открыть АА
              UButton(
                color="green"
                icon="i-heroicons-pencil-square"
                @click="openBB"
              ) Открыть ББ
    
        //- Правая секция
        .section-right
          h1.section-title Поиск и сортировка
          .controls
            UInput(
              v-model="search"
              placeholder="Поиск"
              icon="i-heroicons-magnifying-glass"
              color="white"
              variant="outline"
              size="lg"
              class="search-input"
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
    
          .states-grid
            .state-circle(v-for="state in filteredStates" :key="state.id" :class="{ active: state.active }")
              .semicircle.top
                span {{ state.label }}
              .semicircle.bottom
            .state-circle.add-button
              .semicircle.top
                span +
              .semicircle.bottom
    </template>
    
    <script setup lang="ts">
    const search = ref('')
    const selectedSort = ref('')
    
    const sortOptions = [
      { label: 'По алфавиту (А-Я)', value: 'asc' },
      { label: 'По алфавиту (Я-А)', value: 'desc' },
      { label: 'Сначала активные', value: 'active' },
      { label: 'Сначала неактивные', value: 'inactive' }
    ]
    
    const states = ref([
      { id: 1, label: 'Аб', active: false },
      { id: 2, label: 'Ав', active: true },
      { id: 3, label: 'Аг', active: false },
      { id: 4, label: 'Ба', active: true },
      { id: 5, label: 'Бб', active: false },
      { id: 6, label: 'Га', active: false },
    ])
    
    const filteredStates = computed(() => {
      let result = [...states.value]
      
      // Фильтрация по поиску
      if (search.value) {
        result = result.filter(state => 
          state.label.toLowerCase().includes(search.value.toLowerCase())
        )
      }
    
      // Сортировка
      switch (selectedSort.value) {
        case 'asc':
          result.sort((a, b) => a.label.localeCompare(b.label))
          break
        case 'desc':
          result.sort((a, b) => b.label.localeCompare(a.label))
          break
        case 'active':
          result.sort((a, b) => Number(b.active) - Number(a.active))
          break
        case 'inactive':
          result.sort((a, b) => Number(a.active) - Number(b.active))
          break
      }
    
      return result
    })
    
    const openAA = () => {
      // Логика открытия АА
    }
    
    const openBB = () => {
      // Логика открытия ББ
    }
    </script>
    
    <style lang="sass" scoped>
    // Основные цвета
    $primary-color: #00b341
    $background-color: #1c2128
    $border-color: #2f363d
    $text-color: #ffffff
    
    // Основной контейнер
    .main-container
      min-height: 100vh
      background-color: $background-color
      color: $text-color
      padding: 2rem
    
    // Разделение на две секции
    .split-layout
      max-width: 1920px
      margin: 0 auto
      display: grid
      grid-template-columns: 1fr 1fr
      gap: 2rem
      @media (max-width: 768px)
        grid-template-columns: 1fr
        gap: 3rem
    
    // Общие стили для секций
    .section-left, .section-right
      padding: 1rem
    
    .section-title
      font-size: 2rem
      font-weight: 500
      margin-bottom: 2rem
    
    // Стили для диаграммы состояний
    .states-diagram
      margin-bottom: 2rem
    
    .state-item
      display: flex
      align-items: center
      gap: 1rem
      margin-bottom: 2rem
    
    .arrow-container
      flex: 1
      max-width: 200px
      .arrow
        stroke-width: 2px
    
    // Стили для кругов состояний
    .state-circle
      width: 60px
      height: 64px
      position: relative
    
      .semicircle
        width: 60px
        height: 30px
        border: 2px solid $border-color
        position: absolute
        left: 0
        transition: all 0.2s ease
    
        &.top
          top: 0
          border-radius: 30px 30px 0 0
          border-bottom: none
          display: flex
          align-items: center
          justify-content: center
          span
            margin-top: 8px
            font-size: 1rem
    
        &.bottom
          bottom: 0
          border-radius: 0 0 30px 30px
          border-top: none
          margin-top: 2px
    
      &.active
        .semicircle
          border-color: $primary-color
          background-color: $primary-color
    
    // Стили для кнопок действий
    .button-group
      display: flex
      flex-direction: column
      gap: 1rem
      @media (max-width: 480px)
        width: 100%
    
    // Стили для поиска и сортировки
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
    
    // Сетка состояний
    .states-grid
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr))
      gap: 1rem
      
      .state-circle
        justify-self: center
    
    // Кнопка добавления
    .add-button
      .semicircle
        border-style: dashed
        cursor: pointer
        
        &:hover
          border-color: $primary-color
          
        span
          font-size: 1.5rem
          margin-top: 4px
    </style>