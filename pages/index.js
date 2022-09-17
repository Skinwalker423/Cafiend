import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import CoffeeStoreCard from '../components/CoffeeStoreCard'
import Header from '../components/Header'
import { useState } from 'react'

export default function Home() {

  const [toggleButton, setToggleButton] = useState(false);

  const router = useRouter();
  const basePath = router.asPath;
  const imageUrl = '/static/hero-image.png'

  const id = '423';
  const title = 'Starbucks'

  return (
    <div className={styles.container}>
      <Head>
        <title>CAFIEND CONNOISSEUR</title>
        <meta content='Locate your favorite nearby coffee shops' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner 
          toggleButton={toggleButton}
          setToggleButton={setToggleButton}
        />
        <div className={styles.heroImage}>
          <Image src={'/hero-image.png'} width={700} height={400} />
        </div>
        {toggleButton && <div>
          <Header title='All Stores' />
          <div className={styles.listContainer}>
            <CoffeeStoreCard 
            id={id}
            basePath={basePath}
            title={title}
            imageUrl={imageUrl}
            href={`/coffee-store/${title}`}
            />
            <CoffeeStoreCard 
            id={id}
            basePath={basePath}
            title={title}
            imageUrl={imageUrl}
            href={`/coffee-store/${title}`}
            />
            <CoffeeStoreCard 
            id={id}
            basePath={basePath}
            title={title}
            imageUrl={imageUrl}
            href={`/coffee-store/${title}`}
            />
            <CoffeeStoreCard 
            id={id}
            basePath={basePath}
            title={title}
            imageUrl={imageUrl}
            href={`/coffee-store/${title}`}
            />
          </div>
        </div>}
      </main>
    </div>
  )
}
