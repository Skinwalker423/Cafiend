import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import CoffeeStoreCard from '../components/CoffeeStoreCard'
import Header from '../components/Header'
import {useEffect, useState, useContext } from 'react'
import { StoreContext, ACTION_TYPES } from '../store/storeContext'
import { getCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/useTrackLocation'



export async function getStaticProps(context) {

  console.log('get static props shows here')
  // const coffeeStoresApiData = await getCoffeeStores();
  const coffeeStoresApiData = {}

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
  const {state, dispatch} = useContext(StoreContext);
  const {localCoffeeStores, latLong} = state;
  const [localCoffeeStoresErrorMsg, setLocalCoffeeStoresErrorMsg] = useState(null);
  const {handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();

  console.log(latLong);


  useEffect(() => {
    if(latLong){
      const fetchLocalStores = async() => {
        try{
          const localCoffeeStoresData = await getCoffeeStores(latLong);
          
          dispatch({type: ACTION_TYPES.SET_LOCAL_COFFEE_STORES, payload: localCoffeeStoresData});
          console.log(localCoffeeStores);
          
        }catch(e){
          setLocalCoffeeStoresErrorMsg('error fetching local stores:', e.message);
        }
      }

      fetchLocalStores();
    }
  }, [latLong])

  const bannerButtonHandler = async() => {
    handleTrackLocation();

  }

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
          bannerButtonHandler={bannerButtonHandler}
          isFindingLocation={isFindingLocation}
        />
        <div className={styles.heroImage}>
          <Image src={'/static/hero-image.png'} width={700} height={400} />
        </div>
        {locationErrorMsg && <h1>Something went wrong: {locationErrorMsg}</h1>}
        {localCoffeeStoresErrorMsg && <h1>Something went wrong: {localCoffeeStoresErrorMsg}</h1>}
          <div>
            {/* {coffeeStores.length ? <div>
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
            </div> : 'Loading...'} */}
          {localCoffeeStores && localCoffeeStores.length && <div className={styles.localStoresContainer}>
            <Header title='Local Stores' />
            <div className={styles.listContainer}>
            {localCoffeeStores.map(({fsq_id, name }) => {
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
