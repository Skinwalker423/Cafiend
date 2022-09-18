import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import CoffeeStoreCard from '../components/CoffeeStoreCard'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import coffeeStoresData from '../data/coffee-stores.json'


export async function getStaticProps(context) {

  console.log('get static props shows here')

  // const coffeeStores = await fetch('https://jsonplaceholder.typicode.com/users')
  //   .then((res) => res.json())
  //   .catch((e) => console.log(e))

  return {
    props: {
      coffeeStores: coffeeStoresData
    }, // will be passed to the page component as props
  }
}

export default function Home({coffeeStores}) {

  const [toggleButton, setToggleButton] = useState(false);


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
          <Image src={'/static/hero-image.png'} width={700} height={400} />
        </div>
          <div>
            {coffeeStores.length ? <div>
              <Header title='All Stores' />
              <div className={styles.listContainer}>
                {coffeeStores.map(({id, name, imgUrl }) => {
                  return (
                    <CoffeeStoreCard 
                      title={name}
                      imageUrl={imgUrl}
                      href={`/coffee-store/${id}`}
                      key={id}
                    />
                  )
                })}
              </div>
            </div> : 'Loading...'}
          {toggleButton && <div className={styles.localStoresContainer}>
            <Header title='Local Stores' />
            <div className={styles.listContainer}>
            {coffeeStores.map(({id, imgUrl, name }) => {
              return (
                <CoffeeStoreCard 
                  title={name}
                  imageUrl={imgUrl}
                  href={`/coffee-store/${id}`}
                  key={id}
                />
              )
            })}
            
            </div>
          </div>}
        </div>
      </main>
    </div>
  )
}
