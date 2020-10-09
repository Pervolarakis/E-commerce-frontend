import React, {Component} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import * as actions from '../../Redux/actions/index'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as colors from '../../Colors'

class Login extends Component{

    state={
        email: '',
        password: ''
    }

    onEmailChange = (e) =>{
        this.setState({email: e.target.value})
    }

    onPasswordChange = (e) =>{
        this.setState({password: e.target.value})
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onLoginSubmit(this.state.email,this.state.password);
    }

    render(){
        
        let redirect = (this.props.token) ? (<Redirect to="/products/all/new/1"/>): null

        let errorAlert = null;
        if(this.props.error){
            errorAlert=(
                <Alert variant="danger" style={{width: "700px"}}>
                    {this.props.error.response.data}
                </Alert>)
        }
        return(
            
            <div style={{width:"100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                {redirect}
                <Card style={{width: "700px",height: "300px", marginTop: 150}}>
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form style={{display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between"}}>
                            Email
                            <Form.Control isInvalid={this.props.error} type="email" value={this.state.email} onChange={this.onEmailChange} placeholder="Enter email" />
                            Password
                            <Form.Control isInvalid={this.props.error} type="password" value={this.state.password} onChange={this.onPasswordChange} placeholder="Password" />
                            <Button  variant="primary" type="submit" style={{backgroundColor: colors.color2, border: "none"}} onClick={this.onSubmitHandler}>
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
        onLoginSubmit: (email,password) => dispatch(actions.loginInit(email,password))
    }

}

const mapStateToProps = state => {
    return{
        error: state.error,
        loading: state.loading,
        token: state.token
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);