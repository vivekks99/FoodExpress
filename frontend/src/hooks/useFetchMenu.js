import { useEffect, useState } from "react";

export default function useFetchMenu(url) {
  const [menu, setMenu] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState(500);
  const [errorStatusText, setErrorStatusText] = useState('No Internet');
  
  useEffect(function(){
    window.scrollTo(0, 0);
  }, []);

  useEffect(function () {
    async function fetchMenu() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          setErrorStatus(res.status);
          setErrorStatusText(res.statusText);
        }
        const data = await res.json();
        if (data.status === 'error') throw new Error('Something went wrong, Please come back later!');
        if (data.status === 'fail') throw new Error(data.message);
        setMenu(data);
      }
      catch (err) {
        setErrorMessage(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchMenu();
  }, [url]);


  return [menu, isLoading, errorMessage, errorStatus, errorStatusText];
}