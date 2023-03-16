import { Product } from '@/types/product';
import { createContext, ReactNode, useContext, useState } from 'react';

const CartContext = createContext({} as CartContextType);

interface CartContextType {
	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Product[]>([]);

	function addToCart(product: Product) {
		if (cart.find((p) => p.id === product.id)) return;

		setCart((state) => [...state, product]);
	}

	function removeFromCart(product: Product) {
		setCart((state) => {
			const newCart = state.filter((p) => p.id !== product.id);
			return [...newCart];
		});
	}

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
