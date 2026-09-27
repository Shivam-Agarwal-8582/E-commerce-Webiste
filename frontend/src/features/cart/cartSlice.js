import { createSlice } from '@reduxjs/toolkit';
import { FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from '../../utils/constants';

const storedCart = localStorage.getItem('cart_items')
  ? JSON.parse(localStorage.getItem('cart_items'))
  : [];

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const grandTotal = subtotal + deliveryCharge;

  return { totalQuantity, subtotal, deliveryCharge, grandTotal };
};

const initialCalculations = calculateTotals(storedCart);

const initialState = {
  items: storedCart,
  totalQuantity: initialCalculations.totalQuantity,
  subtotal: initialCalculations.subtotal,
  deliveryCharge: initialCalculations.deliveryCharge,
  grandTotal: initialCalculations.grandTotal,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        // Enforce product stock limit
        const newQty = existing.quantity + quantity;
        existing.quantity = product.stock ? Math.min(newQty, product.stock) : newQty;
      } else {
        state.items.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.images?.[0] || '',
          category: product.category,
          stock: product.stock,
          quantity: product.stock ? Math.min(quantity, product.stock) : quantity,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.subtotal = totals.subtotal;
      state.deliveryCharge = totals.deliveryCharge;
      state.grandTotal = totals.grandTotal;

      localStorage.setItem('cart_items', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i._id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== productId);
        } else {
          item.quantity = item.stock ? Math.min(quantity, item.stock) : quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.subtotal = totals.subtotal;
      state.deliveryCharge = totals.deliveryCharge;
      state.grandTotal = totals.grandTotal;

      localStorage.setItem('cart_items', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((i) => i._id !== productId);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.subtotal = totals.subtotal;
      state.deliveryCharge = totals.deliveryCharge;
      state.grandTotal = totals.grandTotal;

      localStorage.setItem('cart_items', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.subtotal = 0;
      state.deliveryCharge = 0;
      state.grandTotal = 0;
      localStorage.removeItem('cart_items');
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
