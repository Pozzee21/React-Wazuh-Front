import React, { useEffect, useState } from "react";
import { Badge, Modal, Button, ListGroup } from 'react-bootstrap';
import {CgScreen } from "react-icons/cg";
import {AiOutlineCloudServer } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

export default function Rules() {

    const [data, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [total_alerts, setTotal_alerts] = useState(0);
    const [showModal, setshowModal] = useState(false);
    const [Datashow, setDatashow] = useState({});
    const [loading,  setLoading] = useState(true) ;


    useEffect(() => {
        var uri = '/rules?offset=0&limit=99';
        fetch(uri)
            .then(res => { return res.json() })
            .then(res => { setData(res.data); setTotalItems(res.total_items); setLoading(false) });
    }, []);

    const handleModal = id => {
        data.map((d) => {
            if (id === d._id) {
                setTotalItems(total_items)
                var dataResult = d
                setDatashow(dataResult)
            }
        })
        setshowModal(!showModal);
    }
    return (
        <div className="container-fluid">
            <h2>Rules</h2>
            {loading? <div className="text-center"><IconContext.Provider value={{ size: "2em" }}><AiOutlineCloudServer /> </IconContext.Provider > <b>Loading...</b> <IconContext.Provider value={{ size: "2em" }}><CgScreen /> </IconContext.Provider ></div>:""} 

            <div className="mt-4">
                <ul className="list-group">
                    {data.map(d => {
                    return(
                        <a key={d.rule.id} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => { handleModal(d.rule.id) }}> ID: {d.rule.id} Description: {d.rule.description} <Badge bg="warning" data-toggle="tooltip" data-placement="top" title="Total alerts">{d.total_alerts}</Badge> </a>
                    )}
                    )}
                </ul>
            </div><br />
            <h3>Number of times fired: {total_items}</h3>
            <div>
                <Modal show={showModal} onHide={() => { handleModal() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rule ID: {Datashow.id}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h6>Description: {Datashow.description}</h6>
                        <div className="container">
                            <div>
                                <p><b>Total fired alerts:</b> {total_alerts}</p>
                                {Datashow.mail ? <p><b>Mail:</b> {Datashow.mail}</p> : <p><b>Mail:</b> Empty</p>}
                            </div>
                            <div className="container">
                                <h6 className="fw-blond">Details</h6>
                                <ul className="list-group" >
                                    {Datashow.level ? <ListGroup.Item >Level: {Datashow.level}</ListGroup.Item> : <ListGroup.Item>Level: Empty</ListGroup.Item>}
                                    {Datashow.pci_dss ? <ListGroup.Item>pci_dss: {Datashow.pci_dss}</ListGroup.Item> : <ListGroup.Item>pci_dss: Empty</ListGroup.Item>}
                                    {Datashow.hipaa ? <ListGroup.Item><a></a>Hipaa: {Datashow.hipaa.map(element => element).toString()}</ListGroup.Item> : <ListGroup.Item>Hipaa: Empty</ListGroup.Item>}
                                    {Datashow.groups ? <ListGroup.Item>Group: {Datashow.groups.map(element => element).toString()}</ListGroup.Item> : <ListGroup.Item>Groups: Empty</ListGroup.Item>}
                                    {Datashow.nist_800_53 ? <ListGroup.Item>nist_800_53: {Datashow.nist_800_53}</ListGroup.Item> : <ListGroup.Item>nist_800_53: Empty</ListGroup.Item>}
                                    {Datashow.gpg13 ? <ListGroup.Item>gpg13: {Datashow.gpg13}</ListGroup.Item> : <ListGroup.Item>gpg13: Empty</ListGroup.Item>}
                                    {Datashow.gdpr ? <ListGroup.Item>gdpr: {Datashow.gdpr}</ListGroup.Item> : <ListGroup.Item>gdpr: Empty</ListGroup.Item>}
                                </ul>
                            </div>

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
