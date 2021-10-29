import React, { useState, useEffect } from 'react'
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';
import { Table, Button, ButtonToolbar } from 'react-bootstrap'



export default function Department(props) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [department, setDepartment] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const initialFormState = { depid: null, depname: '' }
    const [currentUser, setCurrentUser] = useState(initialFormState);

    const refreshList = async () => {
        let url = `http://localhost:61017/api/Department`
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)
        setDepartment(parsedData);
        setAddModalShow(false);
    }

    useEffect(() => {
        refreshList();
    }, [])

    const addModalShowHandler = () => {
        setAddModalShow(true);
    }

    const editModalShowHandler = (element) => {
        // console.log(element.DepartmentId);
        // console.log(element.DepartmentName);
        setCurrentUser({ depid: element.DepartmentId, depname: element.DepartmentName })
        setEditModalShow(true);
    }

    const onAddHideHandler = () => {
        setAddModalShow(false);
        refreshList();
    }

    const onEditHideHandler = () => {
        setEditModalShow(false);
        refreshList();
    }

    const deletedepHandler = (depid) => {
        let urldelete = `http://localhost:61017/api/Department/${depid}`
        if (window.confirm('Are you sure?')) {
            fetch(urldelete, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
        refreshList();
    }

    return (
        <div>
            <ButtonToolbar className="mt-4">
                <Button variant="primary" onClick={addModalShowHandler}>Add Department</Button>
                <AddDepartment show={addModalShow} onHide={onAddHideHandler}></AddDepartment>
            </ButtonToolbar>

            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign:'center'}}>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th colSpan="2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {department.map((element) => {
                        return <tr key={element.DepartmentId}>
                            <td>{element.DepartmentId}</td>
                            <td>{element.DepartmentName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="info" className="mr-2" onClick={() => editModalShowHandler(element)}>Edit</Button>
                                    <EditDepartment refresh={refreshList} show={editModalShow} onHide={onEditHideHandler} depid={currentUser.depid} depname={currentUser.depname}></EditDepartment>
                                </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="danger" className="mr-2" onClick={() => deletedepHandler(element.DepartmentId)}>Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}
