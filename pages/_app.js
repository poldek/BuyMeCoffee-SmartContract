import "../styles/globals.css";
import { useState } from "react";
import { MantineProvider,ColorSchemeProvider} from "@mantine/core";
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from "../components/_layout";
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme: colorScheme,
              }}
            >
            <NotificationsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </MantineProvider>
      </ColorSchemeProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
export default MyApp;
