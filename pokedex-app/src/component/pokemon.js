import React, { useEffect, useState, useMemo } from 'react';
//import { useTable } from 'react-table';
import {
    Container,
  } from 'reactstrap';
//import TableContainer from './tableForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableForm from './tableForm';

const Pokedex = () => {
    const [pokedex, setPokedex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const doFetch = async () => {
          const response = await fetch('http://localhost:3001/pokedex');
          const body = await response.json();
          console.log(body);
          setPokedex(body);
        };
        doFetch();
      }, []);   

      return (
        <div>
            <header>
                <h1>Pokedex</h1>
                <table>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>HP</td>
                        <td>Attack</td>
                        <td>Defense</td>
                        <td>Sp. Attack</td>
                        <td>Sp. Defense</td>
                        <td>Speed</td>
                        <td>Type</td>
                        
                    </tr>
                    {
                        pokedex.map((item) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name.english}</td>
                                <td>{item.base.HP}</td>
                                <td>{item.base.Attack}</td>
                                <td>{item.base.Defense}</td>
                                <td>{item.base['Sp. Attack']}</td>
                                <td>{item.base['Sp. Defense']}</td>
                                <td>{item.base.Speed}</td>
                                <td>
                                    {
                                    item.type.map((typeItem) =>
                                        <strong>{typeItem} </strong>
                                    )
                                    }
                                </td>
                            </tr>
                        )
                    }
                </table>
            </header>

        </div>
        
      );
    
    // return (
    //     <div>
    //         { isLoading && <div>Loading</div>}
    //         {/* {pokedex && <Pokedex pokedex={pokedex} />} */}
    //     </div>
    //     );
    };
export default Pokedex;