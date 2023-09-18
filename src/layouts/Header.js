import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import UsersService from '../shared/auth.service';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../shared/useAuthContext";
import { AiFillSetting,AiOutlineUser,AiOutlineUserAdd,AiOutlineLogout,AiOutlineSearch ,AiFillCamera,AiFillDollarCircle,AiFillBulb} from 'react-icons/ai';

import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";


const Header = (props) => {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const {user }=useAuthContext();
  const { logout } = useLogout()
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const Navigate =()=>{
    navigate('/user')

  }
  const Navigate1 =()=>{
    navigate('/signup')

  }
  

  const handleClick = () => {
    logout() ;
    setTimeout(()=>{
      navigate('/login')
    },500)
    
  }

  return (
    <Navbar  dark expand="md" style={{backgroundColor:"#1C1D18"}}>
      <div className="d-flex align-items-center">
     
        <Button
         color="#fff"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list" style={{color:"#fff"}}></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
      <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
      </Link>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
        
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
            Pole
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem><AiFillCamera/> Media </DropdownItem>
              <DropdownItem><AiFillDollarCircle/> Dev Com</DropdownItem>
              <DropdownItem divider />
              <DropdownItem><AiFillBulb/>Project</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <Link to="/Contact" className="nav-link">
              Contact
            </Link>
          </NavItem>
        </Nav>
        <div style={{marginTop:13, marginRight:40 , }}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="#1C1D18">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="50"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={Navigate}> 
             <AiOutlineUser/> My Account</DropdownItem>
          
             {user && user.role=='Admin' && <><DropdownItem onClick={Navigate1}><AiOutlineUserAdd/> Add new user</DropdownItem></>    }  
            <DropdownItem divider />    
              <DropdownItem onClick={handleClick}><AiOutlineLogout/> Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
