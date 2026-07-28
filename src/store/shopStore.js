import { create } from "zustand";

const useShopStore = create((set) => ({
    wishlist: [],
    wishlistLoading: false,
    setWishlist: (value) =>
        set((state) => ({
            wishlist: typeof value === "function" ? value(state.wishlist) : value,
        })),
    setWishlistLoading: (value) => set({ wishlistLoading: value }),

    cart: [],
    setCart: (value) =>
        set((state) => ({
            cart: typeof value === "function" ? value(state.cart) : value,
        })),
}));

export default useShopStore;