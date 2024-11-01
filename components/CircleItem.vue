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
 backgroundColor: props.topFilled ? (props.color || '#00b341') : 'transparent',
 borderColor: props.topFilled ? (props.color || '#00b341') : '#2f363d'
}))
</script>

<style lang="sass" scoped>
.state-circle
 width: 60px
 height: 64px
 position: relative

 .semicircle
   width: 60px
   height: 30px
   border: 2px solid #2f363d
   position: absolute
   left: 0
   transition: background-color 0.35s, border-color 0.35s

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
       color: white

   &.bottom
     bottom: 0
     border-radius: 0 0 30px 30px
     border-top: none
     margin-top: 2px

   &.filled
     background-color: #00b341
     border-color: #00b341

.add-button
 .semicircle
   border-style: dashed
   cursor: pointer
   
   &:hover
     border-color: #00b341
     
   span
     font-size: 1.5rem
     margin-top: 4px

.add-circle
 .semicircle
   border-style: dashed
   cursor: pointer

   &:hover
     border-color: #00b341

   span
     font-size: 1.5rem
     margin-top: 4px
     display: flex
     align-items: center
     justify-content: center
</style>