import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD": {
      const existing = state.items.find(
        (i) => i.id === action.product.id && i.size === action.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id && i.size === action.size
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, size: action.size, qty: 1 }],
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.id && i.size === action.size)
        ),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id && i.size === action.size
            ? { ...i, qty: Math.max(1, action.qty) }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };

    default:
      return state;
  }
}

const INITIAL = { items: [], drawerOpen: false };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL, (init) => {
    try {
      const stored = localStorage.getItem("lareji_cart");
      return stored ? { ...init, items: JSON.parse(stored) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem("lareji_cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart    = (product, size) => {
    dispatch({ type: "ADD", product, size: size || product.sizes?.[0] || "1kg" });
    dispatch({ type: "OPEN_DRAWER" });
  };
  const removeFromCart = (id, size)      => dispatch({ type: "REMOVE", id, size });
  const updateQty      = (id, size, qty) => dispatch({ type: "UPDATE_QTY", id, size, qty });
  const clearCart      = ()              => dispatch({ type: "CLEAR" });
  const openDrawer     = ()              => dispatch({ type: "OPEN_DRAWER" });
  const closeDrawer    = ()              => dispatch({ type: "CLOSE_DRAWER" });

  const cartCount = state.items.reduce((s, i) => s + i.qty, 0);
  const cartTotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        drawerOpen: state.drawerOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};