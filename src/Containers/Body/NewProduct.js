import React,{Component} from 'react';
import {Form, Col, Row, Button,Image, Card, Alert} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import * as colors from '../../Colors'
import {Redirect} from 'react-router-dom'

class NewAd extends Component{

    state={
        title: '',
        description: '',
        condition: 'New',
        category: 'Pc',
        price: '',
        image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
        tempimg: '',
        submited: false,
        error: null
    }

    onFileUpload = (e) =>{
        let file = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(file[0])
        this.setState({tempimg: e.target.files[0]})
        reader.onload = (e) =>{
            this.setState({image: e.target.result})
        }
        console.log(this.state.image)

    }


    onSubmit = (e) => {
        e.preventDefault();
        // if(this.props.isAuth){
            
            const data = {
                "title": this.state.title,
                "description": this.state.description,
                "condition": this.state.condition,
                "category": this.state.category,
                "price": this.state.price

            }
            
            axios.post('http://localhost:5000/api/v1/products/', data, {headers: {'Authorization': `Bearer ${this.props.token}`}})
                .then((result)=>{


                    const formData = new FormData();        
                    formData.append('file', this.state.tempimg)
                    axios.put(`http://localhost:5000/api/v1/products/upload/${result.data.data._id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then((result)=>{
                            console.log("image ok")
                            this.setState({submited: true, error: null})
                        }).catch((err)=>{console.log(err.response.data);this.setState({error: err.response.data})})


                }).catch((err)=>{console.log(err.response.data); this.setState({error: err.response.data})})
            
        // }
    }

    render(){

        let errorAlert = null;
        if(this.state.error){
            errorAlert=(
                <Alert variant="danger" style={{width: "700px"}}>
                    {this.state.error}
                </Alert>)
        }

        let redirect = (this.state.submited&&!this.state.error)? (<Redirect to="/products/all/new/1"/>): null
        return(
            <div style={{width:"100%", height:"100%", display: "flex",marginTop: 100, flexDirection: "column", alignItems: "center"}}>
                {redirect}
                <Card style={{width: "700px", height:"500px"}}>
                    <Card.Header>New product</Card.Header>
                    <Card.Body>
                <Form style={{height: "100%",display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent:"space-between"}}>
                    Title
                    <Form.Control type="text" placeholder="Title" onChange={(e)=>this.setState({title: e.target.value})}/>
                    <Row>
                       
                        <Col>
                            <Image src={this.state.image} style={{width: 200, height: 200, marginTop: 30, marginBottom:20}}></Image>
                             <Form.File 
                                id="custom-file"
                                label="Custom file input"
                                custom
                                onChange={this.onFileUpload}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Enter description</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={(e)=>this.setState({description: e.target.value})}/>
                            <Form.Label>Condition</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={(e)=>this.setState({condition: e.target.value})}
                            >
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                                <option value="Used, like new">Used, like new</option>
                            </Form.Control>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={(e)=>this.setState({category: e.target.value})}
                            >
                                <option value="Pc">Pc</option>
                                <option value="Console">Console</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Appliances">Appliances</option>
                            </Form.Control>
                            <Form.Control style={{marginTop: 5, marginBottom: 15}}type="text" placeholder="Price" onChange={(e)=>this.setState({price: e.target.value})}/>
                        </Col>
                    </Row>
                    
                    <Button  variant="primary" type="submit" style={{backgroundColor: colors.color2, border: "none"}} onClick={this.onSubmit}>
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

const matStateToProps = state => {
    return{
        isAuth: state.token !==null,
        token: state.token
    }
}

export default connect(matStateToProps)(NewAd);