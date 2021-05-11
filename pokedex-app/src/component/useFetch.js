
import { useState, useEffect } from 'react';


 const useFetch = (url) => {
    console.log("usefench",url);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(value => {
        setIsPending(false);
        setData(value);
        console.log("usefench",value);
        setError(null);
        console.log("usefench",data);

      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;
