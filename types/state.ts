export interface CircleState {
    id: 'AA' | 'BB'
    topFilled: boolean
    bottomFilled: boolean
}
export interface ModalState {
    isOpen: boolean
    type: 'AA' | 'BB' | null
    currentCircle: {
    topChecked: boolean
    bottomChecked: boolean
    }
    otherCircle: {
    topChecked: boolean
    bottomChecked: boolean
    }
}