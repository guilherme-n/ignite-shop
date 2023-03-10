import Image from 'next/image';
import { HomeContainer, Product } from '../styles/pages/home';

import { useKeenSlider } from 'keen-slider/react';

import { stripe } from '../lib/stripe';
import { moneyFormatter } from '../utils/formatter';

import 'keen-slider/keen-slider.min.css';
import { GetStaticProps } from 'next';
import Stripe from 'stripe';

interface HomeProps {
	products: {
		id: string;
		name: string;
		imageUrl: string;
		price: number;
	}[];
}

export default function Home({ products }: HomeProps) {
	const [sliderRef] = useKeenSlider({
		slides: {
			perView: 3,
			spacing: 48,
		},
	});

	return (
		<HomeContainer ref={sliderRef} className='kee`n-slider'>
			{products.map((product) => {
				return (
					<Product key={product.id} className='keen-slider__slide'>
						<Image
							src={product.imageUrl}
							width={520}
							height={480}
							alt='T Shirt'
						/>
						<footer>
							<strong>{product.name}</strong>
							<span>{product.price}</span>
						</footer>
					</Product>
				);
			})}
		</HomeContainer>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await stripe.products.list({
		expand: ['data.default_price'],
	});

	const products = response.data.map((p) => {
		const price = p.default_price as Stripe.Price;
		return {
			id: p.id,
			name: p.name,
			imageUrl: p.images[0],
			price: moneyFormatter.format(price.unit_amount! / 100),
		};
	});

	return {
		props: { products },
	};
};
