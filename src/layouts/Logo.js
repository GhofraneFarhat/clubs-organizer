//import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.png";
import logo from "../assets/images/logos/xtremelogo.png" ;
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
<p style ={{alignItems:"center"}}><img src={logo}  style={{ 
  marginLeft:30,
 maxwidth: 190,
 height:  190,}}></img></p>
    </Link>
  );
};

export default Logo;
