import { styled } from '../../styles';

export const CartButtonContainer = styled('button', {
	padding: '0.75rem',
	background: '$gray800',
	borderRadius: 6,
	border: 0,
	color: '$gray500',
	lineHeight: 0,
});

export const CartItemsCounter = styled('span', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	position: 'absolute',
	top: 30,
	right: 35,

	backgroundColor: '$green500',
	color: '$white',
	borderRadius: '50%',

	width: '1.375rem',
	height: '1.375rem',

	fontSize: '0.875rem',
});
