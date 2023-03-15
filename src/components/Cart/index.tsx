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
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CartProps {
	isOpen: boolean;
	onClose: () => void;
}
export function Cart({ isOpen, onClose }: CartProps) {
	const [transformSize, setTransformSize] = useState(0);

	useEffect(() => {
		if (isOpen) {
			setTransformSize(-480);
		} else {
			setTransformSize(0);
		}
	}, [isOpen]);

	return (
		<Dialog.Portal>
			<Dialog.Overlay asChild>
				<DialogOverlay />
			</Dialog.Overlay>
			<Dialog.Content asChild>
				<>
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
								<Product>
									<TShirtContainer>
										<Image
											src='https://files.stripe.com/links/MDB8YWNjdF8xTWp1NGFCSTIyZGZ0U25qfGZsX3Rlc3RfVHUwMzEzVXhqV0lONFV6djlqUjFhTk5000zBaXLqZL'
											width={102}
											height={90}
											alt='T Shirt'
										/>
									</TShirtContainer>

									<div>
										<span>TShirt Igniter</span>
										<span>$15.90</span>
										<button>Remove</button>
									</div>
								</Product>
								<Product>
									<TShirtContainer>
										<Image
											src='https://files.stripe.com/links/MDB8YWNjdF8xTWp1NGFCSTIyZGZ0U25qfGZsX3Rlc3RfVHUwMzEzVXhqV0lONFV6djlqUjFhTk5000zBaXLqZL'
											width={102}
											height={90}
											alt='T Shirt'
										/>
									</TShirtContainer>
									<div>
										<span>TShirt Igniter</span>
										<span>$15.90</span>
										<button>Remove</button>
									</div>
								</Product>
							</ProductsList>
						</div>
						<div>
							<AmountLabel>
								<span>Amount</span>
								<span>2 items</span>
							</AmountLabel>
							<PriceLabel>
								<span>Total price</span>
								<span>$31.80</span>
							</PriceLabel>
							<PlaceOrderButton>Place order</PlaceOrderButton>
						</div>
					</Content>
				</>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
