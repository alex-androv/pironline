<template lang="pug">
button.custom-button(
  :class="{ disabled: disabled }"
  :disabled="disabled"
)
  .icon-wrapper
    .arrow →
  span
    slot
  .icon-wrapper
    .arrow →
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean
}

defineProps<Props>()
</script>

<style lang="sass" scoped>
.custom-button
  background-color: #9333ea
  border: none
  border-radius: 6px
  padding: 0.75rem 1.5rem
  color: white
  display: flex
  align-items: center
  gap: 0.5rem
  cursor: pointer
  transition: background-color 0.35s, opacity 0.35s
  font-size: 1rem

  &:hover:not(:disabled)
    background-color: #a855f7

  &:disabled
    opacity: 0.5
    cursor: not-allowed
    background-color: #4b5563

.icon-wrapper
  display: flex
  align-items: center

.arrow
  font-size: 1.2rem
  transition: transform 0.35s
</style>