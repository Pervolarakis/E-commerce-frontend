import React, {Component} from 'react';
import {Card, Form, Button, Modal,Row} from 'react-bootstrap'
import * as colors from '../../Colors'
import axios from 'axios'



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
        data: '',
        error: null
    }
    
    componentDidMount(){
        if(!this.state.loaded){
            let productId= this.props.history.location.pathname.toString().slice(9).split('/')[0]
            axios.get(`http://localhost:5000/api/v1/products/${productId}`)
            .then((result)=>{
                this.setState({data: result.data.data, loaded:true, product: productId})
            }).catch((err)=>console.log(err))
        }
        
        
    }

    render(){
        return(
            <div style={{width:"100%", height:"100%", display: "flex",marginTop: 100, flexDirection: "column", alignItems: "center"}}>

                <Card style={{width: "700px", height:"500px"}}>
                    <Card.Header>Edit product</Card.Header>
                    <Card.Body>
                        <Form style={{height: "100%",display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent:"space-between"}}>
                            Title
                            <Form.Control type="text" placeholder="Title" onChange={(e)=>this.setState({title: e.target.value})} value={this.state.data.title}/>
                            <Row>

                                <Form.Label>Enter description</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={(e)=>this.setState({description: e.target.value})} value={this.state.data.description}/>
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
                            
                            </Row>
                            
                            <Button  variant="primary" type="submit" style={{backgroundColor: colors.color2, border: "none"}} onClick={this.onSubmit}>
                            Submit
                            </Button>
                            
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            
        )
    }
}

export default EditModal;