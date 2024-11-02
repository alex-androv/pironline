<template lang="pug">
  button.custom-button(
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="$emit('click')"
  )
    .arrow →
    span Своя
    .arrow →
    span кнопка
  </template>
  
  <script setup lang="ts">
  interface Props {
    disabled?: boolean
  }
  
  defineProps<Props>()
  defineEmits<{
    (e: 'click'): void
  }>()
  </script>
  
  <style lang="sass" scoped>
  .custom-button
    background-color: #9333C0 // Default состояние - фиолетовый
    border: none
    border-radius: 10px
    padding: 16px 24px
    color: white
    display: flex
    align-items: center
    gap: 8px
    cursor: pointer
    font-size: 16px
    transition: background-color 0.35s
    
    // Default состояние
    .arrow
      font-size: 20px
      transition: transform 0.35s
      font-weight: 300
    
    // Hover состояние
    &:hover:not(:disabled)
      background-color: #CC7EF0
      .arrow
        &:first-child
          transform: translateX(-2px)
        &:nth-child(3)
          transform: translateX(2px)
    
    // Disabled состояние
    &.disabled
      background-color: #555555
      cursor: not-allowed
      .arrow
        opacity: 0.5
  
    span
      font-weight: 400
      &:first-of-type
        margin-right: 4px
  </style>