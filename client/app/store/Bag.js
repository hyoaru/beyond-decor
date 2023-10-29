import { create } from "zustand";

export const useBagStore = create((set, get) => ({
  mainPackage: null,
  addOns: [],
  totalCount: () => get().addOns.length + (get().mainPackage ? 1 : 0),
  addMainPackage: (newMainPackage) => {
    set((state) => ({
      mainPackage: newMainPackage
    }))
  },
  removeMainPackage: () => {
    set((state) => ({
      mainPackage: null
    }))
  },
  addAddOn: (newAddOn) => {
    set((state) => ({
      addOns: !state.addOns.includes(newAddOn) ? [...state.addOns, newAddOn] : state.addOns
    }))
  },
  removeAddOn: (addOnToRemove) => {
    set((state) => ({
      addOns: state.addOns.filter((addOn) => addOn !== addOnToRemove)
    }))
  }
}))