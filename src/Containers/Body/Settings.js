import React,{Component} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import * as colors from '../../Colors'




class Settings extends Component{

    state={
        fname: '',
        lname: '',
        oldPass: '',
        newPass: '',
        repeatPass: '',
        error: null,
        loaded: false, 
        submitted: false
    }

    

    componentDidMount(){
        if(this.props.token&&!this.state.loaded){
            this.setState({fname: this.props.user.fname, lname: this.props.user.lname, loaded:true})
            
        }
    }

    updateBasicInfo=(e)=>{
        e.preventDefault();
        if(this.props.token){
        axios.put(`http://localhost:5000/api/v1/user/${this.props.user._id}`, {"fname": this.state.fname,"lname": this.state.lname}, {headers: {'Authorization': `Bearer ${this.props.token}`}})
                .then((result)=>{
                    this.setState({submited: true})
                })
                .catch(
                    (err)=>this.setState({error: err})
                )
        }
    }

    updatePassword = (e) =>{
        e.preventDefault();
        if(this.props.token){
            if(this.state.newPass===this.state.repeatPass){
                console.log("mpika")
                let data ={
                    "email": this.props.user.email, 
                    "oldPassword": this.state.oldPass, 
                    "newPassword": this.state.newPass
                }
                axios.put(`http://localhost:5000/api/v1/user/changepass`, data , {headers: {'Authorization': `Bearer ${this.props.token}`}})
                    .then((res)=>this.setState({submited: true}))
                    .catch((err)=> this.setState({error: err}))
            }
        }
    }

    render(){
        let errorAlert = null;
        if(this.state.error){
            errorAlert=(
                <Alert variant="danger" style={{width: "1000px"}}>
                    {this.state.error.response.data}
                </Alert>)
        }
        let redirect = (this.state.submited&&!this.state.error)? (<Redirect to="/products/all/1"/>): null

        
        return(
            <div style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
                {redirect}
                <Card style={{ margin: "auto", marginTop: 100, width: "1000px", height: "650px"}}>
                    <Card.Header>Settings</Card.Header>
                    <Card.Body style={{display: "flex",flexDirection:"column", justifyContent: "space-between"}}>
                        <h3>Change Basic Info</h3>
                        
                        <Form>
                            Change First Name
                            <Form.Control type="text" placeholder="Enter First Name" value={this.state.fname} onChange={(e)=>this.setState({fname: e.target.value})}/>

                            Change Last Name
                            <Form.Control type="text" placeholder="Enter Last Name" value={this.state.lname} onChange={(e)=>this.setState({lname: e.target.value})}/>

                            <Button style={{backgroundColor: colors.color2, border: "none", margin: 15}} onClick={this.updateBasicInfo}>Update!</Button>
                            <div style={{border: "2px solid grey", marginBottom: 15}}/>


                        </Form>
                        <h3>Change Password</h3>
                        <Form>
                            Old Password
                            <Form.Control type="password" placeholder="Old Password" onChange={(e)=>this.setState({oldPass: e.target.value})}/>

                            New Password
                            <Form.Control type="password" placeholder="New Password" onChange={(e)=>this.setState({newPass: e.target.value})}/>
                            Repeat Password
                            <Form.Control type="password" placeholder="Repeat Password" onChange={(e)=>this.setState({repeatPass: e.target.value})}/>


                            <Button style={{backgroundColor: colors.color2, border: "none", margin: 15}} onClick={this.updatePassword}>Change Password</Button>
                            


                        </Form>
                    </Card.Body>
                </Card>
                {errorAlert}
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        token: state.token,
        user: state.user
    }
}

export default connect(mapStateToProps)(Settings);