import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css'

const CoffeeStorePage = () => {

    const router = useRouter()
    const {id} = router.query;

  return (
    <div className={styles.container}>
      <Link href='/'>Back to all stores</Link>
      <Image src={'/favicon.ico'} width={500} height={500} />
    </div>
  )
}

export default CoffeeStorePage;