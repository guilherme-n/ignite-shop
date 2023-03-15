import { useCart } from '../../contexts/CartProvider';
import { Handbag } from 'phosphor-react';
import { CartButtonContainer, CartItemsCounter } from './styles';

interface CartButtonProps {
	onOpenDialog: () => void;
}

export function CartButton({ onOpenDialog }: CartButtonProps) {
	const { cart } = useCart();

	return (
		<CartButtonContainer onClick={onOpenDialog}>
			<Handbag size={24} />
			{cart.length > 0 && <CartItemsCounter>{cart.length}</CartItemsCounter>}
		</CartButtonContainer>
	);
}
