import { stripe } from '../lib/stripe';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
	SuccessContainer,
	ImageContainer,
	TShirtsList,
} from '../styles/pages/success';
import Stripe from 'stripe';
import Head from 'next/head';

interface SuccessProps {
	customerName: string;
	products: {
		id: string;
		name: string;
		imageUrl: string;
	}[];
}

export default function Success({ customerName, products }: SuccessProps) {
	return (
		<>
			<Head>
				<title>Order confirmed | Ignite Shop</title>
				<meta name='robots' content='noindex' />
			</Head>
			<SuccessContainer>
				<TShirtsList>
					{products.map((product) => {
						return (
							<ImageContainer key={product.id}>
								<Image src={product.imageUrl} alt='' width={140} height={140} />
							</ImageContainer>
						);
					})}
				</TShirtsList>

				<h1>Order placed!</h1>

				<p>
					Hooray <strong>{customerName}</strong>, your order is on its way!
				</p>

				<Link href='/'>Back to catalog</Link>
			</SuccessContainer>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	if (!query.session_id) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const sessionId = String(query.session_id);

	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'line_items.data.price.product'],
	});

	const customerName = session.customer_details?.name;
	const products = session.line_items?.data.map((data) => {
		const product = data.price?.product as any as Stripe.Product;

		return { name: product.name, imageUrl: product.images[0], id: product.id };
	});

	return {
		props: {
			customerName,
			products,
		},
	};
};
