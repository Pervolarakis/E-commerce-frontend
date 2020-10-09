import React, {Component} from 'react';
import {Card, Form, Button, Alert,Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as colors from '../../Colors'
import axios from 'axios'
import {Redirect} from 'react-router-dom'



class EditModal extends Component{

    state={
        title: '',
        description: '',
        condition: 'New',
        category: 'Pc',
        price: '',
        submited: false,
        loaded: false,
        product: '',
        error: null
    }
    
    componentDidMount(){
        if(!this.state.loaded){
            let productId= this.props.history.location.pathname.toString().slice(9).split('/')[0]
            axios.get(`http://localhost:5000/api/v1/products/${productId}`)
            .then((result)=>{
                this.setState({title: result.data.data.title, 
                    description: result.data.data.description,
                    condition: result.data.data.condition,
                    category: result.data.data.category,
                    price: result.data.data.price,  
                    loaded:true, 
                    product: productId})
            }).catch((err)=>console.log(err))
        }
        
        
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let data={
            title: this.state.title,
            description: this.state.description,
            condition: this.state.condition,
            category: this.state.category,
            price: this.state.price
        }
        axios.put(`http://localhost:5000/api/v1/products/${this.state.product}` ,data, {headers: {'Authorization': `Bearer ${this.props.token}`}})
            .then((res)=>{this.setState({submited: true})})
            .catch((err)=>{this.setState({error: err.response.data})})
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
                    <Card.Header>Edit product</Card.Header>
                    <Card.Body>
                        <Form style={{height: "100%",display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent:"space-between"}}>
                            Title
                            <Form.Control type="text" placeholder="Title" onChange={(e)=>this.setState({title: e.target.value})} value={this.state.title}/>
                            <Row>

                                <Form.Label>Enter description</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={(e)=>this.setState({description: e.target.value})} value={this.state.description}/>
                                <Form.Label>Condition</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    onChange={(e)=>this.setState({condition: e.target.value})}
                                    value={this.state.condition}
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
                                    value={this.state.category}
                                >
                                    <option value="Pc">Pc</option>
                                    <option value="Console">Console</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Appliances">Appliances</option>
                                </Form.Control>
                                <Form.Control style={{marginTop: 5, marginBottom: 15}}type="text" placeholder="Price" value={this.state.price} onChange={(e)=>this.setState({price: e.target.value})}/>
                            
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

const mapStateToProps = state => {
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(EditModal);