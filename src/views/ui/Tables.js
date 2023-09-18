import './ui.scss'
import { Row, Col, Table, Card, CardTitle, CardBody, Badge,Form,FormGroup,InputGroup,InputGroupText } from "reactstrap";
import { AiOutlineSearch } from 'react-icons/ai';

import { useState ,useEffect } from "react";
import { Input } from "reactstrap";
import UsersService from "../../shared/auth.service";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Swal from 'sweetalert2';
import { useAuthContext } from '../../shared/useAuthContext'; 
import { useDataContext } from '../../hooks/useDataContext';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const particlesInit = async (main) => {console.log(main);await loadFull(main);};

const Tables = () => {
  const [searchtext,setsearchtext]=useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const { user } = useAuthContext()
  const { Data ,dispatch } = useDataContext()
  const[ Json,setjson]=useState('')


  const initialTutorialState = {
    id: null,
    firstname: "",
    lastname: "",
    email: "",
   role: "",
   phone:"",
   imagePath:"",
   
  };
  const [currentUser, setCurrentUser] = useState(initialTutorialState);

  const [state,setState]=useState(false)
  const[message,setMessage] =useState('');

  const toggle = () => setModal(!modal);
  const[result,setResult]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      console.log(user) ;
      const response = await fetch('http://localhost:3002/api/usersProfile', {
  
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_Data', payload: json})
        console.log(json)
        setjson(json)

      }
    }

 
      fetchData()
    
  }, [dispatch,state])





const editt=(data,e)=>{
  e.preventDefault();
  toggle() ;
  setId(data._id);
  setCurrentUser(data)

  console.log(data._id)
}


const update=(e)=>{
  e.preventDefault();
  UsersService.update(id,currentUser).then(res=>{ if (res){
         Swal.fire({
       
      text:   "the member was updated successfully",
      confirmButtonText: 'Cancel',
      icon : "success" ,
      confirmButtonColor:"#979292 "
  
    }) 
    setMessage("The tutorial was updated successfully!");
    setState(!state)

  }}
   
  )
  .catch(e => {
    console.log(e);
  
  })

}

const handleInputChange = event => {
  const { name, value } = event.target;
  setCurrentUser({ ...currentUser, [name]: value });
};


const Delete=(id,e)=>{
  console.log(id)
 Swal.fire({
           text:   "Are you sure you want to delete this User ?",
           icon: 'warning' ,
           showCancelButton: true,  
   confirmButtonText: `Yes`,  
   confirmButtonColor: "#ff6873", 
       
         }).then((result) => {
           if (result.isConfirmed) {
 
 deletee(id,e) ;   
 Swal.fire({text:   "User was deleted successfully",
 icon: 'success' ,
 confirmButtonText: `OK`, 
 confirmButtonColor: "#ff6873",
 })         
           } else
           Swal.fire({text:   "Cancelled",
           icon: 'error' ,
           confirmButtonText: `OK`, 
           confirmButtonColor: "#ff6873",
     })
 
       })
 
 
 }
const deletee =async(tdata,e)=>{
 e.preventDefault();
 const response = await fetch('http://localhost:3002/api/user/' + tdata._id, {
  method: 'DELETE',
 /*  headers: {
    'Authorization': `Bearer ${user.token}`
  } */
})
const json = await response.json()
console.log(response)
if (response.ok) {
  dispatch({type: 'DELETE_Data', payload: tdata})
  setState(!state)
}
  console.log(json)
  console.log(id) 
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
               "value":"#1f6910"
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
         

    <Row>
    
      <Col >
      <Form className="navbar-search navbar-search-dark ">
            <FormGroup className="mb-0">
              <div style={{borderRadius:30  ,marginTop:'10px',marginBottom:'10px',width:'300px',float:"right"}}>
              <InputGroup className="input-group-alternative">
                <InputGroupText style={{backgroundColor:"transparent", borderColor:"#7a7878" }}>
                 
                  <AiOutlineSearch style={{color:"#555555"}} />
                </InputGroupText>
                <Input  placeholder="Search" type="text" style={{backgroundColor:"transparent", borderColor:" #7a7878"}}  onChange={(event)=>{setsearchtext(event.target.value)}} />
              </InputGroup>
              </div>
            </FormGroup>
        </Form>
       
        <Card style ={{width:1400}} >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Members
          </CardTitle>
          <CardBody style ={{width:1400}}>
            <Table className="no-wrap mt-1 align-middle" responsive borderless >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  {user.role==='Admin' && <th>Actions</th>}  
                
                </tr>
              </thead>
            
              <>
              <tbody>
           {Json && Json.filter((val)=>{
            if(searchtext==="")
            return val ;
            else if (val.email.toLowerCase().includes(searchtext.toLowerCase())||val.firstname.toLowerCase().includes(searchtext.toLowerCase()) || val.lastname.toLowerCase().includes(searchtext.toLowerCase())){
              return val
            }
           }).map((tdata, index) => ( 
                <tr key={index}>
               <td>{index+1}</td> 
                <td>{tdata && tdata.firstname} {tdata && tdata.lastname}</td>
                <td>{tdata && tdata.email}</td>
                <td>{tdata && tdata.phone}</td>
             <td>{tdata && tdata.role==="Admin"? <Badge color="danger" >{tdata && tdata.role}</Badge>:
                 tdata.role==="Bureau"? <Badge color="warning">{tdata && tdata.role}</Badge>:
                 <Badge color="info">{tdata && tdata.role}</Badge>}</td>
                <td>
                {user.role==='Admin' && <><Button className ="edit" id="b5" style={{marginTop:-2}}  >
         <i className="bi bi-pencil-fill" style ={{fontSize: 25+"px",color:"yellow"}} onClick={(e)=>editt(tdata,e)}></i>
         
       
      </Button> 
    
      <Button id ="b4" onClick={(e)=>Delete(tdata,e)}    > 
            <span className="trash">
             <span></span>
              <i></i>
  
            </span>
          </Button> </> }
            
             
            
                </td>
             
                
             </tr> ))}
            </tbody> 
           
  </>
          
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
    <Modal isOpen={modal} toggle={toggle} {...result} className="Modal1"  size="lg" style={{maxWidth: '1000px', width: '100%'}}>
    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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
                <Row>
                  <Col>

                  <Input 
              placeholder="First Name"
              type="string"
              name="firstname" id="firstname"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.firstname}
            />   </Col>  
      <Col > <Input
              placeholder="Last Name"
              type="string"
              name="lastname" id="lastname"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.lastname}
            />

                  </Col> 

                </Row>
            
          </div>
            </td>
            <td>
 
            <Input  
              placeholder="email"
              type="string"
              name="email"
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
   name="role"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.role}
   required
 > <option value=""  disabled hidden>Choose here</option>
   <option>Admin</option>
   <option>Bureau</option>
                  <option>Member</option>
                  <option>Administrator</option>
                  
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
    
  </div>
  );
};

export default Tables;
