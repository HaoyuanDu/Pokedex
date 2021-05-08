import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './tableContainer';
//import { Container, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { img, Container, Button, Row, Col } from "reactstrap"
//import { SelectColumnFilter } from './filters';
//import Pokemon from './pokemon';

const Pokedex = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('http://localhost:3001/pokedex');
      const body = await response.json();
      //console.log(body);
      setData(body);
    };
    doFetch();
  }, []); 
  const renderRowSubComponent = row => {
    const {
        id,
        name: { english, chinese, japanese, french },
        type,
        base: { HP, Attack, Defense, Speed },
        
    } = row.original
    return (
      <Container style={{ width: "auto", margin: "0 auto" }}>
          <Row className="justify-content-md-center">
            <Col className="justify-content-md-center" xs lg="12">
              <strong>{`${id} ${english}`} </strong>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="5">
                <img width="100%" src="http://localhost:3001/images/001.png"  alt="Card cap"/>
            </Col>
            <Col xs lg="3">
                <strong>French Name</strong> <br />
                <strong>Chinese Name</strong> <br />
                <strong>japanese Name</strong><br />
                <strong>Type:</strong><br />
                <strong>HP</strong> <br />
                <strong>Attack</strong> <br />
                <strong>Defense</strong> <br />
                <strong>speed</strong> <br />
                <strong>Attack</strong> <br />
                <strong>Defense</strong> <br />
            </Col>
            <Col xs lg="3">
                : {french} <br />
                : {chinese} <br />
                : {japanese} <br />
                <Button>{type}</Button><br />
                : {HP} <br />
                : {Attack} <br />
                : {Defense} <br />
                : {Speed} <br />
                : {Attack} <br />
                : {Defense} <br />
            </Col>
          </Row>
          
        {/* <CardImg left src="http://localhost:3001/images/001.png" rounded alt="Card image cap" />
        <CardBody>
          <CardTitle>
            <strong>{`${id} ${english}`} </strong>
          </CardTitle>
          <CardText>
            <strong>French Name</strong>: {french} <br />
            <strong>Chinese Name</strong>: {chinese} <br />
            <strong>japanese Name</strong>: {japanese} <br />
            <strong>Base data:</strong> {`${HP} ${Attack} - ${Defense} - ${speed}`}
          </CardText>
        </CardBody> */}
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

        // Cell:({cell}) => {
        //     const { value } = cell;
        //     console.log("value:",value);
        //     const pickImg = (value) => {
        //         //value = 000 + value;
        //         let first = "/sprites/" + value + "MS.png"; 
        //         let src = baseUrl + first;
        //         console.log(src);
        //         return (
        //             <div> <img width="100%" src={baseUrl + first} alt={value} /></div>
        //         )
        //       };

        //     return (
        //     <div style={{ textAlign: 'center', fontSize: 18 }}>
        //         {pickImg(value)}
        //     </div>
        //     );
        
        // }

        },
    //   {
    //     Header: "ID",
    //     accessor: "id",
    //   },
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
                    return first + '/' + second;
                //     return (
                //         <p><Button>{first}</Button><Button>{second}</Button></p>
                //     )
                }
                // return (
                //     <p><Button>{first}</Button></p>
                // )
                return first;
            },
            Cell:({cell}) => {
                const { value } = cell;
                //console.log("value:",value);
                const pickEmoji = (value) => {
                    let first = value; 
                    return (
                        <p><Button>{first}</Button></p>
                    )
                };

                return (
                <div style={{ textAlign: 'center', fontSize: 18 }}>
                    {pickEmoji(value)}
                </div>
                );
            
            }
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
