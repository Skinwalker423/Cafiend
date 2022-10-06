import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './CoffeeStore.module.css'

const CoffeeStore = ({id, basePath, title}) => {
  return (
    
        <Link href={`${basePath}/${id}`}>
            <div className={styles.coffeeStoreCardContainer}>
                <h2>{title}</h2>
                <Image src={'/favicon.ico'} width={50} height={50} alt='ice cream image' />
                <button> more info</button>
            </div>
        </Link>
    
  )
}

export default CoffeeStore