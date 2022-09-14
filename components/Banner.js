import React from 'react'
import { useState } from 'react'
import styles from './Banner.module.css'
import { useRouter } from 'next/router'

const Banner = () => {

    const [toggleButton, setToggleButton] = useState(false);

    const router = useRouter();

const bannerButtonHandler = () => {
    setToggleButton((bool) => !bool);
    router.push('/coffee-store');
}

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.title1}>CAFIEND</span>
          <span className={styles.title2}>CONNOISSEUR</span>
        </h1>
        <p className={styles.subTitle}>Discover your local coffee shops!</p>
        <div className={styles.buttonWrapper}>
          <button onClick={bannerButtonHandler} className={styles.button}>{toggleButton ? 'checking stores' : 'View Stores nearby'}
          </button>
        </div>
    </div>
  )
}

export default Banner