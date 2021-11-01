import Head from 'next/head';
import Login from "./containers/Login";

function Home() {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  )
}

export default Home