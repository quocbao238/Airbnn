import { create } from 'zustand'

interface RentMOdalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useRentModal = create<RentMOdalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useRentModal
