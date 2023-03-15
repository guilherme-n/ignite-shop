import * as Dialog from '@radix-ui/react-dialog';
import { Content, CloseButton } from './styles';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';

interface CartProps {
	isOpen: boolean;
	onClose: () => void;
}
export function Cart({ isOpen, onClose }: CartProps) {
	const [transformSize, setTransformSize] = useState(0);

	useEffect(() => {
		if (isOpen) {
			setTransformSize(-480);
		} else {
			setTransformSize(0);
		}
	}, [isOpen]);

	return (
		<Dialog.Portal>
			<Dialog.Overlay />
			<Dialog.Content asChild>
				<Content
					css={{
						transform: `translateX(${transformSize}px)`,
					}}
				>
					<Dialog.Close asChild onClick={onClose}>
						<CloseButton>
							<X size={24} />
						</CloseButton>
					</Dialog.Close>
					<h2>Your Cart</h2>
				</Content>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
