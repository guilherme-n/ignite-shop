import { styled } from '../../styles';

export const Content = styled('div', {
	position: 'absolute',
	top: 0,
	bottom: 0,
	right: -480,
	backgroundColor: '$gray800',
	width: 480,
	padding: '4.5rem 3rem 3rem 3rem',

	transition: 'transform 0.3s ease-in-out',
});

export const CloseButton = styled('button', {
	backgroundColor: 'transparent',
	border: 'none',
	color: '$gray500',

	position: 'absolute',
	top: 24,
	right: 24,

	'&:hover': {
		cursor: 'pointer',
	},
});
