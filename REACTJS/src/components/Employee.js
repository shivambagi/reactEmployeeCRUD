import React, { useState, useEffect } from 'react'
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import { Table, Button, ButtonToolbar } from 'react-bootstrap'

export default function Employee() {
    const [addModalShow, setAddModalShow] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const initialFormState = { depid: null, depname: '' }
    const [currentUser, setCurrentUser] = useState(initialFormState);

    const refreshList = async () => {
        let url = `http://localhost:61017/api/Employee`
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)
        setEmployee(parsedData);
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
        setCurrentUser({
            empid: element.EmployeeId,
            empname: element.EmployeeName,
            empdep: element.Department,
            doj: element.DateOfJoining,
            photo: element.PhotoFileName
        })
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

    const deleteempHandler = (empid) => {
        let urldelete = `http://localhost:61017/api/Employee/${empid}`
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
                <Button variant="primary" onClick={addModalShowHandler}>Add Employee</Button>
                <AddEmployee show={addModalShow} onHide={onAddHideHandler}></AddEmployee>
            </ButtonToolbar>

            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign:'center'}}>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Date Of Joining</th>
                        <th colSpan="2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((element) => {
                        return <tr key={element.EmployeeId}>
                            <td>{element.EmployeeId}</td>
                            <td>{element.EmployeeName}</td>
                            <td>{element.Department}</td>
                            <td>{element.DateOfJoining}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="info" className="mr-2" onClick={() => editModalShowHandler(element)}>Edit</Button>
                                    <EditEmployee refresh={refreshList} show={editModalShow} onHide={onEditHideHandler} empid={currentUser.empid}
                                    empname={currentUser.empname} empdep={currentUser.empdep} doj={currentUser.doj} photo={currentUser.photo}></EditEmployee>
                                </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="danger" className="mr-2" onClick={() => deleteempHandler(element.EmployeeId)}>Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}
