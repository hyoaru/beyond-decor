import { create } from "zustand";

export const useBagStore = create((set, get) => ({
  mainPackage: null,
  addOns: [],

  totalCount: () => get().addOns.length + (get().mainPackage ? 1 : 0),

  getTotalPrice: () => {
    const mainPackagePrice = get().mainPackage ? get().mainPackage.price : 0
    const addOnsTotal = get().addOns ? get().addOns.reduce((accumulator, addOn) => { return accumulator + addOn.price }, 0) : 0
    return mainPackagePrice + addOnsTotal
  },

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