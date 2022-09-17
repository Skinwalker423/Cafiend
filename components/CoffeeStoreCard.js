import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './CoffeeStoreCard.module.css'

const CoffeeStoreCard = ({title, imageUrl, href}) => {
  return (
    
        <Link href={href}>
          <a>
            <div className={styles.coffeeStoreCardContainer}>
                <h2 className={styles.title}>{title}</h2>
                <Image className={styles.image} src={imageUrl} width={200} height={200} />
            </div>
          </a>
        </Link>
    
  )
}

export default CoffeeStoreCard