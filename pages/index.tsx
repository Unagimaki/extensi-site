import { NextPage } from 'next'
import Head from 'next/head'
import { LandingPage } from 'pages'

const Home: NextPage = props => {
  return (
    <>
      <Head>
        <title>extensi.one – Qualitatively New Level of Entertainment</title>
      </Head>
      <LandingPage {...props} />
    </>
  )
}

export default Home
