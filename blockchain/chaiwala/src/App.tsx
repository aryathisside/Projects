import React, { useEffect, useState } from 'react';
import Connect from './Components/connect';

const  App: React.FC = () => {

  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })


  return (
    <>
    <Connect/>
    </>
  );
}

export default App;
