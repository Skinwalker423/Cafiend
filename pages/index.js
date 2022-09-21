import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import CoffeeStoreCard from '../components/CoffeeStoreCard'
import Header from '../components/Header'
import {useState } from 'react'
import { getCoffeeStores } from '../lib/coffee-stores'


export async function getStaticProps(context) {

  console.log('get static props shows here')
  const coffeeStoresApiData = await getCoffeeStores();

  // const coffeeStores = await fetch('https://jsonplaceholder.typicode.com/users')
  //   .then((res) => res.json())
  //   .catch((e) => console.log(e))

  return {
    props: {
      coffeeStores: coffeeStoresApiData
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
                {coffeeStores.map(({name, fsq_id}) => {

                  return (
                    <CoffeeStoreCard 
                      title={name}
                      imageUrl={"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                      href={`/coffee-store/${fsq_id}`}
                      key={fsq_id}
                    />
                  )
                })}
              </div>
            </div> : 'Loading...'}
          {toggleButton && <div className={styles.localStoresContainer}>
            <Header title='Local Stores' />
            <div className={styles.listContainer}>
            {coffeeStores.map(({fsq_id, name }) => {
              return (
                <CoffeeStoreCard 
                  title={name}
                  imageUrl={"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                  href={`/coffee-store/${fsq_id}`}
                  key={fsq_id}
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
