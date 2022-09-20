import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'
import Head from 'next/head';
import coffeeStoresData from '../../data/coffee-stores.json';
import Footer from '../../components/footer';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {GoLocation} from 'react-icons/go';


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

    const [likeCount, setLikeCount] = useState(1);
    const [voted, setVoted] = useState(false);

    if(router.isFallback){
      return <div>Loading...</div>
    }
    
    const {imgUrl, websiteUrl, neighbourhood, address, name} = coffeeStore;

    const likeButtonHandler = () => {
        setLikeCount((count) => count + 1);
        setVoted(true);
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>
      <h1 className={styles.storeTitle}>{name}</h1>
      <div className={styles.cardContainer}>
        <div className={styles.imageWrapper}>
          <Image layout='fill' className={styles.image} src={imgUrl} alt={name} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.details}>
            <p><span className={styles.icon}><GoLocation /></span>{address}</p>
            <p><span className={styles.icon}><GoLocation /></span>{neighbourhood}</p>
            {/* <a href={websiteUrl} target="_blank" ><span className={styles.icon}><Image src={'/static/favicon.ico'} width={20} height={20} /></span>{websiteUrl}</a> */}
            <p className={styles.likes}><span className={styles.icon}>{voted ? <AiFillHeart /> : <AiOutlineHeart />}</span>{likeCount}</p>
            <div className={styles.buttonWrapper}>
              <button className={voted ? styles.liked : styles.likeButton} disabled={voted} onClick={likeButtonHandler}>Like</button>
            </div>
          </div>
        </div>
      </div>
      <Footer href={websiteUrl} />
    </div>
  )
}

export default CoffeeStorePage;