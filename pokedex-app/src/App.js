import React, { useEffect, useState, useMemo } from 'react';
//import TableContainer from './component/pokedex'
import Pokedex from './component/pokedex';
//import Pokemon from './component/pokemon';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
// import useFetch from './component/useFetch';



function App() {
  // const [data, setData] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);
  // const url = 'http://localhost:3001/pokedex';

  // useEffect(() => {
  //       const doFetch = async () => {
  //         const response = await fetch('http://localhost:3001/pokedex');
  //         const body = await response.json();
  //         console.log(body);
  //         setData(body);
  //       };
  //       doFetch();
  //     }, []); 
    // const {data: datas, isPending, error} = useFetch('http://localhost:3001/pokedex');

  return (
    <BrowserRouter >
      <Switch>
        <Route  path="/" >
          {/* { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> } */}
          {/* <Pokedex pokedex={data} title="Pokedex" /> */}
          {<Pokedex />}
        {/* <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props} />}/> */}
        </Route> 
      </Switch>
    </BrowserRouter >

  );
}
export default App;
