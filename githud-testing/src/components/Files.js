import React from 'react';
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardBody, FormGroup, Row, Col, input, Form, Button, Label } from 'reactstrap'

// import axios from 'axios';


const Files = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", data.image[0]);
    formData.append("pdf", data.pdf[0]);

    const res = await fetch("http://localhost:8080/api/v1/members/createMember", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md='6' sm='12'>
          <FormGroup>
            <Label for='nameMulti'>Full Name<span style={{ color: 'red', fontSize: 18 }} >*</span></Label>
            <input className='form-control' type="text" name='fullname' {...register('name', { required: true })} />
            {errors.name && <small>Full Name is required</small>}
          </FormGroup>
        </Col>
        <Col md='6' sm='12'>
              <FormGroup>
                <Label>Professional Communication Email<span style={{color:'red', fontSize: 18}} >*</span></Label>
                <input className='form-control' name="email" type='email' {...register('email',{required: true})} />
                {errors.email && <small>email is required</small>}
              </FormGroup>
            </Col>
        <Col md='6' sm='12'>
          <FormGroup>
            <Label>Photo<span style={{ color: 'red', fontSize: 18 }}>*</span></Label>
            <input className='form-control' name='image' {...register('image', { required: true })} type='file' />
            {errors.image && <small>Your Image is required</small>}
          </FormGroup>
        </Col>
        <Col md='6' sm='12'>
          <FormGroup>
            <Label>Photo<span style={{ color: 'red', fontSize: 18 }}>*</span></Label>
            <input className='form-control' name='pdf' {...register('pdf', { required: true })} type='file' />
            {errors.pdf && <small>Your pdf is required</small>}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup className='d-flex justify-content-center'>
            <div style={{ marginRight: "10px" }}>
              <Button className='btn' color='primary' type='submit'>Submit</Button>
            </div>

          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default Files;