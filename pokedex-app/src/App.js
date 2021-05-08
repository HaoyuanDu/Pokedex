import React, { useEffect, useState, useMemo } from 'react';
//import TableContainer from './component/pokedex'
import Pokedex from './component/pokedex';
//import Pokemon from './component/pokemon';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" render={(props) => <Pokedex {...props} />}/>
        <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props} />}/>*/}
        <Pokedex /> 
      </Switch>
    </BrowserRouter>

  );
}
export default App;
