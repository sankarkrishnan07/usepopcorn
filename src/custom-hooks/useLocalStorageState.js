import { useEffect, useState } from "react";

export default function useLocalStorageState(initialState, key){

    const [value, setValue] = useState(function(){
        const value=localStorage.getItem(key);
        return value? JSON.parse(value) : [];
      });

    useEffect(function(){
        localStorage.setItem(key, JSON.stringify(value));
      },[value, key]);

      return [value, setValue];
}