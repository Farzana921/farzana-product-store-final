import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = "farzana-cart";

const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
};

const initialState: CartState = { items: loadCart() };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
      saveCart(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCart(state.items);
    },
    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (s: { cart: CartState }) => s.cart.items;
export const selectTotalProducts = (s: { cart: CartState }) => s.cart.items.length;
export const selectTotalQuantity = (s: { cart: CartState }) =>
  s.cart.items.reduce((acc, i) => acc + i.quantity, 0);
export const selectTotalPrice = (s: { cart: CartState }) =>
  s.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
