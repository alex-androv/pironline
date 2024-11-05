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
  background-color: #202932
  padding: 100px 300px

  @media (max-width: 1700px)
    padding: 100px 175px 100px 100px
  @media (max-width: 768px)
    padding: 40px
  @media (max-width: 640px)
    padding: 10px

.split-layout
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 2rem
  max-width: 1920px
  margin: 0 auto
  padding: 2rem

  @media (max-width: 1500px)
    display: flex
    flex-direction: column
  @media (max-width: 768px)
    grid-template-columns: 1fr
    gap: 3rem

  .left-section
    border-right: 1px solid rgba(255, 255, 255, 0.2)
    padding-right: 50px

    @media (max-width: 1500px)
      border-right: none
</style>