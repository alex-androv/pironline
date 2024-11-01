export interface Circle {
    id: string
    label: string
    topFilled: boolean
    color?: string 
}
  
export type SortType = 'alphabet' | 'color' | 'colorAndAlphabet'