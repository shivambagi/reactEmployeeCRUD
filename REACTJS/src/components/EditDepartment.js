import React,{useEffect} from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'

export default function EditDepartment(props) {
    
    const handleSubmit = (event) => {
        
        event.preventDefault();
        let url = `http://localhost:61017/api/Department`
        fetch(url,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:event.target.DepartmentId.value,
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

    useEffect(() => {
        // console.log('propsid-' + props.depid);
        // console.log('props-' + props.depname);
    })

    return (
        <div className="container">            
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="DepartmentId">
                                    <Form.Label>Department ID</Form.Label>
                                    <Form.Control type="text" name="DepartmentId" disabled required defaultValue={props.depid} placeholder="Department ID"></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="DepartmentName">
                                    <Form.Label>Department Name</Form.Label>
                                    <Form.Control type="text" name="DepartmentName" required defaultValue={props.depname} placeholder="Department Name"></Form.Control>
                                    <Button className="mt-2" variant="primary" type="submit">Update Department</Button>
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
