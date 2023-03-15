import { globalStyles } from '../styles/global';
import type { AppProps } from 'next/app';
import logo from '../assets/logo.svg';
import { Container, Header, CartButton } from '../styles/pages/app';
import Image from 'next/image';
import { Handbag } from 'phosphor-react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Cart } from '../components/Cart';
import { CartProvider } from '@/contexts/CartProvider';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);

	function handleOpenDialog() {
		setIsDialogOpen(true);
		setTimeout(() => setIsCartOpen(true), 100);
	}

	function handleCloseCart() {
		setIsCartOpen(false);
		setTimeout(() => setIsDialogOpen(false), 400);
	}

	return (
		<CartProvider>
			<Container>
				<Header>
					<Link href='/'>
						<Image src={logo} alt='' />
					</Link>

					<CartButton onClick={handleOpenDialog}>
						<Handbag size={24} />
					</CartButton>
				</Header>
				<Component {...pageProps} />
			</Container>

			<Dialog.Root open={isDialogOpen}>
				<Cart isOpen={isCartOpen} onClose={handleCloseCart} />
			</Dialog.Root>
		</CartProvider>
	);
}
