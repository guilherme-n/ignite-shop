import { ImageSkeleton, LabelsSkeleton, MainContainer } from './styles';

export function ProductSkeleton() {
	return (
		<MainContainer className='keen-slider__slide'>
			<ImageSkeleton />
			<LabelsSkeleton>
				<div></div>
				<div></div>
			</LabelsSkeleton>
		</MainContainer>
	);
}
