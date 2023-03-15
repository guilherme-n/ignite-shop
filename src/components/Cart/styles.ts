import { styled } from '../../styles';

export const DialogOverlay = styled('div', {
	background: 'rgba(0, 0, 0, 0.75)',
	position: 'fixed',
	inset: 0,
});

export const Content = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',

	position: 'fixed',
	top: 0,
	bottom: 0,
	right: -480,

	backgroundColor: '$gray800',
	width: 480,
	padding: '4.5rem 3rem 3rem 3rem',

	transition: 'transform 0.3s ease-in-out',

	h2: {
		color: '$gray100',
		fontSize: '1.25rem',
	},
});

export const CloseButton = styled('button', {
	backgroundColor: 'transparent',
	border: 'none',
	color: '$gray500',

	position: 'absolute',
	top: 24,
	right: 24,
});

export const ProductsList = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',

	marginTop: '2rem',
});

export const Product = styled('div', {
	display: 'flex',
	gap: '1.25rem',

	div: {
		display: 'flex',
		flexDirection: 'column',

		'span:first-child': {
			fontSize: '1.125rem',
			color: '$gray300',
			lineHeight: 1.6,
		},

		'span + span': {
			fontSize: '1.125rem',
			color: '$gray100',
			fontWeight: 'bold',
			lineHeight: 1.6,

			marginTop: '0.125rem',
			marginBottom: '0.5rem',
		},

		button: {
			width: 'fit-content',
			color: '$green500',
			backgroundColor: 'transparent',
			border: 'none',
			fontSize: '1rem',
			fontWeight: 'bold',
		},
	},
});

export const TShirtContainer = styled('div', {
	background: 'linear-gradient(180deg, #12a483 0%, #7465d4 100%)',
	borderRadius: 8,
	padding: '0.25rem',
	position: 'relative',
	overflow: 'hidden',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover',
	},
});

export const PlaceOrderButton = styled('button', {
	backgroundColor: '$green500',
	padding: '1.25rem',
	width: '100%',
	border: 0,
	borderRadius: 8,

	marginTop: '3.625rem',
	color: '$white',
	fontSize: '1.125rem',
	fontWeight: 'bold',
});

export const AmountLabel = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '0.5rem',
	lineHeight: 1.6,

	'span:last-child': {
		fontSize: '1.125rem',
	},
});

export const PriceLabel = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	lineHeight: 1.6,
	fontSize: '1.125rem',
	fontWeight: 'bold',

	'span:last-child': {
		fontSize: '1.5rem',
	},
});
