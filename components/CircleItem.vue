<template lang="pug">
.state-circle
 .semicircle.top(:class="{ filled: topFilled }", :style="topStyles")
   span {{ label }}
 .semicircle.bottom
</template>

<script setup lang="ts">
interface Props {
 label: string
 topFilled: boolean
 color?: string
}

const props = defineProps<Props>()

const topStyles = computed(() => ({
 backgroundColor: props.topFilled ? (props.color || '#33C078') : 'transparent',
 borderColor: props.topFilled ? (props.color || '#33C078') : '#33C078'
}))
</script>

<style lang="sass" scoped>
.state-circle
  width: 84px
  height: 87px
  position: relative

.semicircle
  width: 84px
  height: 42px
  border: 1px solid #33C078
  left: 0
  transition: background-color 0.35s, border-color 0.35s

  &.top
    top: 0
    border-radius: 42px 42px 0 0
    display: flex
    align-items: center
    justify-content: center
    
    span
      margin-top: 8px
      font-size: 18px
      color: #fff

  &.bottom
    bottom: 0
    border-radius: 0 0 42px 42px
    margin-top: 3px

  &.filled
    background-color: #33C078
    border-color: #33C078

.add-button
 .semicircle
   border-style: dashed
   cursor: pointer
   
   &:hover
     border-color: #33C078
     
   span
     font-size: 1.5rem
     margin-top: 4px

.add-circle
 .semicircle
   border-style: dashed
   cursor: pointer

   &:hover
     border-color: #33C078

   span
     font-size: 1.5rem
     margin-top: 4px
     display: flex
     align-items: center
     justify-content: center
</style>