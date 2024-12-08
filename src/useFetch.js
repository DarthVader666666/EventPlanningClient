import { useState, useEffect } from 'react';

const useFetch = (url, method, body) => {
  console.log(url)
  const baseUrl = process.env.REACT_APP_ENV === 'Development' ? process.env.REACT_APP_API_URL : '';
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const fullUrl = baseUrl + url;
    console.log(fullUrl)
    fetch(fullUrl, 
        { 
          method: method ? method : 'GET',
          body: body,
          headers:
          {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
          }
        })
        .then(res => {
          setStatus(res.status);

          if(res.status === 401)
          {
            sessionStorage.clear();
            throw Error('You are not authorized.');
          }

          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          }

          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch(err => {
          console.log(err + err.name)
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          }
          else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        })
      },
   [baseUrl + url,method,body])

  return { data, isPending, error, status };
}

export default useFetch;