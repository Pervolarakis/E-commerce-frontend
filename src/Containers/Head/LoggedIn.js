import React,{Component} from 'react';
import {Image, NavDropdown, Nav} from 'react-bootstrap';
import {connect} from 'react-redux'
import * as action from '../../Redux/actions/index'
import {HouseFill, Plus, EyeFill } from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom';



class Profile extends Component{
    state={ 
        img: "https://myselfietime.com/images/profilepic-210x216.jpg"
    };
    
    navStyle ={
        marginRight: 10, 
        color:"white", 
        height: "100%",
        

    }
    activeNavStyle={
        color:"#e91e63", 
        borderBottom: "3px solid #e91e63"
    }

    render(){
        return(
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>


                <Nav>
                    <Nav.Link as={NavLink} to="/" exact style={this.navStyle} activeStyle={this.activeNavStyle}>
                        <HouseFill size={15} style={{marginRight: 3}}/>
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/newad" exact style={this.navStyle} activeStyle={this.activeNavStyle}>
                        <Plus size={20} style={{marginRight: 3}}/>
                        Create Product
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/watch" exact style={this.navStyle} activeStyle={this.activeNavStyle}>
                        <EyeFill  size={20} style={{marginRight: 3}}/>
                        Watch List
                    </Nav.Link>
                </Nav>

                
                <p style={{fontSize: 20, margin: "auto", color: "#e91e63"}}>{this.props.user}</p>
                
                <NavDropdown title={<Image style={{width: 40, height: 40, marginRight: 20}} src={this.state.img} roundedCircle />} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4" onClick={this.props.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logout: ()=> dispatch(action.profileLogout())
    }
}

export default connect(null,mapDispatchToProps)(Profile);