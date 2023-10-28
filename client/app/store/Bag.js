import { create } from "zustand";

export const useBagStore = create((set, get) => ({
  packages: null,
  addOns: [],
  totalCount: () => get().addOns.length + (get().packages ? 1 : 0),
  addPackage: (newPackages) => {
    set((state) => ({
      packages: newPackages
    }))
  },
  removePackage: () => {
    set((state) => ({
      packages: null
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