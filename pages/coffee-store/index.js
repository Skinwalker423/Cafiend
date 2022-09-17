import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import CoffeeStoreCard from '../../components/CoffeeStoreCard';

const CoffeeStores = () => {

  const router = useRouter();
  const basePath = router.asPath;
  const imageUrl = '/static/hero-image.png'

  const id = '423';
  const title = 'Starbucks'

  return (
    <div>
      <h1>All Stores</h1>
      <CoffeeStoreCard 
        id={id}
        basePath={basePath}
        title={title}
        imageUrl={imageUrl}
        href={`${basePath}/${id}`}
      />
    </div>
  )
}

export default CoffeeStores;