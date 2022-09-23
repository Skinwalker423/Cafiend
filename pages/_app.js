import '../styles/globals.css'
import { createContext, useEffect, useState } from 'react'
import useTrackLocation from '../hooks/useTrackLocation';
import { getCoffeeStores } from '../lib/coffee-stores';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {

  // const {latlong, handleTrackLocation} = useTrackLocation();
  const [latlong, setLatlong] = useState('');
  const [localCoffeeStores, setLocalCoffeeStores] = useState([]);

  // useEffect(() => {
  //   if(latlong){
  //     const fetchLocalStores = async() => {
  //       try{
  //         const localCoffeeStoresData = await getCoffeeStores(latlong);
          
  //         if(localCoffeeStoresData){
  //           setLocalCoffeeStores(localCoffeeStoresData);
  //           console.log(localCoffeeStoresData);
  //         }
  //       }catch(e){
  //         setLocalCoffeeStoresErrorMsg('error fetching local stores:', e.message);
  //       }
  //     }

  //     fetchLocalStores();
  //   }
  // }, [latlong])


  const value = {
    latlong,
    setLatlong,
    localCoffeeStores,
    setLocalCoffeeStores,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function MyApp({ Component, pageProps }) {
  return (
  <>
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
  </>
  )
}

export default MyApp
