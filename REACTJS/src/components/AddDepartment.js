import React from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'


export default function AddDepartment(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = `http://localhost:61017/api/Department`
        fetch(url,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:null,
                DepartmentName:event.target.DepartmentName.value
            })
        }).then(resp=>resp.json())
        .then((result)=>{
            alert(result);
        },(error)=>{alert('Failed')});
        
    }

    // const onHideFunction =() => {
    //     props.onHide(false);
    // }

    return (
        <div className="container">            
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="DepartmentName">
                                    <Form.Label>Department Name</Form.Label>
                                    <Form.Control type="text" name="DepartmentName" required placeholder="Department Name"></Form.Control>
                                    <Button className="mt-2" variant="primary" type="submit">Add Department</Button>
                                </Form.Group>
                            </Form>
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
