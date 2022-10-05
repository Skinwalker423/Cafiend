import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'
import Head from 'next/head';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {GoLocation} from 'react-icons/go';
import {TbLocation} from 'react-icons/tb';
import {HiOutlineArrowLeft} from 'react-icons/hi'
import cls from 'classnames';
import { getCoffeeStores } from '../../lib/coffee-stores';
import { StoreContext } from '../../store/storeContext';
import { isEmpty } from '../../utils';
import useStore from '../../hooks/useStore';



export async function getStaticProps({params}) {

    const coffeeStoresData = await getCoffeeStores("43.653833032607096%2C-79.37896808855945", 'ice cream');

    const findCoffeeStore = coffeeStoresData.find((store) => params.id === store.id);

    return{
      props: {
        coffeeStore: findCoffeeStore ? findCoffeeStore : {},
      }
    }
}

export async function getStaticPaths() {

  const coffeeStoresData = await getCoffeeStores("43.653833032607096%2C-79.37896808855945", 'ice cream');

  const pathId = coffeeStoresData.map((coffeeStore) => {
    return {params: {id: coffeeStore.id}}
  })

  return{
    paths: pathId,
    fallback: true,
  } 
}

const CoffeeStorePage = (initialProps) => {

    const router = useRouter()
    const {state: {localCoffeeStores}} = useContext(StoreContext)
    const [likeCount, setLikeCount] = useState(1);
    const [voted, setVoted] = useState(false);
    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore || {});
    const {name, address, neighborhood, imageUrl, id} = coffeeStore;
    const UrlId = router.query.id || id;



  const handleCreateCoffeeStore = useCallback(async(coffeeStore) => {
    try{

      const {id, name, address, neighborhood, imageUrl } = coffeeStore;

      const newCoffeeStore = await fetch("/api/createCoffeeStore", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          name,
          address: address || "",
          neighborhood: neighborhood || "",
          imageUrl,
          votes: likeCount || 1,
        })
      }, [id]);

      return await newCoffeeStore.json();


    }catch(err){
      console.error('problem creating store in airtable', err);
    }
  })

  // /api/getCoffeeStoreById?id=${UrlId}

  // const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${UrlId || id}`, fetcher);


  useEffect(() => {
      if(isEmpty(initialProps.coffeeStore)){
        if(localCoffeeStores.length > 0) {
          const findCoffeeStore = localCoffeeStores.find((store) => UrlId === store.id);
          
          if(findCoffeeStore) {
            setCoffeeStore(findCoffeeStore);
            console.log('triggered create');
            handleCreateCoffeeStore(findCoffeeStore);
            
          }
        }
      } else {
        if(initialProps.coffeeStore){
          console.log('triggered create 2', initialProps.coffeeStore);
          handleCreateCoffeeStore(initialProps.coffeeStore);
        }
      }
  }, [UrlId, initialProps.coffeeStore, localCoffeeStores])

    const {isLoading, isError, data} = useStore(UrlId);


    useEffect(() => {

        if(data){
        setCoffeeStore(data);
        setLikeCount(data.votes);
      }
    

    }, [data])



    const likeButtonHandler = async() => {
      try{
        setVoted((bool) => !bool);
        const resonse = await fetch("/api/getCoffeeStoreVotes", {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: UrlId,
          })
        });

        const latestVoteCount = await resonse.json();

        if(!latestVoteCount){
          setLikeCount(likeCount)
        } 
  
        setLikeCount(latestVoteCount);

      }catch(err){
        console.error("problem getting vote data", err.message)
      }
    }

    if(isError){
      return <div>Something went wrong retrieving coffee store page</div>
    }

    if(router.isFallback || isLoading){
      return <div>Loading...</div>
    }




  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.homeLink}>
        <HiOutlineArrowLeft />
        <Link href={'/'}>Back to Stores</Link>  
      </div>
      <h1 className={styles.storeTitle}>{name}</h1>
      <div className={styles.cardContainer}>
        <div className={styles.imageWrapper}>
          <Image layout='fill' className={styles.image} src={"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} alt={name || 'coffee store'} width={600} height={300} />
        </div>
        <div className={cls("glass", styles.detailsContainer)}>
          <div className={styles.details}>
            <p><span className={styles.icon}><GoLocation /></span>{address}</p>
            <p><span className={styles.icon}><TbLocation /></span>{neighborhood}</p>
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