<template lang="pug">
  .modal-backdrop(v-if="store.modal.isOpen" @click.self="store.closeModal")
    .modal-window
      .modal-content
        h3.modal-title Модальное окно {{ currentCircleId }}
        .circle-section-wrap
          .circle-flex
            .circle-section
              UCheckbox(
                v-model="store.modal.currentCircle.topChecked"
                label="Закрасить верхнюю часть текущего шарика"
              )
              UCheckbox(
                v-model="store.modal.currentCircle.bottomChecked"
                label="Закрасить нижнюю часть текущего шарика"
              )
    
            .circle-section
              UCheckbox(
                v-model="store.modal.otherCircle.topChecked"
                :label="`Закрасить верхнюю часть шарика ${otherCircleId}`"
              )
              UCheckbox(
                v-model="store.modal.otherCircle.bottomChecked"
                :label="`Закрасить нижнюю часть шарика ${otherCircleId}`"
              )
  
        .modal-actions
          button(
            class="cancel_btn"
            @click="store.closeModal"
            
          ) Отмена
          CustomButton(@click="store.applyChanges") Своя кнопка
  </template>
  
  <script setup lang="ts">
  const store = useCirclesStore()
  
  const currentCircleId = computed(() => 
    store.modal.type === 'AA' ? 'AA' : 'ББ'
  )
  
  const otherCircleId = computed(() => 
    store.modal.type === 'AA' ? 'ББ' : 'AA'
  )
  
  // Закрытие по Escape
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
  
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && store.modal.isOpen) {
      store.closeModal()
    }
  }
  </script>
  
  <style lang="sass" scoped>
  .modal-backdrop
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: flex
    align-items: center
    justify-content: center
    z-index: 1000
  
  .modal-window
    max-width: 800px
    width: 800px
    border-radius: 10px 0 10px 10px
    background-color: #334155
    animation: modal-appear 0.3s ease
  
  .modal-content
    display: flex
    flex-direction: column
    gap: 2rem
    padding: 40px
  
  .modal-title
    font-weight: 700
    font-size: 20px
    color: #FFFFFF
  
  .circle-section-wrap
    display: flex
    flex-direction: column
    gap: 2rem

  .circle-flex
    display: flex
    justify-content: space-between

  .circle-section
    display: flex
    flex-direction: column
    gap: 1rem

  .cancel_btn
    background-color: #D0542C
    transition: background-color 0.35s, opacity 0.35s
    font-size: 16px
    font-weight: 400
    margin-right: 34px
    color: #FFFFFF
    padding: 10px 14px
    border-radius: 6px
    
    &:hover
      background-color: #A8310A

    &:disabled
      background-color: #B7B7B7
  
  .modal-actions
    display: flex
    gap: 1rem
    justify-content: flex-start
    align-items: flex-end
  
  :deep(.text-gray-700)
    color: #FFFFFF !important
    font-weight: 400 !important
  
  @keyframes modal-appear
    from
      opacity: 0
      transform: translateY(-20px)
    to
      opacity: 1
      transform: translateY(0)
  </style>