import React from 'react'
import { useState } from 'react'
import styles from './Banner.module.css'
import { useRouter } from 'next/router'

const Banner = ({toggleButton, setToggleButton, bannerButtonHandler, isFindingLocation }) => {

    

    const router = useRouter();

const handleBannerButton = async() => {
    setToggleButton((bool) => !bool);
    await bannerButtonHandler();
}

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.title1}>CAFIEND</span>
          <span className={styles.title2}>CONNOISSEUR</span>
        </h1>
        <p className={styles.subTitle}>Discover your local coffee shops!</p>
        <div className={styles.buttonWrapper}>
          <button onClick={handleBannerButton} type='button' className={styles.button}>{isFindingLocation ? 'checking stores...' : 'View Stores nearby'}
          </button>
        </div>
    </div>
  )
}

export default Banner