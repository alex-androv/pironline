<template lang="pug">
.state-manager
  h2.section-title Состояния

  .states-diagram
    .circles-row
      StateCircle(
        :id="store.circles[0].id"
        :topFilled="store.circles[0].topFilled"
        :bottomFilled="store.circles[0].bottomFilled"
      )
      .arrow-container
         img(src="../assets/icons/arrow.svg")
      StateCircle(
        :id="store.circles[1].id"
        :topFilled="store.circles[1].topFilled"
        :bottomFilled="store.circles[1].bottomFilled"
      )

    .button-group
      UButton(
        v-for="circle in store.circles"
        :key="circle.id"
        size="lg"
        icon="i-heroicons-pencil-square"
        @click="store.openModal(circle.id)"
        class="button"
      ) Открыть {{ circle.id === 'AA' ? 'AA' : 'ББ' }}

  StateModal
</template>

<script setup lang="ts">
const store = useCirclesStore()
</script>

<style lang="sass" scoped>
.state-manager
  padding: 2rem

  @media (max-width: 480px)
    padding: 0

.section-title
  font-size: 20px
  font-weight: 700
  margin-bottom: 30px
  color: white

.states-diagram


.circles-row
  display: flex
  align-items: center
  gap: 15px
  margin-bottom: 14px



.button 
  font-size: 16px
  font-weight: 400
  background-color: #00C16A
  margin-right: 40px
  transition: background-color 0.35s, opacity 0.35s
  
  &:hover
    background-color: #006B3B

  &:disabled
    background-color: #B7B7B7

.button-group
  display: flex
  gap: 1rem
  @media (max-width: 640px)
    flex-direction: column
    align-items: flex-end
    max-width: 200px
</style>