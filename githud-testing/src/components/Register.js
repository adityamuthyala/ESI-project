import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
} from "reactstrap";

import { useForm } from "react-hook-form";
import alergif from "../assets/img/esi-logoo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import countries from './data/countries';
import states from './data/states';

const Register = () => {
  // const samplecountries = countries;
const samplestates = states.in;
let colors = [' Person who holds a postgraduate degree in Endocrinology (DM/DNB) from a recognized institute in India shall be eligible to become life-members.',
' A person who holds a postgraduate degree in Endocrinology from a recognized institute abroad after undergoing two / three years residency program duly recognized and registered by either the Medical Council of India or State Medical Council shall be eligible to be enrolled as a life-member of the society after their application is duly considered and approved by the credential committee.',
' A person who holds a postgraduate degree in basic life sciences or a research Doctorate degree in the basic or applied endocrinology and is engaged in scientific work in the field of endocrinology evidenced through his/her profession and/or scientific activities shall be eligible to be enrolled as a member of the society after their application is duly considered and approved by the credential committee.',
'A person who holds a postgraduate degree in Medicine or any of the allied branches of Medicine and is in full time research/teaching in a department of Endocrinology at a recognized teaching institute for at least three years after obtaining the postgraduate degree and has made significant scientific contributions in any of the areas of endocrinology shall be eligible to be enrolled as a member of the society after their application is duly considered and approved by the credential committee.'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data, e) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("designation", data.designation);
    formData.append("institute", data.institute);
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("address", data.address);
    formData.append("panno", data.panno);
    formData.append("pandoc", data.pandoc[0]);
    formData.append("addressdoc", data.addressdoc[0]);
    formData.append("image", data.image[0]);
    formData.append("mbbsdoc", data.mbbsdoc[0]);
    formData.append("mddoc", data.mddoc[0]);
    formData.append("dmdoc", data.dmdoc[0]);
    formData.append("mcidoc", data.mcidoc[0]);
    formData.append("pname", data.pname);
    formData.append("pemail", data.pemail);
    formData.append("pesi", data.pesi);
    formData.append("sname", data.sname);
    formData.append("semail", data.semail);
    formData.append("sesi", data.sesi);
    formData.append("radiobuttons", data.radiobuttons);

    

    // formData.append("pdf", data.pdf[0]);

    const res = await fetch(
      "http://localhost:8080/api/v1/members/createMember",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    toast.success('you have  Successfully registerd', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    e.target.reset();
    console.log(res)

  };

  return (
    <Card>
      <CardHeader>
    
       
        <div style={{margin:"0 0 50px 0px"}}>
          <img
            width="30%"
            alt="logo"
            style={{ display: "block", margin: "auto" }}
            src={alergif}
          ></img>
           <h3 style={{textAlign:"left"}}>ESI Membership Application Form</h3>
        </div>
<div className="row">
  <div className="col-md-12">
  <Button style={{margin:'auto',display:'block',float:"right"}} color="primary"><a style={{textDecoration: 'none',color:'white'}} href="https://endocrinesocietyindia.org/" target="_blank" rel="noreferrer" >Endocrinesocietyindia Website</a></Button>
  </div>
</div>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
      
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="nameMulti">
                    Full Name
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="text"
                    name="fullname"
                    {...register("name", { required: "Full Name is required", 
                    min: {
                      value: 3,
                      message:"Manimum Required Characters 3"
                    },
                    max: {
                      value: 50,
                      message:"Maximum Required Characters 3"
                    },
                    pattern: {
                      value: /^[a-zA-Z]*$/,
                      message: "Only charcters are allowed"
                    },

                  })}
                  onKeyUp={() => {
                    trigger("name")
                  }}
                  />
                  {errors.name && <small className="text-danger">{errors.name.message}</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Professional Communication Email
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    {...register("email", { required: "Email is Required", 
                     pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }})}
                    onKeyUp={() => {
                      trigger("email")
                    }}
                  />
                  {errors.email && <small className="text-danger">{errors.email.message}</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Professional Communication Mobile.No
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    {...register("mobile", { required: "mobile no. is required", 
                    pattern: {
                      value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
                      message: "Invalid mobile number",
                    }})}
                    onKeyUp={() => {
                      trigger("mobile")
                    }}
                  />
                  {errors.mobile && <small className="text-danger">{errors.mobile.message}</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Designation
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    {...register("designation", { required: "Designationis required", 
                    min: {
                      value: 3,
                      message:"Manimum Required Characters 3"
                    },
                    max: {
                      value: 50,
                      message:"Maximum Required Characters 3"
                    },
                    pattern: {
                      value: /^[a-zA-Z]*$/,
                      message: "Only charcters are allowed"
                    },

                  })}
                  onKeyUp={() => {
                    trigger("designation")
                  }}
                  />
                  {errors.designation && (
                    <small  className="text-danger">{errors.designation.message}</small>
                  )}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Institute
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    name="institute"
                    {...register("institute", { required: "Institute in required", 
                    min: {
                      value: 3,
                      message:"Manimum Required Characters 3"
                    },
                    max: {
                      value: 50,
                      message:"Maximum Required Characters 3"
                    },
                    pattern: {
                      value: /^[a-zA-Z]*$/,
                      message: "Only charcters are allowed"
                    },

                  })}
                  onKeyUp={() => {
                    trigger("institute")
                  }}
                   
                  />
                  {errors.institute && (
                    <small  className="text-danger">{errors.institute.message}</small>
                  )}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Photo<span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    name="image"
                    {...register("image", { required: true })}
                    type="file"
                  />
                  {errors.image && <small className="text-danger">Photo is required</small>}
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <hr />
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label>
                    Address<span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="textarea"
                    className="form-control"
                    {...register("address", { required: true })}
                    name="address"
                  />
                  {errors.address && (
                    <small className="text-danger">Address is required</small>
                  )}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Address Proof (Please Upload pfd)
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="file"
                    {...register("addressdoc", { required: true })}
                    name="addressdoc"
                  />
                  {errors.addressdoc && <small className="text-danger" >Your Address Proof is required</small>}
                </FormGroup>
              </Col>
              {/* <Col md="6" sm="12">
                </Col> */}
              <Col md="6" sm="12">
              <FormGroup>
               <Label className="mb-2">Country</Label>
               <input
                    className="form-control"
                    type="text"
                    {...register("country", { required: true })}
                    name="country"
                    readOnly
                    value="India"
                  />
                </FormGroup>
                </Col>
                <Col md="6" sm="12">
                <FormGroup>
               <Label className="mb-2">State</Label>
               <select type="textarea"
                    className="form-control"
                    {...register("state", { required: true })}
                     name="state"
                      >
                   <option>--Select State--</option>
                   {
                     samplestates.map( (res,index)=>(                    
                   <option key={index} >{ res}</option>
                     ))
                     }
                 </select>
                 {errors.country && (
                    <small style={{ color: "red", fontSize: 18 }}>State is required</small>
                  )}
                 </FormGroup>
                </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Pancard No.
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("panno", { required: true })}
                    name="panno"
                  />
                  {errors.panno && <small className="text-danger">pan number is required</small>}
                </FormGroup>
              </Col>
             
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Pancard Document (Please Upload pfd)
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="file"
                    {...register("pandoc", { required: "pan number no. is required" 
                    // pattern: {
                    //   value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
                    //   message: "Invalid mobile number",
                    // }
                  })}
                    
                    onKeyUp={() => {
                      trigger("pandoc")
                    }}
                    
                  />
                  {errors.pandoc && <small className="text-danger">{errors.pandoc.message}</small>}
                </FormGroup>
              </Col>
             
              <Col md="12" sm="12">
                <hr />
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    MBBS Certificate (Please Upload pfd)
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="file"
                    {...register("mbbsdoc", { required: true })}
                    name="mbbsdoc"
                  />
                  {errors.mbbsdoc && <small className="text-danger">MBBS Certificate is required</small>}
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    MD Certificate (Please Upload pfd)
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="file"
                    {...register("mddoc", { required: true })}
                    name="mddoc"
                  />
                  {errors.mddoc && <small className="text-danger">MD Certificate is required</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    DM Certificate (Please Upload pfd)
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="file"
                    {...register("dmdoc", { required: true })}
                    name="dmdoc"
                  />
                  {errors.dmdoc && <small className="text-danger">DM Certificate is required</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    MCI Certificate (Please Upload pfd)
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    className="form-control"
                    type="file"
                    {...register("mcidoc", { required: true })}
                    name="mcidoc"
                  />
                  {errors.mcidoc && <small className="text-danger">MCI Certificate is required</small>}
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <hr />
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Proposure Name
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("pname", { required: true })}
                    name="pname"
                  />
                  {errors.pname && <small className="text-danger">Proposure Name is required</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  
                  <Label>
                    Proposure Email
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("pemail", { required: true })}
                    name="pemail"
                  />
                  {errors.pemail && <small className="text-danger">Proposure Email is required</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Proposure Membership Id
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("pesi", { required: true })}
                    name="pesi"
                  />
                  {errors.pesi && <small className="text-danger">Proposure Membership Id is required</small>}
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <hr />
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Secoundary Name
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("sname", { required: true })}
                    name="sname"
                  />
                  {errors.sname && <small className="text-danger">Secoundary Name is required</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Secoundary Email
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("semail", { required: true })}
                    name="semail"
                  />
                  {errors.semail && <small className="text-danger">Secoundary Email is required</small>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Secoundary Membership Id
                    <span style={{ color: "red", fontSize: 18 }}>*</span>
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("sesi", { required: true })}
                    name="sesi"
                  />
                  {errors.sesi && <small className="text-danger">Secoundary Membership Id required</small>}
                </FormGroup>
              </Col>
              <Col md="12">
                <hr></hr>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>  
    {colors.map(res => (
      <div style={{marginTop:'20px'}}>
      <input 
      value={res}
       type="radio" 
       name="radiobuttons" 
       {...register("radiobuttons", { required:true})}
         />
      <b>{res}</b>
   
    
      </div>
      
    ))}
      {errors.radiobuttons && <small className="text-danger">Please Select one Membership Requirement</small>}
                </FormGroup>
              </Col>
              <Row>
                <Col>
                  <FormGroup className="d-flex justify-content-center">
                    <div style={{ marginRight: "10px" }}>
                      <Button className="btn" color="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                    {/* <Button outline color='secondary' type='reset'>
                    Reset
                  </Button> */}
                  </FormGroup>
                </Col>
              </Row>
            </Row>
          </Form>
        </CardBody>
      </CardHeader>
      <ToastContainer />
    </Card>
  );
};

export default Register;