import React, { useEffect, useState } from "react";
import { Badge, Modal, Button,Row, Col,ListGroup,Tab, Pagination} from 'react-bootstrap';
import {CgScreen } from "react-icons/cg";
import {AiOutlineCloudServer } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

export default function Agents(){


         const [data, setData] = useState([]);
         const [total_items,  setTotalItems] = useState(0) ;
         const [showModal,  setshowModal] = useState(false) ;
         const [Datashow,  setDatashow] = useState({}) ;
         const [loading,  setLoading] = useState(true) ;

   useEffect(()=> {
      var uri = '/agents?offset=0&limit=99';
      fetch(uri)
          .then(res => { return res.json() })
          .then(res => { setData(res.data); setTotalItems(res.total_items); setLoading(false) });
  },[]);

  const handleModal= e => {
      
      data.map((dataAgent) => {
          if (e === dataAgent.id) {
            setDatashow( dataAgent )
          }
      })
     setshowModal(!showModal);
  };

      return (
          <div>
              <h2>Agents</h2>
              <div className="mt-4">
                  <ul className="list-group ">
                      {data.map(data =>
                          <a key={data.id} className="list-group-item d-flex justify-content-between align-items-center fw-bold" onClick={() => { handleModal(data.id) }}> Id: {data.id} 
                          <br/>Ip: {data.ip} <Badge bg="warning" data-toggle="tooltip" data-placement="top" title="Alert from this agent ">{data.total_alerts}</Badge> </a>
                      )}
                  </ul>
              </div><br/>
              {loading? <div className="text-center" ><IconContext.Provider value={{ size: "2em" }}><AiOutlineCloudServer /> </IconContext.Provider > <b>Loading...</b> <IconContext.Provider value={{ size: "2em" }}><CgScreen /> </IconContext.Provider ></div>:""} 

              <h3>Number of Alerts: {total_items}</h3>
              <div>
                  <Modal show={showModal} onHide={() => { handleModal() }}>
                      <Modal.Header closeButton>
                          <Modal.Title>Agent ID: {Datashow.id}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                          <div className="container">
                              <p className="fw-blond">Total fired alerts: {Datashow.total_alerts}</p>
                              {Datashow.ip? <ListGroup.Item >IP: {Datashow.ip}</ListGroup.Item>:<ListGroup.Item>IP: Empty</ListGroup.Item>}
                              {Datashow.name? <ListGroup.Item>Name: {Datashow.name}</ListGroup.Item>:<ListGroup.Item>Name: Empty</ListGroup.Item>}
                          </div>

                      </Modal.Body>

                      <Modal.Footer>
                          <Button variant="secondary" onClick={() => { handleModal() }}>Close</Button>
                      </Modal.Footer>
                  </Modal>

              </div>
          </div>

      )

  }