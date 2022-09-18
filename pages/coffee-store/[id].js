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
  return{
    paths: [{params: {id: '0'}}, {params: {id: '1'}}, {params: {id: '300'}} ],
    fallback: false,
  } 
}

const CoffeeStorePage = ({coffeeStore}) => {

    const router = useRouter()
    const {id} = router.query;


    if(!coffeeStore || !id){
      return <div>Loading...</div>
    }


  return (
    <div className={styles.container}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div className={styles.cardContainer}>
        <h1>{coffeeStore.name}</h1>
        <div className={styles.imageWrapper}>
          <Image layout='fill' className={styles.image} src={coffeeStore.imgUrl} />
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