<template lang="pug">
.app-container
  StateManager
</template>

<script setup lang="ts">
import { useCirclesStore } from '~/stores/circleStore'
const store = useCirclesStore()
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

body
  font-family: system-ui, -apple-system, sans-serif
  
.app-container
  min-height: 100vh
  background-color: #1c2128
  padding: 2rem
</style>