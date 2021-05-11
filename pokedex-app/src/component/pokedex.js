import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './tableContainer';
//import { Container, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { img, Container, Button, Row, Col, Table } from "reactstrap"
//import { SelectColumnFilter } from './filters';
//import Pokemon from './pokemon';

const Pokedex = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('http://localhost:3001/pokedex');
      const body = await response.json();
      setData(body);
    };
    doFetch();
  }, []); 
  const renderRowSubComponent = row => {
    const {
        id,
        name: { english, chinese, japanese, french },
        type,
        base: { HP, Attack, Defense,  ["Sp. Attack"]:spAttack, ["Sp. Defense"]:spDefense, Speed },
        
    } = row.original;
    var newId;
    if (id<10) {
       newId = '00'+id;
    } else if (id<100 ){
       newId = '0'+id;
    } else {
       newId = id;
    } 
    const pickType = (type) => {
      if(type.[1]){
        return (
          <div>
          <Button color="primary" >{type.[0]}</Button>
          <Button color="success" >{type.[1]}</Button>
          </div>
        )
      }
      return(
        <Button color="primary" >{type.[0]}</Button>
      )
      
    };

    const url = "http://localhost:3001/images/" + newId + ".png" ;
    return (
      <Container style={{ width: "auto", margin: "0 auto" }}>
          <Row className="justify-content-md-center">
            <Col className="justify-content-md-center" xs lg="12">
              <h1>{`${id} ${english}`} </h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="5">
                <img width="100%" src={url}  alt="Card cap"/>
            </Col>
            <Col xs lg="4">
            <Table borderless>
                <tbody>
                    <tr>
                    <th scope="row">French Name</th>
                    <td>{french}</td>
                    </tr>
                    <tr>
                    <th scope="row">Chinese Name</th>
                    <td>{chinese}</td>
                    </tr>
                    <tr>
                    <th scope="row">Japanese Name</th>
                    <td>{japanese}</td>
                    </tr>
                    <tr>
                    <th scope="row">Type:</th>
                    <td>
                      {pickType(type)}
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">HP</th>
                    <td>{HP}</td>
                    </tr>
                    <tr>
                    <th scope="row">Attack</th>
                    <td>{Attack}</td>
                    </tr>
                    <tr>
                    <th scope="row">Defense</th>
                    <td>{Defense}</td>
                    </tr>
                    <tr>
                    <th scope="row">SP.Attack</th>
                    <td>{spAttack}</td>
                    </tr>
                    <tr>
                    <th scope="row">Sp.Defense</th>
                    <td>{spDefense}</td>
                    </tr>
                    <tr>
                    <th scope="row">Speed</th>
                    <td>{Speed}</td>
                    </tr>
                    <tr>
                    <th scope="row">Total</th>
                    <td>{Speed+spDefense+spAttack+Attack+Defense+HP}</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
          </Row>
      </Container>
    )
  }
  const columns = useMemo(
    () => [
        {
            Header: () => null,
            id: 'expander', // 'id' is required
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
              </span>
            ),
          },

        {
            Header: "ID",
            accessor: "id",
            disableFilters: true,

            Cell:({cell}) => {
            const { value } = cell;
            var newId;
            if (value<10) {
              newId = '00'+value;
            } else if (value<100 ){
              newId = '0'+value;
            } else {
              newId = value;
            } 
            const urls = "http://localhost:3001/sprites/" + newId + "MS.png" ;
            const pickImg = (theId) => {
                return (
                    <div> 
                      <strong>{newId}</strong>
                      <img width="100%" src={urls} alt={theId} />
                    </div>
                )
              };

            return (
            <div style={{ textAlign: 'center', fontSize: 18 }}>
                {pickImg(value)}
            </div>
            );
        
        }
        },
        {
            Header: "Name",
            accessor: "name.english",
        },
        {
            Header: "HP",
            accessor: "base.HP",
            disableFilters: true,
        },
        {
            Header: "Attack",
            accessor: "base.Attack",
            disableFilters: true,
        },
        {
            Header: "Defense",
            accessor: "base.Defense",
            disableFilters: true,
        },
        {
            Header: "Sp. Attack",
            accessor: (value) => value.base['Sp. Attack'],
            disableFilters: true,
        },
        {
            Header: "Sp. Defense",
            accessor: (value) => value.base['Sp. Defense'],
            disableFilters: true
        },
        {
            Header: "Speed",
            accessor: "base.Speed",
            disableFilters: true,
        },
        {
            Header: 'Type',
            accessor: (values) => {
                const first = values.type[0];
                const second = values.type[1];
                if(second){
                    // return first + '/' + second;
                    return (
                        <p><Button color="primary">{first}</Button><Button color="success">{second}</Button></p>
                    )
                }
                return (
                    <p><Button color="primary">{first}</Button></p>
                )
            },

        },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} renderRowSubComponent={renderRowSubComponent}/>;
    </Container>
    )
};

export default Pokedex;
