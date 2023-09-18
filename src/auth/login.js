 import { useState ,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card ,CardBody, CardTitle  ,CardText,Label   } from "reactstrap";
import { Input,InputGroup,   InputGroupText } from "reactstrap";
import { Alert } from "reactstrap";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const {login, error} = useLogin()
  const [submitted,setSubmitted]=useState(false);
const [email , setemail]=useState('');
const [password , setpassword]=useState('');
const [isDeleting, setIsDeleting] = useState(false);
const [text, setText] = useState('');
const [delta, setDelta] = useState(300 - Math.random() * 100);

useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    //let i = loopNum % toRotate.length;
    let fullText = "Already Registered ? Log In Now";
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    
  }
  const render =()=>{
    if(submitted){
      
      if(error !==''){
        return <Alert  color="danger">{error}</Alert>
      } 
     
    
    }
   
  }
const handleSubmit = async(e)=>{
  e.preventDefault() ;
 
await login(email,password)
setSubmitted(true) ;
render();



}

    return (  <div className="login">  
     <div className="part1">
        <Card className=" border-0 shadow part1">
        <CardBody>
       
          <CardTitle className="text-center l2">{text}</CardTitle>
          <CardText>  
        
      
    <form onSubmit={handleSubmit}>

     
 
   <Label className="hey">Email</Label>
   <InputGroup>
   <InputGroupText className="l1">
   <i className="bi bi-envelope"></i>
                    </InputGroupText>
    <Input   className="form-control-alternative textt" type="email" required value ={email} onChange={(e)=>setemail(e.target.value)}/>
                  
                  </InputGroup>
    <Label className="hey">Password</Label>
    <InputGroup>
    <InputGroupText className="l1">
    <i className="bi bi-key"></i>
                        </InputGroupText>
    <Input   className="form-control-alternative textt" type="password" required value ={password} onChange={(e)=>setpassword(e.target.value)}/>
  
                  
                  </InputGroup>
    <button>submit</button>
</form>  
 </CardText >
</CardBody>
{render()}

</Card></div>




</div>
);
}

export default Login;  
