import './auth.scss'
import React, { useEffect, useState } from "react";
import UsersService from "../shared/auth.service";
import { useNavigate } from "react-router-dom";
import { Card ,CardBody,CardTitle  ,CardText,Label   } from "reactstrap";
import { Input,InputGroup,   InputGroupText } from "reactstrap";
import { Alert } from "reactstrap";
import { useSignup } from '../hooks/useSignup';
import { Link } from "react-router-dom";


function Signup () {
  const {signup, error, isLoading,message} = useSignup()
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
   const [token,setToken]=useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [inputValues, setInputValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role :"",

  });

  const [validation, setValidation] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role :"",


  });
  //const[message,setMessage] =useState('');
  const [submitted,setSubmitted]=useState(false);
  const [errorr,setError]=useState('');
  const regExp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const history =useNavigate()
  //handle submit updates
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = validation;

    //first Name validation
    if (!inputValues.firstname) {
        errors.firstname  = "First name is required";
    } else {
        errors.firstname  = "";
    }
    //last Name validation
    if (!inputValues.lastname) {
      errors.lastname = "Last name is required";
    } else {
      errors.lastname = "";
    }

    // email validation

    if (!inputValues.email) {
      errors.email = "Email is required";}
      else if  (!regExp.test(inputValues.email)){
      errors.email = "pattern is required"}
      
    else {
      errors.email = "";
    }

    //password validation

    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
    
    } else {
      errors.password = "";
    }

    if (!inputValues.role) {
      errors.role = "role is required";}
    else {
      errors.role = "";
    }
    setValidation(errors);
  };


  const render =()=>{
    if(submitted){
      console.log('yes')
      if(error !==''){
        return <Alert  color="danger">{error}</Alert>
      } 
     { setTimeout(()=>{
      history('/login' )
     },3000) ;
      return <Alert color ="success">{message}</Alert> }
    
    }
   
  } 
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    //let i = loopNum % toRotate.length;
    let fullText = "Sign Up A New User :";
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    
  }






  const handleSubmit = async(e) => {
    e.preventDefault();
    checkValidation();
    await signup(inputValues.firstname,inputValues.lastname,inputValues.email ,inputValues.password ,inputValues.role) ;
    setSubmitted(true) ;
   if(error === "")
   { 
  console.log(message)}
   
    render()
   
  };

  return (
    <div className="signup">  
    
  
      <Card className=" border-0 shadow partt1">
        <CardBody>
        <CardTitle className="text-center l2">{text}</CardTitle>

        <form
         
          onSubmit={handleSubmit}
        >
              <Label>Firstname</Label>
<InputGroup>
         <InputGroupText className="l1">
         <i className="bi bi-person-circle"></i>
                    </InputGroupText >
            <Input 
              placeholder="First Name"
              type="string"
              name="firstname" id="firstname"
              className="input-field"
              onChange={(e) => handleChange(e)}
              value={inputValues.firstname}
            />
            
            </InputGroup>
            {validation.firstname && <p className="error">{validation.firstname}</p>}

            <Label>Lastname</Label>
    <InputGroup>
         <InputGroupText className="l1">
         <i className="bi bi-person-circle"></i>
                    </InputGroupText >
            <Input 
              placeholder="Last Name"
              type="string"
              name="lastname" id="lastname"
              className="input-field"
              onChange={(e) => handleChange(e)}
              value={inputValues.lastname}
            />
          
            </InputGroup>
            {validation.lastname && <p className="error">{validation.lastname}</p>}
            <Label>Email</Label>
   <InputGroup>
         <InputGroupText className="l1">
         <i className="bi bi-envelope"></i>
                    </InputGroupText >
            <Input  
              placeholder="email"
              type="email"
              name="email"
              className="input-field"
              onChange={(e) => handleChange(e)}
              value={inputValues.email}
            />
       
          {validation.email && <p className="error">{validation.email}</p>}

           </InputGroup>
       <Label>Role</Label>
  
           <select name="role" id="role"
              className="input-field"
              onChange={(e) => handleChange(e)}
              value={inputValues.role}   >
              <option className="option" value="" disabled selected>Role</option>
              <option className="option" value="Admin">Admin</option>
              <option className="option" value="User">Membre</option>
              <option className="option" value="Administration">Administration</option>
              </select>
            {validation.role && <p className="error">{validation.role}</p>}
    <Label>Password</Label>
    <InputGroup>
         <InputGroupText className="l1">
         <i className="bi bi-key"></i>
                    </InputGroupText >
            <Input 
              placeholder="password"
              type="password"
              name="password"
              className="input-field"
              onChange={(e) => handleChange(e)}
              value={inputValues.password}
              required
            />
            {validation.password && <p className="error">{validation.password}</p>}
 
            </InputGroup>
         
       

          <button type="submit" id="submit-button">
            submit
          </button>
         
        </form>
      
</CardBody>
{render()}


</Card>

</div>
    
  ); 
  
}

export default Signup;
