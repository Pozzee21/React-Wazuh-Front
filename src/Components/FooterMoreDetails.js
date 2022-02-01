import React from "react";
import { Card, Button } from 'react-bootstrap';


const FooterMoreDetails = ({ Datashow }) => {
    return (
        <div>
            <Card className="text-center">
                <Card.Footer className="text-muted">Manager: {Datashow._source.manager.name} Cluster: {Datashow._source.cluster.name} </Card.Footer>
            </Card>
        </div>)
}
export default FooterMoreDetails;