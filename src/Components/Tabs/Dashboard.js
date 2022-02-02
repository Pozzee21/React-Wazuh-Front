import React, { Component } from "react";
import ChartPie from "../charts/ChartPie"
import ChartBar from "../charts/ChartBar"
import ChartLine from "../charts/ChartLine"
import { Row, Col, Card } from 'react-bootstrap';


export default function Dashboard(){
    
    return (

      <div>
        <h2>Dashboard</h2>
        
        <div className="container">
          <Row className="mt-2">
            <Col >
              <Card>
                <div className="card">
                  <h5 className="card-header">Number of alerts per rule</h5>
                  <div className="card-body">
                    <div className="p-2">
                      <ChartPie />
                    </div>
                    <a href="#/rules" className="btn btn-primary">See more details </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col>
            <Card>
                <div className="card">
                  <h5 className="card-header">Alerts per OS</h5>
                  <div className="card-body">
                    <div className="p-2">
                      <ChartLine />
                    </div>
                    <a href="#/alerts" className="btn btn-primary">See more details </a>
                  </div>
                </div>
              </Card>
              
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
            <Card>
                <div className="card">
                  <h5 className="card-header">Number of alerts per Agent</h5>
                  <div className="card-body">
                    <div className="p-2">
                      <ChartBar />
                    </div>
                    <a href="#/Alerts" className="btn btn-primary">See more details </a>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <br />
        <i>*OS = Operative System</i>
      </div>
    );
 }