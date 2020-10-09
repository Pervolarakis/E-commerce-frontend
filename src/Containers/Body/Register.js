import React,{Component} from 'react';
import {Form, Col, Row, Button,Card, Alert} from 'react-bootstrap'
import * as actions from '../../Redux/actions/index'
import {connect} from 'react-redux'
import * as colors from '../../Colors'
import {Redirect} from 'react-router-dom';

class Register extends Component{

    state={
        username: '',
        fname: '',
        lname: '',
        email: '',
        password: '',
        repassword: '',
 

    }

    onRegisterButtonPress =  (e) => {
        e.preventDefault();
            if(this.state.password===this.state.repassword){
                this.props.registerInit(this.state.username, this.state.fname, this.state.lname, this.state.password, this.state.email);
            }
    }

    render(){
        let errorAlert = null;
        if(this.props.error){
            errorAlert=(
                <Alert variant="danger" style={{width: "700px"}}>
                    {this.props.error.response.data}
                </Alert>)
        }
        let redirect = (this.props.token) ? (<Redirect to="/products/all/new/1"/>): null
        return(
            
            <div style={{width:"100%", height:"100%", display: "flex", flexDirection: "column", marginTop: 100, alignItems: "center"}}>
                {redirect}
                <Card style={{width: "700px", height:"430px"}}>
                    <Card.Header>Register</Card.Header>
                    <Card.Body>
                        <Form style={{height: "100%",display: "flex", flexDirection: "column", alignItems: "stretch",justifyContent:"space-between"}}>
                            Username
                            <Form.Control type="text" placeholder="Username" onChange={(e)=>this.setState({username: e.target.value})}/>
                            <Row>
                                <Col>
                                    First Name
                                    <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>this.setState({fname: e.target.value})}/>
                                </Col>
                                <Col>
                                    Last Name
                                    <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>this.setState({lname: e.target.value})}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Password
                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>this.setState({password: e.target.value})}/>
                                </Col>
                                <Col>
                                    Repeat Password
                                    <Form.Control type="password" placeholder="Repeat Password" onChange={(e)=>this.setState({repassword: e.target.value})}/>
                                </Col>
                            </Row>
                                Email
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>this.setState({email: e.target.value})}/>
                            
                            <Button  variant="primary" type="submit" style={{backgroundColor: colors.color2, border: "none"}} onClick={this.onRegisterButtonPress}>
                            Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                {errorAlert}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch =>{
    return{
        registerInit: (username, fname, lname, password, email)=>dispatch(actions.registerInit(username, fname, lname, password, email))
    }
}

const mapStateToProps = state => {
    return{
        token: state.token,
        error: state.error,
        loading: state.loading
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);