import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Home() {

  const router = useRouter();
  const {id} = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>CAFIEND CONNOISSEUR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src={'/hero-image.png'} width={1000} height={500} />
        <Banner/>
      </main>
    </div>
  )
}
