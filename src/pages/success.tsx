import { stripe } from '../lib/stripe';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SuccessContainer, ImageContainer } from '../styles/pages/success';
import Stripe from 'stripe';
import Head from 'next/head';

interface SuccessProps {
	customerName: string;
	product: {
		name: string;
		imageUrl: string;
	};
}

export default function Success({ customerName, product }: SuccessProps) {
	return (
		<>
			<Head>
				<title>Order confirmed | Ignite Shop</title>
				<meta name='robots' content='noindex' />
			</Head>
			<SuccessContainer>
				<h1>Order confirmation</h1>

				<ImageContainer>
					<Image src={product.imageUrl} alt='' width={200} height={200}></Image>
				</ImageContainer>
				<p>
					Hooray <strong>{customerName}</strong>, your {product.name} is on its
					way!
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
	const product = session.line_items?.data[0].price
		?.product as any as Stripe.Product;

	return {
		props: {
			customerName,
			product: { name: product.name, imageUrl: product.images[0] },
		},
	};
};
