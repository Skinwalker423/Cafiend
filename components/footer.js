import React from 'react'
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.linkIcon}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            >
            <span>Brought to you by: Illuminati{' '} </span>
          </a>
          <br/>
          <Image src={'/favicon.ico'} width={50} height={50} />
        </div>
      </footer>
  )
}

export default Footer;