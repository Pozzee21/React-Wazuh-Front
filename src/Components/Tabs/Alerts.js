import React, { useEffect, useState } from "react";
import { Modal, Button, Col, Row, Offcanvas, Accordion } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Agent from '../Agent';
import SourceData from "../SourceData";
import AccordionRule from '../Accordion';
import FooterMoreDetails from "../FooterMoreDetails";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import {CgScreen } from "react-icons/cg";
import {AiOutlineCloudServer } from "react-icons/ai";
import { IconContext } from "react-icons/lib";



export default function Agents() {


    const [data, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [showModal, setshowModal] = useState(false);
    const [Datashow, setDatashow] = useState({});
    const [currentPage, setCurrentPage] = useState([]);
    const [searchAll, setSearchAll] = useState(false);
    const [pagination, setPagination] = useState(0);
    const [finalPage, setFinalPage] = useState(10);
    const [alertPerPage, setAlertPerPage] = useState(10);
    const [showMoreDetails, setshowMoreDetails] = useState(false);
    const [reverse, setReverse] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        var uri = '/alerts?offset=0&limit=99';
        fetch(uri)
            .then(res => { return res.json() })
            .then(res => {
                setData(res.data);
                setTotalItems(res.total_items);
                setCurrentPage(res.data.slice(pagination, alertPerPage));
                setLoading(false)
            });
    }, [])

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

    const handlePageClick = e => {
        const page = (e.selected + 1) * alertPerPage;
        setPagination(page);
        const lastPage = page + alertPerPage;
        setFinalPage(lastPage);
        setCurrentPage(data.slice(page, lastPage))
    }
    const sortArrayTable = variable => {
        var dataSort = currentPage
        var up, down;
        if (reverse) {
            up = -1;
            down = 1;
        } else {
            up = 1;
            down = -1;
        }
        dataSort.sort(function (a, b) {
            switch (variable) {
                case "_id":
                    if (a._id < b._id) {

                        return down;
                    }
                    if (a._id > b._id) {
                        return up;
                    }
                    break;
                case "Timestamp":
                    if (a._source.timestamp < b._source.timestamp) {

                        return down;
                    }
                    if (a._source.timestamp > b._source.timestamp) {
                        return up;
                    }

                    break;
                case "ip":
                    if (a._source.agent.ip < b._source.agent.ip) {

                        return down;
                    }
                    if (a._source.agent.ip > b._source.agent.ip) {
                        return up;
                    }
                    return 0;

                    break;
                case "name":

                    if (a._source.agent.name < b._source.agent.name) {

                        return down;
                    }
                    if (a._source.agent.name > b._source.agent.name) {
                        return up;
                    }

                    break;
                case "id":
                    if (parseInt(a._source.agent.id) < parseInt(b._source.agent.id)) {

                        return down;
                    }
                    if (parseInt(a._source.agent.id) > parseInt(b._source.agent.id)) {
                        return up;
                    }
                    break;
                case "Details":
                    if (a._source.rule.description < b._source.rule.description) {

                        return down;
                    }
                    if (a._source.rule.description > b._source.rule.description) {
                        return up;
                    }
                    break;

            };

        })
        var revers = !reverse;
        setReverse(revers);
        setCurrentPage(dataSort);
    }

    const searchAlert = e => {
        let dataResult = [];
        if (e === "" || e === " ") {
            const e = pagination;
            const v = finalPage;
            dataResult = data.slice(e, v);
        } else {
            if(searchAll){
                dataResult = data.filter(row => row._id.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                || row._source.agent.name.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                || row._source.agent.ip.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                || row._source.agent.id.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                || row._source.rule.description.toString().toLowerCase().indexOf(e.toLowerCase()) > -1)

            }else{
                
                dataResult = currentPage.filter(row => row._id.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                    || row._source.agent.name.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                    || row._source.agent.ip.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                    || row._source.agent.id.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
                    || row._source.rule.description.toString().toLowerCase().indexOf(e.toLowerCase()) > -1)
            }
        }
        setCurrentPage(dataResult);
    }


    const handleMoreDetails = () => {
        if (showModal) {
            handleModal();
        }
        setshowMoreDetails(!showMoreDetails);
    }
    const handleInputChange= ()=>{
        setSearchAll(!searchAll);
    }
    return (
        <div>
            <Row>
                <Col>
                    <h2>Alerts</h2>
                    <h6>Number Alerts: {total_items}</h6>
                </Col>
                <Col>
                    <div className="searchBar" style={{ display: "inline-block" }}>
                        <label style={{ marginRight: '10px' }}>Search</label>
                        <input type="text" onKeyUp={(e) => searchAlert(e.target.value)} placeholder="id, Name,ip, id agent or Details"></input><br/>
                        <label> Search in all alerts </label><a> </a>
                        <input className="form-check-input" name="SearchAll" type="checkbox" checked={searchAll} onChange={handleInputChange} />
                    </div>
                </Col>
            </Row>


            <div className="container-fluid">
                <table className="table  table-hover">
                    <thead className="table-dark">
                        <tr className="">

                            <th scope="col" onClick={() => { sortArrayTable("_id") }} data-toggle="tooltip" data-placement="top" title="Click me an filter the data">ID</th>
                            <th scope="col" onClick={() => { sortArrayTable("Timestamp") }}data-toggle="tooltip" data-placement="top" title="Click me an filter the data">TimeStamp</th>
                            <th scope="col" onClick={() => { sortArrayTable("ip") }}data-toggle="tooltip" data-placement="top" title="Click me an filter the data">Agent IP</th>
                            <th scope="col" onClick={() => { sortArrayTable("name") }}data-toggle="tooltip" data-placement="top" title="Click me an filter the data">Agent Name</th>
                            <th scope="col" onClick={() => { sortArrayTable("id") }}data-toggle="tooltip" data-placement="top" title="Click me an filter the data">Agent ID</th>
                            <th scope="col" onClick={() => { sortArrayTable("Details") }}data-toggle="tooltip" data-placement="top" title="Click me an filter the data">Details</th>
                            <th scope="#">{reverse ? <IconContext.Provider value={{ size: "1em" }}><BsArrowUp /> </IconContext.Provider > : <IconContext.Provider value={{ size: "1em" }}> <BsArrowDown /></IconContext.Provider>}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentPage.map(data => {
                            return (
                                <tr key={data._id} onClick={() => { handleModal(data._id) }} data-toggle="tooltip" data-placement="top" title="Click me for more details">
                                    <td>{data._id}</td>
                                    <td>{(data._source.timestamp).toString().slice(0, 10).replaceAll("-", "/")}</td>
                                    <td>{data._source.agent.ip}</td>
                                    <td>{data._source.agent.name}</td>
                                    <td>{data._source.agent.id}</td>
                                    <td>{data._source.rule.description}</td>
                                    <td></td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
                    {loading? <div className="text-center"><IconContext.Provider value={{ size: "2em" }}><AiOutlineCloudServer /> </IconContext.Provider > <b>Loading...</b> <IconContext.Provider value={{ size: "2em" }}><CgScreen /> </IconContext.Provider ></div>:""} 
                <div className="container">
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(total_items / alertPerPage - 1)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
            <div>
                <Modal size="mg" aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={() => { handleModal() }}>
                    <Modal.Header closeButton>
                        {Datashow._id ? <Modal.Title>Alert ID: {Datashow._id}</Modal.Title> : <Modal.Title>Alert ID: Empty</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <div className="Container">
                            {Datashow ? <p><b>Alert index:</b> {Datashow._index} </p> : <p>Index: No Index Found</p>}
                            <Row>
                                <Col>
                                    {Datashow ? <p><b>Alert type:</b>{Datashow._type}</p> : <p>No Type Found</p>}
                                </Col>
                                <Col>
                                    {Datashow ? <p><b>Alert score:</b> {Datashow._score}</p> : <p>No Score Found</p>}
                                </Col>
                            </Row>
                        </div>
                        <Agent Datashow={Datashow} />
                        <AccordionRule Datashow={Datashow} />
                        <a className="asd" onClick={() => { handleMoreDetails() }}>More details </a>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleModal() }}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Offcanvas show={showMoreDetails} onHide={() => { handleMoreDetails() }} placement="end">
                    <Offcanvas.Header closeButton onClick={() => { handleMoreDetails() }}>
                        <Offcanvas.Title>More about Alert:{Datashow ? <h5> {Datashow._id} </h5> : <h5>None</h5>}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <b>Agent</b>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Agent Datashow={Datashow}></Agent>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <AccordionRule Datashow={Datashow} />
                        <SourceData Datashow={Datashow} />
                    </Offcanvas.Body>
                    <div className="container">
                        <FooterMoreDetails Datashow={Datashow} />
                    </div>
                </Offcanvas>
            </div>
        </div>
    )
}