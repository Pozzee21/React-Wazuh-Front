import React from "react";
import { Card, Button } from 'react-bootstrap';


const AgentDetail = ({ Datashow }) => {
  return (
    <div>

      <Card className="text-center">
        <Card.Header><b> Agent</b></Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            {Datashow._source? <p><b>Id: </b>{Datashow._source.agent.id}</p> : <b>No data found</b>}
            {Datashow._source? <p><b>Name: </b>{Datashow._source.agent.name}</p> : <b>Name: No data found</b>}
          </Card.Text>
          <Button variant="primary" href="#/Agents">View all agents</Button>
        </Card.Body>
        <Card.Footer className="text-muted"> {Datashow._source? <p><b>Ip: </b>{Datashow._source.agent.ip}</p> : <b>Ip: No data found</b>}</Card.Footer>
      </Card>
    </div>)
}
export default AgentDetail;