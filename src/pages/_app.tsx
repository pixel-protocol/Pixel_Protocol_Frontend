import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import Head from 'next/head'
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { NotificationProvider } from "web3uikit"


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygonMumbai, polygon,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pixel Protocol</title>
        <meta name="description" content="A Web3 renaissance of The Million Dollar Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider theme={darkTheme()} chains={chains} initialChain={polygonMumbai}>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </RainbowKitProvider>
      </WagmiConfig>


    </>
  );
}

export default MyApp;
