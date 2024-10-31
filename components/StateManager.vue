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
        svg.arrow(width="70" height="20" viewBox="0 0 200 20")
          path(d="M0 10 L190 10 M180 5 L190 10 L180 15" stroke="white" fill="none")
      StateCircle(
        :id="store.circles[1].id"
        :topFilled="store.circles[1].topFilled"
        :bottomFilled="store.circles[1].bottomFilled"
      )

    .button-group
      UButton(
        v-for="circle in store.circles"
        :key="circle.id"
        color="green"
        icon="i-heroicons-pencil-square"
        @click="store.openModal(circle.id)"
      ) Открыть {{ circle.id === 'AA' ? 'AA' : 'ББ' }}

  StateModal
</template>

<script setup lang="ts">
const store = useCirclesStore()
</script>

<style lang="sass" scoped>
.state-manager
  padding: 2rem

.section-title
  font-size: 2rem
  font-weight: 500
  margin-bottom: 2rem
  color: white

.states-diagram
  display: flex
  flex-direction: column
  gap: 2rem

.circles-row
  display: flex
  align-items: center
  gap: 2rem

.arrow-container
  flex: 0 0 70px 
  .arrow
    stroke-width: 2px

.button-group
  display: flex
  gap: 1rem
  @media (max-width: 640px)
    flex-direction: column
    max-width: 200px
    margin: 0 auto
</style>