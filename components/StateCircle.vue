<template lang="pug">
.state-circle
  .semicircle.top(:class="{ filled: topFilled }")
    span {{ id === 'AA' ? 'AA' : 'ББ' }}
  .semicircle.bottom(:class="{ filled: bottomFilled }")
</template>

<script setup lang="ts">
interface Props {
  id: 'AA' | 'BB'
  topFilled: boolean
  bottomFilled: boolean
}

defineProps<Props>()
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
      color: #fff

  &.bottom
    bottom: 0
    border-radius: 0 0 30px 30px
    border-top: none
    margin-top: 2px

  &.filled
    background-color: #00b341
    border-color: #00b341
</style>