import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
    SET_LATLONG: 'SET_LATLONG',
    SET_LOCAL_COFFEE_STORES: 'SET_LOCAL_COFFEE_STORES',
}

const storeReducer = (state, action) => {
switch(action.type){

case ACTION_TYPES.SET_LATLONG: 
    return {...state, latLong: action.payload}
case ACTION_TYPES.SET_LOCAL_COFFEE_STORES:
    return {...state, localCoffeeStores: action.payload}
default:  
    throw new Error(`unhandled action type: ${action.type}`);
}
}


export const StoreProvider = ({children}) => {

const initialState = {
latLong: '',
setLatLong: ()=>{},
localCoffeeStores: [],
setLocalCoffeeStores: ()=>{},
}

const [state, dispatch] = useReducer(storeReducer, initialState);

const value = {state, dispatch};

return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export default StoreProvider;
