import React from "react";
import { Offcanvas, } from 'react-bootstrap';

const MoreDetails = ({Datashow, handleMoreDetails})=>{  
    return (
      <div>
        <Offcanvas show={MoreDetails} onHide={() => {this.handleMoreDetails()}}>
          <Offcanvas.Header closeButton onClick={handleMoreDetails()}>
            <Offcanvas.Title>More about {Datashow? <h5> {Datashow._id} </h5>: <h5>None</h5>}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>

          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }
  export default MoreDetails;