import { useEffect, useState } from "react";
import { BASE_URL, USER_URL } from '../constants';

export default function useFetchUser(){
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorStatus, setErrorStatus] = useState(500);
    const [errorStatusText, setErrorStatusText] = useState('No Internet');

    useEffect(function () {
        async function fetchUserDetails() {
            try{
                const res = await fetch(`${BASE_URL}${USER_URL}/profile`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!res.ok){
                  setErrorStatus(res.status);
                  setErrorStatusText(res.statusText);
                }
                const data = await res.json();
                if(data.status === 'error') throw new Error('Something went wrong, Please come back later!');
                if(data.status === 'fail') throw new Error(data.message);
                setUser(data);
            }
            catch(err){
              setErrorMessage(err.message);
            }
            finally{
              setIsLoading(false);
            }
        }
        fetchUserDetails();
    }, []);
    
    return [user, isLoading, errorMessage, errorStatus, errorStatusText];
}