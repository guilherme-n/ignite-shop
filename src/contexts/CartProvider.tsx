import { Product } from '@/types/product';
import { createContext, ReactNode, useContext, useState } from 'react';

const CartContext = createContext({} as CartValues);

interface CartValues {
	products: Product[];
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);

	return (
		<CartContext.Provider value={{ products }}>{children}</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
