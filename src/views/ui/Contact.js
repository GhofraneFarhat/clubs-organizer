 import Particles from "react-tsparticles";
  import { loadFull } from "tsparticles";
  import Swal from 'sweetalert2';

  import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Card,
    CardHeader,
    CardBody,
    Input,
    Table,
    ModalBody,
    ModalHeader,
    Modal,
 
  Label,
 
    
    


  } from "reactstrap";
  import authService from "../../shared/auth.service";
  import { useDataContext } from '../../hooks/useDataContext';
  import { useAuthContext } from '../../shared/useAuthContext'; 
import { useState,useEffect } from "react";
import index from "react-typical";
const particlesInit = async (main) => {console.log(main);await loadFull(main);};

  const Forms = () => {
    const[message,setMessage] =useState('');
    const[Email,setemail] =useState('');
    const [submitted,setSubmitted]=useState(false);
    const {Data ,dispatch } = useDataContext()
    const { user } = useAuthContext()
    const initialTutorialState = {
     name: "",
      
      email: "",
      grade: "",
      phone:"",
      email8:"",
      name2:"",
      message:"",
      subject :""
    };
    const[result,setResult]=useState([])
    const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const[ Json,setjson]=useState('')

    const [currentUser, setCurrentUser] = useState(initialTutorialState);
    //const[data,setdata] =useState([]);
      const [state,setState]=useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3002/api/contacts', {
            //  headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
      
            if (response.ok) {
              dispatch({type: 'SET_Data', payload: json})
              console.log(json)
              //setdata(json)
              setjson(json)
            }
          }
      
       
            fetchData();
            //console.log(data)
          
        }, [dispatch,state])
  const update =async (e)=>{
    e.preventDefault();

    const member ={name:currentUser.name,email:currentUser.email,phone:currentUser.phone,grade:currentUser.grade,email8:currentUser.email8,name2:currentUser.name2}
    authService.save(member).then(res=>{ 
      if (res){
        Swal.fire({ 
      
            text:   "the member was added successfully",
            confirmButtonText: 'Cancel',
            icon : "success" ,
            confirmButtonColor:"#979292 "
        })       
 
    setMessage("The tutorial was updated successfully!");
    setSubmitted(true);
    console.log(res.data);
    setState(!state)

    
  }
})
  
  
  
  }
/*   const getcontatcs =async ()=>{

    authService.contactsProfile().then(res=>{ 
      if (res){
        console.log(res.data)
  setdata(...data,res.data);

    
  }
})
   console.log(currentUser) ;
   
  
  
  } */

  const send = (e)=>{
    e.preventDefault();
    const elements ={message:currentUser.message,subject:currentUser.subject,name2:currentUser.name2,email8:currentUser.email8}
    authService.send(Email,elements).then(res=>{ if (res){
        Swal.fire({
      
     text:   "the message was sent successfully",
     confirmButtonText: 'Cancel',
     icon : "success" ,
     confirmButtonColor:"#979292 "
 
   })}})

  }
  const emaill=(e,email)=>{
    e.preventDefault();
    setemail(email);
    console.log(email)
    toggle2() ;
  }
  const handleInputChange = event => { const { name, value } = event.target; setCurrentUser({ ...currentUser, [name]: value });};
  
  const toggle = () =>setModal(!modal);
 const toggle2 = () =>setModal2(!modal2);
  

  
 return (
  
  <div style={{marginTop:80, marginLeft:300}}>
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
               "value": "#E2AC0D"
           },
           "shape": {
               "type": "square",
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
               "value": 6,
               "random": false,
               "anim": {
                   "enable": false,
                   "speed": 20,
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
   }}
   />
  
    
      <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow" style ={{marginTop:-30}}>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0" style={{marginLeft:230}}>Contact us</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <div style={{display: "flex"}}>
                    {user && user.role=='Admin' && <>   <Button 
                      color="primary"
      
                      onClick={(e) => toggle()}
                      size="sm"
                      style={{ marginLeft: "auto",backgroundColor:'#99004d' }}
                      
                    >
                     Add Bureau members
                    </Button></>}
                    </div>
                  </Col>
                  
                </Row>
              </CardHeader>
              <Modal isOpen={modal} toggle={toggle} {...result} className="Modal1"  size="lg" style={{maxWidth: '1000px', width: '100%'}}>
                <ModalHeader toggle={toggle}>Add Bureau members</ModalHeader>
                  <ModalBody>
                  <form
                    id="form"
                  
                    action="/"
                    method="POST"
                    onSubmit={e=>update(e)}
                    
                  >
                  <Table borderless>
                  <thead>
                    <tr>
                      <th className ="th">Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                  
                    </tr>
                  </thead>
            
            
                  <tbody>
            
        
                    <tr>
                      <td>

                <div className='inline'>
                  <Input 
                    placeholder="First Name"
                    type="string"
                    name="name" id="name"
                    className="input-field"
                    onChange={(e) => handleInputChange(e)}
                    value={currentUser.name}
                  />     
              
                </div>
              </td>
            <td>
 
            <Input  
              placeholder="email"
              type="string"
              name="email"
              id="id"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.email}
            />
       

      
          </td>
        
    <td>
 
            <Input 
              placeholder="phone"
              type="phone"
              name="phone"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.phone}
              required
            />
 
            </td>
            <td>
 
          <Input 
            placeholder="role"
            type="select"
            name="grade"
            id="grade"
            className="input-field"
            onChange={(e) => handleInputChange(e)}
            value={currentUser.grade}
            required
          > 
          <option value=""  disabled hidden>Choose here</option>
          <option>president</option>
          <option>Vice-president</option>
          <option>General Secretary</option>
          <option>Human resources manager</option>
          <option>Sponsoring manager</option>
          <option>Communication manager</option>
          <option>Treasurer</option>

          </Input>

        </td>

       
          </tr>
    
      
                  </tbody>
                  </Table>  
                  <Button type="submit" id="submit-button" onClick={toggle}>
                    submit
                  </Button>  
               
                </form>
              </ModalBody>
    
            </Modal>
              <CardBody>
                <Form>
                   


<h6 className="heading-small text-muted mb-4">
                    Bureau information
                  </h6> {/* {data &&Json.map ((tdata,index)=>{ */} 
                  <div className="pl-lg-4"> 
                  <Table className="no-wrap mt-1 align-middle" responsive borderless size="lg" style={{maxWidth: '2000px', width: '100%'}}>
            <thead>
            
            </thead>
            <tbody borderless>


                <tr  className="border-top">
                  <td>
                
                  <Label
                            className="form-control-label"
                            htmlFor="input-username"
                            style={{color:"white", marginLeft:40}}
                          >
                            President : 
                          </Label>
                  </td>
                 
                  </tr> 
             {Json &&Json.filter(tdata => {
if (tdata.grade==='president')
return tdata }).map((tdata,index)=>(
            
                  <tr key={index}> 
                  <td>
                    <Input
                    defaultValue={tdata.email}
                    type="button"
                    style={{width:500, height:60, marginLeft:40}}
                    onClick={(e)=>emaill(e,tdata.email)}
                    />
                    
                    
                  
                    </td>
               
                  </tr>))}
                  
                  
               
                  <tr  className="border-top">
                  <Label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            style={{color:"white", marginLeft:40}}
                          >
                            Vice Président :
                          </Label>
                 
                  </tr> 
             {Json &&Json.filter(tdata => {
if (tdata.grade==='Vice-president')
return tdata }).map((tdata,index)=>(
             
                  <tr key={index+1}>
                  <td>
                    <Input
                    defaultValue={tdata.email}
                    type="button"
                    style={{width:500, height:60, marginLeft:40}}
                    onClick={(e)=>emaill(e,tdata.email)}
                    />
                    
                    
                  
                    </td>
               
                  </tr>))}
                  
                  <tr  className="border-top">
                  <Label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            style={{color:"white", marginLeft:40}}
                          >
                            Rh & Sg :
                          </Label>
                 
                  </tr> 
             {Json &&Json.filter(tdata => {
if (tdata.grade==='Human resources manager')
return tdata }).map((tdata,index)=>(
             
                  <tr key={index+2}>
                  <td>
                    <Input
                    defaultValue={tdata? tdata.email:""}
                    type="button"
                    style={{width:500, height:60, marginLeft:40}}
                    onClick={(e)=>emaill(e,tdata.email)}
                    />
                    
                    
                  
                    </td>
               
                  </tr>))}
                  
                  <tr  className="border-top">
                  <Label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            style={{color:"white", marginLeft:40}}
                          >
                           Sponsoring manager :
                          </Label>
                 
                  </tr> 
             {Json &&Json.filter(tdata => {
if (tdata.grade==='Sponsoring manager')
return tdata }).map((tdata,index)=>(
             
                  <tr key={index+2}>
                  <td>
                    <Input
                    defaultValue={tdata.email}
                    type="button"
                    style={{width:500, height:60, marginLeft:40}}
                    onClick={(e)=>emaill(e,tdata.email)}
                    />
                    
                    
                  
                    </td>
               
                  </tr>))}
                  
                  <tr  className="border-top">
                  <Label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            style={{color:"white", marginLeft:40}}
                          >
                            Treasurer :
                          </Label> 
                 
                  </tr> 
             {Json&&Json.filter(tdata => {
if (tdata.grade==='Treasurer')
return tdata }).map((tdata,index)=>(
             
                  <tr key={index}>
                  <td>
                    <Input
                    defaultValue={tdata.email}
                    type="button"
                    style={{width:500, height:60, marginLeft:40}}
                    onClick={(e)=>emaill(e,tdata.email)}
                    />
                    
                    
                  
                    </td>
               
                  </tr>))}
                  </tbody>
</Table>
                  </div>
                                  {/*   })}  */}
                  
                 
                  


 
                  
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Modal isOpen={modal2} toggle={toggle2} {...result} className="Modal1"  size="lg" style={{maxWidth: '1000px', width: '100%'}}>
                <ModalHeader toggle={toggle2}>Contact us :</ModalHeader>
                  <ModalBody>
                  <form
                    id="form2"
                  
                    action="/"
                    method="POST"
                    onSubmit={e=>send(e)}
                    
                  >
                  <Table borderless="true">
                  <Label>
                         Subject
                  </Label>
                  <br></br>
                  <Input
                  placeholder="Subject here"
                  id="subject"
                  name="subject"
                  value={currentUser.subject}
                  onChange={(e)=>handleInputChange(e)} />
                  <Label>
                    Message
                  </Label>
                  <Input  
                  type="textarea"
                  id="message"
                  name="message"
                  value={currentUser.message}
                  onChange={(e)=>handleInputChange(e)} 
                  />
                  <Label>
                    From :
                  </Label>
                  <Row>
                    <Col><Input  
                 
                  id="name2"
                  name="name2"
                  placeholder="your name"
                  value={currentUser.name2}
                  onChange={(e)=>handleInputChange(e)} 
                  
                  />
                    </Col>
                    <Col><Input  
                 
                  id="email8"
                  name="email8"
                  placeholder="your email"
                  value={currentUser.email8}
                  onChange={(e)=>handleInputChange(e)} 
                  
                  />
                    </Col>
                  </Row>
                   
                  </Table>
                  <br></br>
                  <button className ="send"type="submit" id="submit-button" onClick={toggle2}>
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
      </svg>
    </div>
  </div>
  <span>Send</span>
                  </button>  
                 
                </form>
              </ModalBody>
    
            </Modal>
        
        
      </div>
    );
  };
  
  export default Forms;