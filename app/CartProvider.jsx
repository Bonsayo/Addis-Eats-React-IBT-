"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setCart(parsed);
        }
      } catch (error) {
        console.error("Unable to restore the Addis Eats cart.", error);
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to save the Addis Eats cart.", error);
    }
  }, [cart, ready]);

  const value = useMemo(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      cart,
      count,
      total,
      addToCart(dish) {
        setCart((items) => {
          const existing = items.find((item) => item.id === dish.id);
          return existing
            ? items.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
            : [...items, { ...dish, quantity: 1 }];
        });
      },
      setQuantity(id, quantity) {
        setCart((items) => quantity < 1
          ? items.filter((item) => item.id !== id)
          : items.map((item) => item.id === id ? { ...item, quantity } : item));
      },
      removeFromCart(id) {
        setCart((items) => items.filter((item) => item.id !== id));
      },
      clearCart() {
        setCart([]);
      },
    };
  }, [cart]);

  return <CartContext.Provider value={{ ...value, ready }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
