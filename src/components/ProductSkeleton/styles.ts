import { styled } from '../../styles';

export const MainContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
});

export const ImageSkeleton = styled('div', {
	backgroundColor: '$gray800',
	width: 696,
	height: 600,
	borderRadius: 8,
});

export const LabelsSkeleton = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',

	'div:first-child': {
		backgroundColor: '$gray800',
		width: 200,
		height: 32,
		borderRadius: 8,
	},

	'div:last-child': {
		backgroundColor: '$gray800',
		width: 100,
		height: 32,
		borderRadius: 8,
	},
});
