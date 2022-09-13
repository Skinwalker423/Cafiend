import React from 'react'
import { useState } from 'react'

const Banner = () => {

    const [toggleButton, setToggleButton] = useState(false)

const bannerButtonHandler = () => {
    setToggleButton((bool) => !bool)
}

  return (
    <div>
        <h1>CAFIEND <span>CONNOISSEUR</span></h1>
        <p>Discover your local coffee shops!</p>
        <button onClick={bannerButtonHandler}>{toggleButton ? 'checking stores' : 'View Stores nearby'}</button>
    </div>
  )
}

export default Banner