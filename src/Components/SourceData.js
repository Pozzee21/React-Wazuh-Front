import React from "react";
import { Card, ListGroup } from 'react-bootstrap';


const AgentDetail = ({ Datashow }) => {
    return (
        <div className='mt-2'>

            <Card className="text-center">
                <Card.Header>Source Data</Card.Header>
                <Card.Body>
                     {Datashow._source ? <Card.Title>Date: {(Datashow._source.timestamp).toString().slice(0, 10).replaceAll("-", "/")}</Card.Title>:<Card.Title>Date: Empty</Card.Title> }
                    <Card.Text>
                        <div style={{textAlign:"start"}}>
                            <ul>
                                {Datashow._source ? <ListGroup.Item><b>Id: </b>{Datashow._source.id}</ListGroup.Item> : <ListGroup.Item>Id: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Event: </b>{Datashow._source.syscheck.event}</ListGroup.Item> : <ListGroup.Item>Event: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Path: </b>{Datashow._source.syscheck.path}</ListGroup.Item> : <ListGroup.Item>Path: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Changed attributes: </b>{Datashow._source.syscheck.changed_attributes}</ListGroup.Item> : <ListGroup.Item><b>Changed attributes:</b> Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Uname_after: </b>{Datashow._source.syscheck.uname_after}</ListGroup.Item> : <ListGroup.Item>Uname_after: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Gname_after: </b>{Datashow._source.syscheck.gname_after}</ListGroup.Item> : <ListGroup.Item>Gname_after: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Uid_after: </b>{Datashow._source.syscheck.uid_after}</ListGroup.Item> : <ListGroup.Item>Uid_after: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Perm_after: </b>{Datashow._source.syscheck.perm_after}</ListGroup.Item> : <ListGroup.Item>Perm_after: Empty</ListGroup.Item>}
                                {Datashow._source ? <ListGroup.Item><b>Inode_after: </b>{Datashow._source.syscheck.inode_after}</ListGroup.Item> : <ListGroup.Item>Inode_after: Empty</ListGroup.Item>}
                            </ul>

                        </div>

                    </Card.Text>
                </Card.Body>
                {Datashow._source? <Card.Footer className="text-muted">sha256_after: {Datashow._source.syscheck.sha256_after}</Card.Footer>:<Card.Footer>sha256_after: Empty </Card.Footer>}
            </Card>
        </div>)
}
export default AgentDetail;