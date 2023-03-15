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
import Head from 'next/head';
import { useCart } from '../../contexts/CartProvider';

interface ProductProps {
	product: ProductType;
}

export default function Product({ product }: ProductProps) {
	const { addToCart, cart } = useCart();

	async function handleAddToCart() {
		addToCart(product);
	}

	const isAlreadyInTheCart = !!cart.find((p) => p.id === product.id);

	return (
		<>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>
			<ProductContainer>
				<ImageContainer>
					<Image
						src={product.imageUrl}
						width={520}
						height={480}
						alt='t-shirt'
					/>
				</ImageContainer>

				<ProductDetails>
					<h1>{product.name}</h1>
					<span>{moneyFormatter.format(product.price)}</span>

					<p>{product.description}</p>

					<button onClick={handleAddToCart} disabled={isAlreadyInTheCart}>
						Add to cart
					</button>
				</ProductDetails>
			</ProductContainer>
		</>
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
				price: price.unit_amount! / 100,
				description: product.description,
				defaultPriceId: price.id,
			},
		},
		revalidate: 1 * 60 * 60,
	};
};
