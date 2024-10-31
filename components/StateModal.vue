<template lang="pug">
UModal(
  v-model="store.modal.isOpen"
)
  h3.modal-title Модальное окно {{ currentCircleId }}

  .modal-content
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
      UButton(
        color="red"
        variant="soft"
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
</script>

<style lang="sass" scoped>
.modal-content
  display: flex
  flex-direction: column
  gap: 2rem
  padding: 1rem 0

.circle-section
  display: flex
  flex-direction: column
  gap: 1rem

.modal-actions
  display: flex
  gap: 1rem
  justify-content: flex-end
</style>