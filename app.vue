<template lang="pug">
.app-container
  .split-layout
    .left-section
      StateManager
    .right-section
      CirclesList
</template>

<style lang="sass">
.app-container
  min-height: 100vh
  background-color: #1c2128

.split-layout
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 2rem
  max-width: 1920px
  margin: 0 auto
  padding: 2rem

  @media (max-width: 768px)
    grid-template-columns: 1fr
    gap: 3rem
</style>