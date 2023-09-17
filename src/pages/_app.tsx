import Header from '../components/Header'
import type { AppProps } from 'next/app'

import '../styles/global.scss'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Skill Up</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>
      
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default App
