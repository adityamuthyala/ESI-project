import React from 'react';
import { useForm } from "react-hook-form";
import { Card, Form, Row, Col, FormGroup, Button} from 'reactstrap';

const Dummy = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit= (data) => {
        console.log(data)
  }
    return (
        <div>
            {/* <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                <Col>
                <FormGroup>
                <input type="text" {...register('name', { required: true })} placeholder="Enter your name" />
                {errors.name && <small>Full Name is required</small>}
                <br />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                <input  placeholder="Enter your email" />               
                <br />
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                <Button type='submit'>Submit</Button>
                </FormGroup>
                
            </Form>
            </Card> */}
        </div>
    );
};

export default Dummy;