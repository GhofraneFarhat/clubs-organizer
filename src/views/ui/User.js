import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Card,
    CardHeader,
    CardBody,
    Alert,
    Label,
    Input,
    Container,

  } from "reactstrap";
  import "../ui/ui.scss";
  import Particles from "react-tsparticles";
  import { loadFull } from "tsparticles";

  import { useAuthContext } from '../../shared/useAuthContext'; 

  import authService from "../../shared/auth.service";
  import membersService from "../../shared/member.service" ;
  import { useState ,useEffect } from "react";
  import { useDataContext } from '../../hooks/useDataContext';
  const particlesInit = async (main) => {console.log(main);await loadFull(main);};

  const Forms = () => {
   
    const initialTutorialState = {
      firstname: "",
      username:"",
      lastname: "",
      email: "",
      phone :"",
      country:"",
      city:"",
      uni:"",
      bio:"",

  
    };
    const [state,setState]=useState(false)
    const[message,setMessage] =useState('');
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const [data, setData] = useState("");
    const[ Json,setjson]=useState('')
    const [submitted,setSubmitted]=useState(false);
    const [error,setError]=useState('');
    const [inputValues,setInputValue]=useState(initialTutorialState );
    const { Data ,dispatch } = useDataContext()
    const { user } = useAuthContext()

    function handleInputChange(event) {
      const { name, value } = event.target;
      setInputValue({ ...inputValues, [name]: value });
    }
  
    useEffect(() => {
      const fetchData = async () => {
        console.log("helo") ;
        if(user.email)
        console.log(user.email)
      {  setEmail(user.email)
        const response = await fetch(`http://localhost:3002/api/userbyemail/${user.email}`, {
    
        })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_Data', payload: json})
          console.log(json)
          setjson(json)
        }
      }
  
   
       
       
     } 
      fetchData()

    }, [dispatch,state]) 

    const render =()=>{
      if(submitted){
        if(error !==''){
          return <Alert  color="danger">{error}</Alert>
        } 
       {  setTimeout(()=>{
        setInputValue(initialTutorialState);
        setMessage("") ;
        setSubmitted(false);
      },2000)
        return <Alert>{message}</Alert> }
      
      }
     
    } 
  
    const handleSubmit = async(e) => {
      e.preventDefault();
       const member ={firstname:inputValues.firstname,lastname:inputValues.lastname,username:inputValues.username,email:inputValues.email,phone:inputValues.phone,country:inputValues.country,city:inputValues.city,uni:inputValues.uni,bio:inputValues.bio}
          console.log(member)
          console.log(user.email)
          authService.updateEmail(user.email,member).then(res=>{ 
            if (res){
              console.log("done")
       
          setMessage("The tutorial was updated successfully!");
          setSubmitted(true);
          setState(!state)
        }
      else 
    {
      setError("an error occured")
    }
   })
  
  
     
      
    
      //render()
      //console.log(error)
    };
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
     
                   
        <div  style={{marginTop:10, }}>
        <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              
              <div className="card-profile-image"  style={{display:"flex"}}>
                    
                      <img
                        style={{ marginLeft: 120,marginTop:30}}
                        alt="..."
                        width={140}
                        className="rounded-circle"
                        src={
                          require("../../assets/images/users/user1.jpg")
                            .default
                        }
                      />
                    
              </div>
              
              <CardBody className="pt-0 pt-md-4">
               

                <div className="text-center" >
                  <h3>
                  {Json && Json.firstname}
                    <span className="font-weight-light"> {Json && Json.lastname}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {Json && Json.city} {Json && Json.country}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {Json && Json.uni}                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {Json && Json.phone}                  </div>
                  <hr className="my-4" />
                  <p>
                  {Json && Json.bio}                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Profile</h3>
                  </Col>
                
                </Row>
              </CardHeader>
              <CardBody>
                <Form id="formm"
          action="/"
          method="POST"
          onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                            style={{color:"white"}}
                          >
                            Username
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="username"
                            name="username"
                            placeholder="Username"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
              value={inputValues.username}
        
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-email"
                            style={{color:"white"}}
                          >
                            Email address
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={(e) => handleInputChange(e)}
              value={inputValues.email}
        
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            style={{color:"white"}}
                          >
                            First name
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="firstname"
                            name="firstname"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
              value={inputValues.firstname}
        
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-last-name"
                            style={{color:"white"}}
                          >
                            Last name
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="lastname"
                            name="lastname"
                            placeholder="Last name"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
              value={inputValues.lastname}
        
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-uni"
                            style={{color:"white"}}
                          >
                            University
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="uni"
                            name="uni"
                            placeholder="Home Address"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
              value={inputValues.uni}
        
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-city"
                            style={{color:"white"}}
                          >
                            City
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="city"
                            name="city"
                            placeholder="City"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            value={inputValues.city}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-country"
                            style={{color:"white"}}
                          >
                            Country
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="country"
                            name="country"
                            placeholder="Country"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            value={inputValues.country}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-country"
                            style={{color:"white"}}
                          >
                            Phone
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="phone"
                            name="phone"
                            placeholder="Your phone"
                            type="Text"
                            onChange={(e) => handleInputChange(e)}
                            value={inputValues.phone}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Label>About Me</Label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        type="textarea"
                        id="bio"
                        name="bio"
                        onChange={(e) => handleInputChange(e)}
                        value={inputValues.bio}
                      />
                    </FormGroup>
                  </div>
                  <Button className="butn"> Submit
    
</Button>                </Form>
              </CardBody>
              { 
            render()}
       
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
      </div>
        
        
    );
  };
  
  export default Forms;
 