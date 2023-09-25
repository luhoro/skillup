import Header from '../components/Header'
import type { AppProps } from 'next/app'

import '../styles/global.scss'
import Head from 'next/head'
import Footer from '../components/Footer'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Skill Up</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
      </Head>
      
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
