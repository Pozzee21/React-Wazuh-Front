import React from "react";
import { ListGroup, Accordion } from 'react-bootstrap';


const AccordionRule = ({ Datashow }) => {
    return (
        <div className="mt-2">
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <b>Rule</b>
                    </Accordion.Header>
                    <Accordion.Body>
                    {Datashow._source? <h6>Id: {Datashow._source.rule.id}</h6>:  <h6>Id: Empty</h6>}
                        {Datashow._source? <h6>Description: {Datashow._source.rule.description}</h6> : <h6>Description: Empty</h6>}
                        <ul className="list-group text-start">
                            {Datashow._source ? <ListGroup.Item><b>Level:</b> {Datashow._source.rule.level}</ListGroup.Item> : <ListGroup.Item>Level: Empty</ListGroup.Item>}
                            {Datashow._source ? <ListGroup.Item><b>Pci_dss:</b> {Datashow._source.rule.pci_dss}</ListGroup.Item> : <ListGroup.Item>pci_dss: Empty</ListGroup.Item>}
                            {Datashow._source ? <ListGroup.Item><b>Hipaa:</b> {Datashow._source.rule.hipaa}</ListGroup.Item> : <ListGroup.Item>hipaa: Empty</ListGroup.Item>}
                            {Datashow._source ? Object.entries(Datashow._source.rule.groups).map(() => { }) : <ListGroup.Item>nist_800_53: Empty</ListGroup.Item>}
                            {Datashow._source ? <ListGroup.Item><b>nist_800_53:</b> {Datashow._source.rule.nist_800_53}</ListGroup.Item> : <ListGroup.Item>nist_800_53: Empty</ListGroup.Item>}
                            {Datashow._source ? <ListGroup.Item><b>GPG13:</b> {Datashow._source.rule.gpg13}</ListGroup.Item> : <ListGroup.Item>gpg13: Empty</ListGroup.Item>}
                            {Datashow._source ? <ListGroup.Item><b>GDPR:</b> {Datashow._source.rule.gdpr}</ListGroup.Item> : <ListGroup.Item>gdpr: Empty</ListGroup.Item>}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>)
}
export default AccordionRule;