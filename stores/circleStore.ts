import { defineStore } from 'pinia'
import type { CircleState, ModalState } from '~/types/state'

interface CirclesState {
  circles: CircleState[]
  modal: ModalState
}

export const useCirclesStore = defineStore('circles', {
  state: (): CirclesState => ({
    circles: [
      { id: 'AA', topFilled: false, bottomFilled: false },
      { id: 'BB', topFilled: false, bottomFilled: false }
    ],
    modal: {
      isOpen: false,
      type: null,
      currentCircle: {
        topChecked: false,
        bottomChecked: false
      },
      otherCircle: {
        topChecked: false,
        bottomChecked: false
      }
    }
  }),

  getters: {
    currentCircle: (state) => state.circles.find(c => c.id === state.modal.type),
    otherCircle: (state) => state.circles.find(c => c.id !== state.modal.type),
  },

  actions: {
    openModal(type: 'AA' | 'BB') {
      const currentCircle = this.circles.find(c => c.id === type)
      const otherCircle = this.circles.find(c => c.id !== type)

      if (currentCircle && otherCircle) {
        this.modal = {
          isOpen: true,
          type,
          currentCircle: {
            topChecked: currentCircle.topFilled,
            bottomChecked: currentCircle.bottomFilled
          },
          otherCircle: {
            topChecked: otherCircle.topFilled,
            bottomChecked: otherCircle.bottomFilled
          }
        }
      }
    },

    closeModal() {
      this.modal.isOpen = false
      this.modal.type = null
    },

    applyChanges() {
      if (this.modal.type) {
        const currentCircleIndex = this.circles.findIndex(c => c.id === this.modal.type)
        if (currentCircleIndex !== -1) {
          this.circles[currentCircleIndex] = {
            ...this.circles[currentCircleIndex],
            topFilled: this.modal.currentCircle.topChecked,
            bottomFilled: this.modal.currentCircle.bottomChecked
          }
        }

        const otherCircleIndex = this.circles.findIndex(c => c.id !== this.modal.type)
        if (otherCircleIndex !== -1) {
          this.circles[otherCircleIndex] = {
            ...this.circles[otherCircleIndex],
            topFilled: this.modal.otherCircle.topChecked,
            bottomFilled: this.modal.otherCircle.bottomChecked
          }
        }
      }
      this.closeModal()
    }
  }
})