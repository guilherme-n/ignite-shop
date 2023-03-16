import { CART_LOCAL_STORAGE_KEY, useCart } from '../../contexts/CartContext';
import { Handbag } from 'phosphor-react';
import { CartButtonContainer, CartItemsCounter } from './styles';
import { useEffect } from 'react';
import { Product } from '../../types/product';

interface CartButtonProps {
	onOpenDialog: () => void;
}

export function CartButton({ onOpenDialog }: CartButtonProps) {
	const { cart, addToCart } = useCart();

	useEffect(() => {
		const data = localStorage.getItem(CART_LOCAL_STORAGE_KEY);

		if (data) {
			const cart = JSON.parse(data) as Product[];
			addToCart(cart);
		}
	}, []);

	return (
		<CartButtonContainer onClick={onOpenDialog}>
			{cart.length > 0 && <CartItemsCounter>{cart.length}</CartItemsCounter>}
			<Handbag size={24} />
		</CartButtonContainer>
	);
}
