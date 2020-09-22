import React, {useEffect, useState} from 'react';
import client from 'client';

const App = () => {
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    (async () => {
      const {data, error} = await client.get('/');

      if (error) setMessage(error.toString());
      else setMessage(data);
    })();
  }, []);

  return <div>{message}</div>;
};

export default App;
