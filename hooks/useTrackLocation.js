import React, { useState } from 'react'
import { getCoffeeStores } from '../lib/coffee-stores';

const useTrackLocation = () => {

  const [locationError, setLocationError] = useState('');
  const [latlong, setLatlong] = useState('');

  const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatlong(`${latitude}%2C${longitude}`);
        setLocationError('');
  }

  const error = () => {
    setLocationError('Unable to retrieve your location');
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser')
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    } 
  }

  return {
    latlong
  }
}

export default useTrackLocation