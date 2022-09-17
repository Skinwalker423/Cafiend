import styles from './Header.module.css'

import React from 'react'

const Header = ({title}) => {
  return (
    <h2 className={styles.header}>{title}</h2>
  )
}

export default Header