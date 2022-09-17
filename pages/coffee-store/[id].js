import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'
import Head from 'next/head';

const CoffeeStorePage = () => {

    const router = useRouter()
    const {id} = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>{id}</title>
      </Head>
      <div className={styles.cardContainer}>
      <h1>{id}</h1>
      <Image src={'/favicon.ico'} width={500} height={500} />
      <Link href='/'>Back to all stores</Link>
      </div>
      <div className={styles.details}>
        stuff on the right
      </div>
    </div>
  )
}

export default CoffeeStorePage;