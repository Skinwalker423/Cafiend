import React from 'react'
import styles from './footer.module.css';
import Image from 'next/image';

const Footer = ({href}) => {
  return (
    <div className={styles.footer}>
      <footer>
          <div className={styles.linkIcon}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {href}
            </a>  
          </div>
      </footer>
    </div>
  )
}

export default Footer;