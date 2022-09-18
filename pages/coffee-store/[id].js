import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'
import Head from 'next/head';
import coffeeStoresData from '../../data/coffee-stores.json';

const CoffeeStorePage = () => {

    const router = useRouter()
    const {id} = router.query;

    const [coffeeStore, setCoffeeStore] = useState();

    console.log(id);

    useEffect(() => {
      const findStore = coffeeStoresData.find((store) => parseInt(id) === store.id)
      if(findStore){
        setCoffeeStore(findStore);
      }
    }, [id])


    if(!coffeeStore || !id){
      return <div>Loading...</div>
    }

    console.log(coffeeStore);

  return (
    <div className={styles.container}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div className={styles.cardContainer}>
      <h1>{coffeeStore.name}</h1>
      <Image src={coffeeStore.imgUrl} width={500} height={500} />
      <Link href='/'>Back to all stores</Link>
      </div>
      <div className={styles.details}>
        stuff on the right
        <div>
          <p>{coffeeStore.address}</p>
          <p>{coffeeStore.neighbourhood}</p>
          <a href={coffeeStore.websiteUrl} target="_blank" >{coffeeStore.websiteUrl}</a>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStorePage;