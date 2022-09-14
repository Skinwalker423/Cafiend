import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import CoffeeStore from '../../components/CoffeeStore';

const CoffeeStores = () => {

  const router = useRouter();
  const basePath = router.asPath;

  const id = '423';
  const title = 'Starbucks'

  return (
    <div>
      <h1>All Stores</h1>
      <CoffeeStore 
        id={id}
        basePath={basePath}
        title={title}
      />
    </div>
  )
}

export default CoffeeStores;