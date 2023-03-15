import { styled } from '..';

export const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	minHeight: '100vh',
});

export const Header = styled('header', {
	padding: '2rem 0',
	width: '100%',
	maxWidth: 1180,
	margin: '0 auto',
	display: 'flex',
	justifyContent: 'space-between',
});

export const CartButton = styled('button', {
	padding: '0.75rem',
	background: '$gray800',
	borderRadius: 6,
	border: 0,
	color: '$gray500',
	lineHeight: 0,
});
