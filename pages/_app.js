import '../styles/globals.css'
import { createContext, useEffect } from 'react'
import useTrackLocation from '../hooks/useTrackLocation';
import { getCoffeeStores } from '../lib/coffee-stores';

const StoreContext = createContext();

const StoreProvider = ({children}) => {

  const {latlong, handleTrackLocation} = useTrackLocation();
  const [localCoffeeStores, setLocalCoffeeStores] = useState([]);
  const [localCoffeeStoresErrorMsg, setLocalCoffeeStoresErrorMsg] = useState(null);

  useEffect(() => {
    if(latlong){
      const fetchLocalStores = async() => {
        try{
          const localCoffeeStoresData = await getCoffeeStores(latlong);
          
          if(localCoffeeStoresData){
            setLocalCoffeeStores(localCoffeeStoresData);
            console.log(localCoffeeStoresData);
          }
        }catch(e){
          setLocalCoffeeStoresErrorMsg('error fetching local stores:', e.message);
        }
      }

      fetchLocalStores();
    }
  }, [latlong])


  const value = {
    latlong,
    handleTrackLocation,
    localCoffeeStores,
    localCoffeeStoresErrorMsg,

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
