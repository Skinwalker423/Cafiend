import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'
import Head from 'next/head';
import coffeeStoresData from '../../data/coffee-stores.json';

export function getStaticProps({params}) {
    console.log(params);
    return{
      props: {
        coffeeStore: coffeeStoresData.find((store) => parseInt(params.id) === store.id)
      }
    }
}




export function getStaticPaths() {

  const pathId = coffeeStoresData.map((coffeeStore) => {
    return {params: {id: coffeeStore.id.toString()}}
  })


  return{
    paths: pathId,
    fallback: true,
  } 
}

const CoffeeStorePage = ({coffeeStore}) => {

    const router = useRouter()
    const {id} = router.query;

    if(router.isFallback){
      return <div>Loading...</div>
    }
    
    const {imgUrl, websiteUrl, neighbourhood, address, name} = coffeeStore;

  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.cardContainer}>
        <h1>{name}</h1>
        <div className={styles.imageWrapper}>
          <Image layout='fill' className={styles.image} src={imgUrl} />
        </div>
        <Link href='/'>Back to all stores</Link>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <h3><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{address}</h3>
          <h3><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{neighbourhood}</h3>
          <a href={websiteUrl} target="_blank" ><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{websiteUrl}</a>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStorePage;