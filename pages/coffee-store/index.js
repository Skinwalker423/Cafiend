import React from 'react'
import Link from 'next/link';
import Head from 'next/head';

const CoffeeStores = () => {


  return (
    <div>
      <Head>
        <title>{'Coffee Stores Index'}</title>
        <meta content={`Coffee stores index page`} />
      </Head>
      <h1>All Stores</h1>
      <Link href={'/'} >Back home</Link>
    </div>
  )
}

export default CoffeeStores;