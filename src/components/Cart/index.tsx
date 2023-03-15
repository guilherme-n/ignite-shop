import * as Dialog from '@radix-ui/react-dialog';
import {
	Content,
	CloseButton,
	Product,
	TShirtContainer,
	DialogOverlay,
	ProductsList,
	AmountLabel,
	PriceLabel,
	PlaceOrderButton,
} from './styles';
import { X } from 'phosphor-react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartProvider';
import { moneyFormatter } from '@/utils/formatter';
import { Product as ProductType } from '@/types/product';

interface CartProps {
	isOpen: boolean;
	onClose: () => void;
}
export function Cart({ isOpen, onClose }: CartProps) {
	const [transformSize, setTransformSize] = useState(0);
	const { cart, removeFromCart } = useCart();

	const totalPrice = useMemo(
		() => cart.reduce((acc, product) => (acc += product.price), 0),
		[cart]
	);

	useEffect(() => {
		if (isOpen) {
			setTransformSize(-480);
		} else {
			setTransformSize(0);
		}
	}, [isOpen]);

	function handleRemoveFromCart(product: ProductType) {
		removeFromCart(product);
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay asChild>
				<DialogOverlay />
			</Dialog.Overlay>
			<Dialog.Content asChild>
				<Content
					css={{
						transform: `translateX(${transformSize}px)`,
					}}
				>
					<Dialog.Close asChild onClick={onClose}>
						<CloseButton>
							<X size={24} />
						</CloseButton>
					</Dialog.Close>

					<div>
						<h2>Your Cart</h2>
						<ProductsList>
							{cart.map((product) => (
								<Product key={product.id}>
									<TShirtContainer>
										<Image
											src={product.imageUrl}
											width={102}
											height={90}
											alt='T Shirt'
										/>
									</TShirtContainer>

									<div>
										<span>{product.name}</span>
										<span>{moneyFormatter.format(product.price)}</span>
										<button onClick={() => handleRemoveFromCart(product)}>
											Remove
										</button>
									</div>
								</Product>
							))}
						</ProductsList>
					</div>
					<div>
						<AmountLabel>
							<span>Amount</span>
							<span>{cart.length} item(s)</span>
						</AmountLabel>
						<PriceLabel>
							<span>Total price</span>
							<span>{moneyFormatter.format(totalPrice)}</span>
						</PriceLabel>
						<PlaceOrderButton disabled={cart.length === 0}>
							Place order
						</PlaceOrderButton>
					</div>
				</Content>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
