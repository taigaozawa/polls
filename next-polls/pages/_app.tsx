import '../styles/globals.css';
import { AppProps } from 'next/app'
import Head from 'next/head';
import { AuthProvider } from '../utils/AuthContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App
