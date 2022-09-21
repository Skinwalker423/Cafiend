import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'
import Head from 'next/head';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {GoLocation} from 'react-icons/go';
import {TbLocation} from 'react-icons/tb';
import cls from 'classnames';
import { getCoffeeStores } from '../../lib/coffee-stores';


export async function getStaticProps({params}) {

    const coffeeStoresData = await getCoffeeStores();

    return{
      props: {
        coffeeStore: coffeeStoresData.find((store) => params.id === store.fsq_id)
      }
    }
}




export async function getStaticPaths() {

  const coffeeStoresData = await getCoffeeStores();

  const pathId = coffeeStoresData.map((coffeeStore) => {
    return {params: {id: coffeeStore.fsq_id}}
  })

  return{
    paths: pathId,
    fallback: true,
  } 
}

const CoffeeStorePage = ({coffeeStore}) => {

    const router = useRouter()
    const {id} = router.query;

    const [likeCount, setLikeCount] = useState(1);
    const [voted, setVoted] = useState(false);

    if(router.isFallback){
      return <div>Loading...</div>
    }
    
    const { name, location, categories} = coffeeStore;

    const likeButtonHandler = () => {
        setVoted((bool) => !bool);
        setLikeCount((count) => count + 1);
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.homeLink}>
        <Link href={'/'}>Back to Stores</Link>  
      </div>
      <h1 className={styles.storeTitle}>{name}</h1>
      <div className={styles.cardContainer}>
        <div className={styles.imageWrapper}>
          <Image layout='fill' className={styles.image} src={"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} alt={name} />
        </div>
        <div className={cls("glass", styles.detailsContainer)}>
          <div className={styles.details}>
            <p><span className={styles.icon}><GoLocation /></span>{location.address}</p>
            <p><span className={styles.icon}><TbLocation /></span>{location.neighborhood}</p>
            {/* <a href={websiteUrl} target="_blank" ><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{websiteUrl}</a> */}
            <p className={styles.likes}><span className={styles.icon}>{voted ? <AiFillHeart /> : <AiOutlineHeart />}</span>{likeCount}</p>
            <div className={styles.buttonWrapper}>
              <button className={voted ? styles.liked : styles.likeButton} disabled={voted} onClick={likeButtonHandler}>Like</button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer href={websiteUrl} /> */}
    </div>
  )
}

export default CoffeeStorePage;