import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import CoffeeStoreCard from '../components/CoffeeStoreCard'
import Header from '../components/Header'
import {useEffect, useState, useContext } from 'react'
import { StoreContext, ACTION_TYPES } from '../store/storeContext'

import useTrackLocation from '../hooks/useTrackLocation'




export default function Home() {

  const [toggleButton, setToggleButton] = useState(false);
  const {state, dispatch} = useContext(StoreContext);
  const {localCoffeeStores, latLong} = state;
  const [localCoffeeStoresErrorMsg, setLocalCoffeeStoresErrorMsg] = useState(null);
  const {handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();



  useEffect(() => {
    if(latLong){
      const fetchLocalStores = async() => {
        try{
          const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
          const localCoffeeStoresData = await res.json();
          
          dispatch({type: ACTION_TYPES.SET_LOCAL_COFFEE_STORES, payload: localCoffeeStoresData});
          
        }catch(e){
          setLocalCoffeeStoresErrorMsg('error fetching local stores:', e.message);
        }
      }
      setLocalCoffeeStoresErrorMsg('');
      fetchLocalStores();
    }
  }, [latLong, dispatch])

  const bannerButtonHandler = async() => {
    handleTrackLocation();

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>ICE CREAM DREAMS</title>
        <meta name="description" content='Locate your favorite nearby Ice Cream Stores' />
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
          <Image src={'/static/hero-image.png'} alt='hero image' width={"700px"} height={"400px"} />
        </div>
        {locationErrorMsg && <h1>Something went wrong: {locationErrorMsg}</h1>}
        {localCoffeeStoresErrorMsg && <h1>Something went wrong: {localCoffeeStoresErrorMsg}</h1>}
          <div>
          {localCoffeeStores && localCoffeeStores.length && <div className={styles.localStoresContainer}>
            <Header title='Local Stores' />
            <div className={styles.listContainer}>
            {localCoffeeStores.map(({id, name }) => {
              return (
                <CoffeeStoreCard 
                  title={name}
                  imageUrl={"/static/pamela-lima-unsplash.jpg"}
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
