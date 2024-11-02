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
  width: 84px
  height: 87px
  position: relative

.semicircle
  width: 84px
  height: 42px
  border: 1px solid #33C078
  position: absolute
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
</style>