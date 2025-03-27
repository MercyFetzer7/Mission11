import { createContext, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    updateQuantity: (bookId: number, quantity: number) => void; // For quantity updates
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

        // Add book to cart
        const addToCart = (newItem: CartItem) => {
            setCart((prevCart) => {
                // Check if the book is already in the cart
                const existingItem = prevCart.find((item) => item.bookId === newItem.bookId);
    
                if (existingItem) {
                    // If the book is already in the cart, increase the quantity
                    return prevCart.map((item) =>
                        item.bookId === newItem.bookId
                            ? {
                                  ...item,
                                  quantity: item.quantity + newItem.quantity,  // Add the new quantity to the existing one
                                  subtotal: (item.quantity + newItem.quantity) * item.price, // Update subtotal
                              }
                            : item
                    );
                } else {
                    // If the book isn't in the cart, add it with the initial quantity and calculate subtotal
                    const itemWithSubtotal = {
                        ...newItem,
                        subtotal: newItem.price * newItem.quantity, // Calculate the subtotal based on the price and quantity
                    };
                    return [...prevCart, itemWithSubtotal];
                }
            });
        };

    // Remove book from cart
    const removeFromCart = (bookId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.bookId !== bookId));
    };

    // Update book quantity in cart
    const updateQuantity = (bookId: number, quantity: number) => {
        if (quantity < 1) return; // Prevent negative or zero quantities

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.bookId === bookId
                    ? { ...item, quantity, subtotal: item.price * quantity } // Update quantity and recalculate subtotal
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
