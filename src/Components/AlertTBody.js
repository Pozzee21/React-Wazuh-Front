import React from "react";


const Alert = ({ AlertData, loading, handleModal }) => {
    if (loading) {
        return (
            <tr>
                <td>
                    <b>Loading...</b>
                </td>
            </tr>
        )

    }
    if (AlertData) {
        return (
            <tr key={AlertData._id} onClick={() => { handleModal(AlertData._id) }} data-toggle="tooltip" data-placement="top" title="Click me for more details" >
                <td>{AlertData._id}</td>
                <td>{(AlertData._source.timestamp).toString().slice(0, 10).replaceAll("-", "/")}</td>
                <td>{AlertData._source.agent.ip}</td>
                <td>{AlertData._source.agent.name}</td>
                <td>{AlertData._source.agent.id}</td>
                <td>{AlertData._source.rule.description}</td>
            </tr>
        )
    }else{
        return(
            <tr>
            <td>
                <b>Loading...</b>
            </td>
        </tr>
        )
    }

}
export default Alert;