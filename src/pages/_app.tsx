import { globalStyles } from '../styles/global';
import type { AppProps } from 'next/app';
import logo from '../assets/logo.svg';
import { Container, Header, CartIcon } from '../styles/pages/app';
import Image from 'next/image';
import { Handbag } from 'phosphor-react';
import Link from 'next/link';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Container>
			<Header>
				<Link href='/'>
					<Image src={logo} alt='' />
				</Link>

				<CartIcon>
					<Handbag size={24} />
				</CartIcon>
			</Header>
			<Component {...pageProps} />
		</Container>
	);
}
