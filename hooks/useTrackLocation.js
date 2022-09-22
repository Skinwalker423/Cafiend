import React, { useState } from 'react'
import { getCoffeeStores } from '../lib/coffee-stores';

const useTrackLocation = () => {

  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [latlong, setLatlong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatlong(`${latitude},${longitude}`);
        setLocationErrorMsg('');
        setIsFindingLocation(false);
  }

  const error = () => {
    setLocationErrorMsg('Unable to retrieve your location');
    setIsFindingLocation(false);
  }

  const handleTrackLocation = () => {
    setIsFindingLocation(true)
    if (!navigator.geolocation) {
        setLocationErrorMsg('Geolocation is not supported by your browser')
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    } 
  }

  return {
    latlong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation
  }
}

export default useTrackLocation