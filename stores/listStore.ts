import { defineStore } from 'pinia'
import type { Circle, SortType } from '~/types/circle'

interface CirclesState {
  circles: Circle[]
  searchQuery: string
  sortType: SortType | null
}

export const useCirclesListStore = defineStore('circles-list', {
  state: (): CirclesState => ({
    circles: [
      { id: '1', label: 'Аб', topFilled: false },
      { id: '2', label: 'Ав', topFilled: true, color: '#33C078' },
      { id: '3', label: 'Аг', topFilled: false },
      { id: '4', label: 'Ба', topFilled: true, color: '#33C078' },
      { id: '5', label: 'Бб', topFilled: false },
      { id: '6', label: 'Га', topFilled: false }
    ],
    searchQuery: '',
    sortType: null
  }),

  getters: {
    filteredAndSortedCircles: (state) => {
      let result = [...state.circles]

      if (state.searchQuery) {
        result = result.filter(circle => 
          circle.label.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      }

      switch (state.sortType) {
        case 'alphabet':
          result.sort((a, b) => a.label.localeCompare(b.label))
          break
        case 'color':
          result.sort((a, b) => {
            if (a.topFilled === b.topFilled) return 0
            return a.topFilled ? -1 : 1
          })
          break
        case 'colorAndAlphabet':
          result.sort((a, b) => {
            if (a.topFilled === b.topFilled) {
              return a.label.localeCompare(b.label)
            }
            return a.topFilled ? -1 : 1
          })
          break
      }

      return result
    }
  },

  actions: {
    addRandomCircle() {
      const upperAlphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ'
      const lowerAlphabet = 'абвгдежзиклмнопрстуфхцчшщэюя'
      
      const firstLetter = upperAlphabet[Math.floor(Math.random() * upperAlphabet.length)]
      const secondLetter = lowerAlphabet[Math.floor(Math.random() * lowerAlphabet.length)]
      const label = firstLetter + secondLetter
      
      const topFilled = Math.random() > 0.5

      const circle: Circle = {
        id: Date.now().toString(),
        label,
        topFilled,
        color: topFilled ? '#33C078' : undefined
      }

      this.circles.push(circle)
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setSortType(type: SortType | null) {
      this.sortType = type
    }
  }
})