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
        <div className={styles.imageWrapper}>
          <Image layout='fill' className={styles.image} src={coffeeStore.imgUrl} width={200} height={200} />
        </div>
        <Link href='/'>Back to all stores</Link>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <h3><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{coffeeStore.address}</h3>
          <h3><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{coffeeStore.neighbourhood}</h3>
          <a href={coffeeStore.websiteUrl} target="_blank" ><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{coffeeStore.websiteUrl}</a>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStorePage;