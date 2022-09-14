import React from 'react'
import Link from 'next/link'

const Nextjs = () => {
  return (
    <div>
        <h1>Welcome to Next.js with Ankita</h1>
        <Link href={'/courses'}>Back to courses</Link>
    </div>
  )
}

export default Nextjs