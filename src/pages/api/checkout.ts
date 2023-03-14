import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id, priceId } = req.body;

	if (req.method !== 'POST') {
		return res.status(405);
	}

	if (!priceId) {
		return res.status(400).json({ error: 'Invalid price id' });
	}

	const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = `${process.env.NEXT_URL}/product/${id}`;

	const checkoutSession = await stripe.checkout.sessions.create({
		success_url: successUrl,
		cancel_url: cancelUrl,
		mode: 'payment',
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
	});

	return res.status(201).json({
		checkoutUrl: checkoutSession.url,
	});
}
