import React,{useEffect,useState} from 'react'
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap'

export default function EditEmployee(props) {
    const [departmentsDD, setdepartmentsDD] = useState([]);
    let photofilename = props.photo;
    const [imagesrc, setimagesrc] = useState(`http://localhost:61017/Photos/${photofilename}`)
    // let imagesrc = `http://localhost:61017/Photos/${photofilename}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = `http://localhost:61017/api/Employee`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: event.target.EmployeeId.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                DateOfJoining: event.target.DateOfJoining.value,
                PhotoFileName: photofilename
            })
        }).then(resp => resp.json())
            .then((result) => {
                alert(result);
            }, (error) => { alert('Failed') });
        setimagesrc(`http://localhost:61017/Photos/${photofilename}`);
    }

    const getDepartments = async () => {
        let urldept = `http://localhost:61017/api/Department`;
        let data = await fetch(urldept);
        let parsedData = await data.json();
        setdepartmentsDD(parsedData);
    }

    useEffect(() => {
        getDepartments();
        // let photofilename = props.photo;
        // setimagesrc(`http://localhost:61017/Photos/${photofilename}`);
    }, [])

    const handleFileSelected = (event) => {
        event.preventDefault();
        photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        let urlsave = `http://localhost:61017/api/Employee/SaveFile`
        fetch(urlsave, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then((result) => {
                // imagesrc = 'http://localhost:61017/Photos/' + result;
                setimagesrc('http://localhost:61017/Photos/' + result);
            },
                (error) => {
                    alert('Failed');
                })

    }


    return (
        <div className="container">
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="EmployeeId">
                                    <Form.Label>Employee ID</Form.Label>
                                    <Form.Control type="text" name="EmployeeId" disabled defaultValue={props.empid} required></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="EmployeeName">
                                    <Form.Label>Employee Name</Form.Label>
                                    <Form.Control type="text" name="EmployeeName" required defaultValue={props.empname}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="Department">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control as="select" defaultValue={props.empdep}>
                                        {departmentsDD.map(dep =>
                                            <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DateOfJoining">
                                    <Form.Label>Date Of Joining</Form.Label>
                                    <Form.Control type="date" name="DateOfJoining" required defaultValue={props.doj} ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button className="mt-2" variant="primary" type="submit">Update Employee</Button>
                                </Form.Group>                                
                            </Form>
                        </Col>
                        <Col sm={6}>
                                <Image width="200px" height="200px" src={imagesrc}></Image>
                                <input onChange={handleFileSelected} type="file"></input>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
