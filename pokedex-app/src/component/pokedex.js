import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './tableContainer';
import { Container, Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const Pokedex = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('http://localhost:3001/pokedex');
      const body = await response.json();
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []); 

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name.english",
      },
      {
        Header: "HP",
        accessor: "base.HP",
      },
      {
        Header: "Attack",
        accessor: "base.Attack",
      },
      {
        Header: "Defense",
        accessor: "base.Defense",
      },
      {
        Header: "Sp. Attack",
        accessor: (value) => value.base['Sp. Attack'],
      },
      {
        Header: "Sp. Defense",
        accessor: (value) => value.base['Sp. Defense'],
      },
      {
        Header: "Speed",
        accessor: "base.Speed",
      },
      {
        Header: 'Type',
        accessor: (values) => {
            const first = values.type[0];
            const second = values.type[1];
            return first + '/' + second;
        },
        Cell:({cell}) => {
            const { value } = cell;
        }
    },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />;
    </Container>
    )
};

export default Pokedex;
