import React,{Component} from 'react';
import Profile from './LoggedIn'
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

class TopBar extends Component{
    
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={NavLink}  to='/products/all/1'>SELL IT</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
      
                </Nav>
                
                {(this.props.isAuth)?
                    <Profile user={this.props.user.username}/>:(
                    <Nav>
                        <Nav.Link as={NavLink}  to='/login' style={{color: "white", height: "100%"}} activeStyle={{color: "#e91e63"}}>Login</Nav.Link>
                        <Nav.Link as={NavLink} to='/register' style={{color: "white", height: "100%"}} activeStyle={{color: "#e91e63"}}>Register</Nav.Link>
                    </Nav>
                )}
                </Navbar.Collapse>
            </Navbar>
            
        )
    }
    
}

const mapStateToProps = (state) => {
    return{
        isAuth: state.token !== null,
        user: state.user
    }
}

export default connect(mapStateToProps)(TopBar);