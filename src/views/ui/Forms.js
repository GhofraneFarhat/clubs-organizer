import {
  Card,
  Row,
  Col,

  Button,
  Form,
  FormGroup,
  Label,
  Input, Alert,
 
} from "reactstrap";
import Particles from "react-tsparticles";

import { loadFull } from "tsparticles";
import axios, { Axios } from "axios";
import { useState ,useEffect } from "react";
import membersService from "../../shared/member.service";
import {useFormik} from 'formik';

import * as yup from 'yup';

const particlesInit = async (main) => {console.log(main);await loadFull(main);};


const Forms = () => {

  const phoneregExp= /^[1-9]{1}[0-9]{7}$/;
  const [error, setError] = useState(null)


  const [message, setMessage] = useState(null)
  const [submitted,setSubmitted]=useState(false);
  const [fileName, setfileName] = useState('');

  const onChangeFile =e=>{
    setfileName(e.target.files[0])
    }

 
  const formik=useFormik({
  initialValues:{
    firstname: "",
    lastname: "",
    email: "",
    phone :"",
    level :"",
    status:"Pending",
    qu1:"",
    qu2:"",
    qu3:"" ,
  imagePath:"",
  imgName:""
},

validationSchema: yup.object({

  firstname: yup.string()

    .min(3, 'Name should not be less than 3 Characters')

    .required('Please Enter your Name'),
    lastname: yup.string()

    .min(3, 'Name should not be less than 3 Characters')

    .required('Please Enter your Name'),

  phone: yup.string()
/*   .min (8, 'Phone number should not be less than 8 digits')
  .max (8, 'Phone number should not be less than 8 digits') */
    .required('Please Enteryour phone number')
.matches(phoneregExp,"phone number is invalid"),
  email: yup.string()

    .email('Invalid email address')

    .required('Please Enter your  Email '),

      qu1: yup.string()
  
      .required('this field is required'),
      qu2: yup.string()
  
      .required('this field is required'),
      qu3: yup.string()
  
      .required('this field is required'),

}),

onSubmit:values =>{

 const userData = new FormData();
 userData.append("firstname", values.firstname);
 userData.append("lastname", values.lastname);
 userData.append("email", values.email);
 userData.append("phone", values.phone);
 userData.append("level", values.level);
 userData.append("status", values.status);
 userData.append("imagePath",fileName);

 userData.append("qu1", values.qu1);
 userData.append("qu2", values.qu2);
 userData.append("qu3", values.qu3);

axios({
  url :"http://localhost:3002/api/upload",
  method: "POST",
  headers: { 'Content-Type': 'multipart/form-data' },

  data:userData

}).then(res=>{console.log(res.data) ;
  setMessage('You have successfuly registered ') ;
  setError("")
  console.log(message)
}).catch(err=>{console.log(err.response.data)
setError(err.response.data)})
setSubmitted(true) ;
//setInputValue(initialTutorialState)

}});
const render =()=>{
  if(submitted){
    console.log("hhhh")
    if(error !==''){
      return <Alert  color="danger">{error}</Alert>
    } 
   { setTimeout(()=>{
  },3000) ;
    return <Alert color ="success">{message}</Alert> }
  
  }
 
} 
  return (
   
  
   
<div>
<Particles
      id="tsparticles"
      init={particlesInit}

      options={{
        "fullScreen": {
            "enable": true,
            "zIndex": -9
        },
        "particles": {
            "number": {
                "value": 30,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "star",
                "options": {
                    "sides": 10
                }
            },
            "opacity": {
                "value": 0.8,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 30,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "rotate": {
                "value": 0,
                "random": true,
                "direction": "clockwise",
                "animation": {
                    "enable": true,
                    "speed": 5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 600,
                "color": "#ffffff",
                "opacity": 0.2,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": ["repulse"]
                },
                "onclick": {
                    "enable": false,
                    "mode": "bubble"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "background": {
            "color": "#111",
            "image": "",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
        }
    }}/>



  <Row>
      <Col>
      <h1 style={{color:"white"}}><i className="bi bi-bell me-2"> </i>Inscription</h1>

       
      
            <Form  id="formm"
          action="/"
          method="POST"
          onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label style={{color:"white"}} for="example Firstname">Firstname</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  placeholder="with a placeholder"
                  type="string"
                 
                  {...formik.getFieldProps("firstname")} 
                  style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
               
                />
              </FormGroup>
              {formik.touched.firstname && formik.errors.firstname ?  <Alert color="danger" style={{color:'red'}}>{formik.errors.firstname}</Alert> : null}

              <FormGroup>
                <Label style={{color:"white"}} for="example Lastname">Lastname</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Lastname placeholder"
                  type="string"
                 
                  {...formik.getFieldProps("lastname")} 
                  style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
                />
              </FormGroup>
             
              {formik.touched.lastname && formik.errors.lastname ?  <Alert color="danger" style={{color:'red'}}>{formik.errors.lastname}</Alert>: null}

              <FormGroup>
                <Label style={{color:"white"}} for="example email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email placeholder"
                  type="email"
                 
                  {...formik.getFieldProps("email")} 
                  style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
                />
              </FormGroup>
             
              {formik.touched.email && formik.errors.email ?  <Alert color="danger" style={{color:'red'}}>{formik.errors.email} </Alert> : null}

              <FormGroup>
                <Label style={{color:"white"}} for="example Phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone placeholder"
                  type="string"
                 
                  {...formik.getFieldProps("phone")} 
                  style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
                />
              </FormGroup>
              
              {formik.touched.phone && formik.errors.phone ?<Alert color="danger"  style={{color:'red'}}>{formik.errors.phone} </Alert>: null}

            
              <FormGroup>
                <Label style={{color:"white"}} for="example Select">Class level</Label>
                <Input id="level" name="level" type="select" {...formik.getFieldProps("level")}   style={{background:"transparent",color:"blue",borderColor:"white",borderRadius:20}}  >
                <option value="" disabled hidden>Choose here</option>
                <option>II1A</option>
                  <option>II1B</option>
                  <option>II1C</option>
                  <option>II1D</option>
                  <option>II1E</option>
                  <option>II1F</option>
                  <option>II2</option>
                  
                  
                </Input>
              </FormGroup>
            
              {formik.touched.level && formik.errors.level ?   <Alert color="danger" style={{color:'red'}}>{formik.errors.level} </Alert>: null}
             <FormGroup>

              <Input
                id="imagePath"
                name="imagePath"
                type="file"
                filename="imagePath"
                onChange={onChangeFile}
                style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
              />  
                            </FormGroup> 

              <FormGroup>
                <Label style={{color:"white"}} for="example Text1">Have you been in a Club ?</Label>
                <Input id="qu1" name="qu1" type="textarea"           {...formik.getFieldProps("qu1")} 
           style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
          />
              </FormGroup>
             
              {formik.touched.qu1 && formik.errors.qu1 ?  <Alert color="danger" style={{color:'red'}}>{formik.errors.qu1}</Alert> : null}

              <FormGroup>
                <Label style={{color:"white"}} for="example Text2">You are interested in :</Label>
                <Input id="qu2" name="qu2" type="select"           {...formik.getFieldProps("qu2")}  style={{background:"transparent",color:"blue",borderColor:"white",borderRadius:20}}  >
                <option>Design</option>
                  <option>Développement Commercial</option>
                  <option>Média</option>
                  <option>Project</option>
                  <option>Event</option>
                  </Input>
              </FormGroup>
           
              {formik.touched.qu2 && formik.errors.qu2 ?    <Alert color="danger" style={{color:'red'}}>{formik.errors.qu2}</Alert>: null}
              <FormGroup>
                <Label style={{color:"white"}} for="example Text3">Any remarks :</Label>
                <Input id="qu3" name="qu3" type="textarea"           {...formik.getFieldProps("qu3")}  style={{background:"transparent",color:"white",borderColor:"white",borderRadius:20}}
             />

              </FormGroup>
              
              {formik.touched.qu3 && formik.errors.qu3 ?<Alert color="danger" style={{color:'red'}}>{formik.errors.qu3} </Alert>: null}
            
               
              <Button type="submit">Submit</Button>
            </Form>


            
          
      </Col>
    </Row> 
    {render()}
    </div>
 
  
  
  

  );};
export default Forms;
