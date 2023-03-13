import { moneyFormatter } from '../../utils/formatter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';
import {
	ImageContainer,
	ProductContainer,
	ProductDetails,
} from '../../styles/pages/product';
import { Product as ProductType } from '../../types/product';
import axios from 'axios';
import { useState } from 'react';

interface ProductProps {
	product: ProductType;
}

export default function Product({ product }: ProductProps) {
	const [isSendingCheckout, setIsSendingCheckout] = useState(false);

	async function handleBuyProduct() {
		try {
			setIsSendingCheckout(true);

			const response = await axios.post('/api/checkout', {
				id: product.id,
				priceId: product.defaultPriceId,
			});

			window.location.href = response.data.checkoutUrl;
		} catch (err) {
			setIsSendingCheckout(false);
			console.log(err);
		}
	}

	return (
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={520} height={480} alt='t-shirt' />
			</ImageContainer>

			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<button onClick={handleBuyProduct} disabled={isSendingCheckout}>
					Buy now
				</button>
			</ProductDetails>
		</ProductContainer>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
	params,
}) => {
	const productId = params!.id;

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price'],
	});

	const price = product.default_price as Stripe.Price;

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: moneyFormatter.format(price.unit_amount! / 100),
				description: product.description,
				defaultPriceId: price.id,
			},
		},
		revalidate: 1 * 60 * 60,
	};
};
