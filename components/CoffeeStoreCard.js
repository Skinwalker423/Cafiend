import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './CoffeeStoreCard.module.css'
import cls from 'classnames'

const CoffeeStoreCard = ({title, imageUrl, href}) => {
  return (
    
        <Link href={href}>
          <a className={styles.cardLink}>
            <div className={cls('glass', styles.coffeeStoreCardContainer)}>
              <div className={styles.headerWrapper}>
                <h2 className={styles.cardHeader}>{title}</h2>
              </div>
              <div className={styles.imgWrapper}>
                <Image className={styles.image} src={imageUrl} width={260} height={160} alt='ice cream image' />
              </div>
            </div>
          </a>
        </Link>
    
  )
}

export default CoffeeStoreCard