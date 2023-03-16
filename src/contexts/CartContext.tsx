import { Product } from '@/types/product';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

export const CART_LOCAL_STORAGE_KEY = '@ignite-shop:cart-state-1.0';

interface CartContextType {
	cart: Product[];
	addToCart: (product: Product | Product[]) => void;
	removeFromCart: (product: Product) => void;
	clearCart: () => void;
}

const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Product[]>([]);

	useEffect(() => {
		localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
	}, [cart]);

	function addToCart(products: Product | Product[]) {
		let productsArray: Product[] = [];

		if (Array.isArray(products)) {
			productsArray = [...products];
		} else {
			productsArray.push(products);
		}

		const newArray: Product[] = [];

		productsArray.forEach((product) => {
			if (cart.find((p) => p.id === product.id)) return;
			newArray.push(product);
		});

		setCart((state) => [...state, ...newArray]);
	}

	function removeFromCart(product: Product) {
		setCart((state) => {
			const newCart = state.filter((p) => p.id !== product.id);
			return [...newCart];
		});
	}

	function clearCart() {
		setCart([]);
	}

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
