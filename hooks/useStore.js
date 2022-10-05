import { fetcher } from "../utils";
import useSWR from 'swr';


function useStore (id) {
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useStore;