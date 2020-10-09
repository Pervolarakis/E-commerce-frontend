import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap';




class DeleteButton extends Component{
    
    state={
        show:true
    }


    
    onItemDelete = () =>{
        console.log(this.props.product)
        // onItemDelete=()=>{
        //     axios.delete(`http://localhost:5000/api/v1/products/${this.props.product}`)
        //         .then((res)=>{
        //             console.log(res);
        //         })
        //         .catch((err)=>console.log(err));
        // }
    
    }

    modalToggle=()=>{
        this.setState({show: false});
        this.props.toggle();
    }
    

    render(){
        return(
            <Modal show={this.state.show}>
                <Modal.Dialog>
                <Modal.Header closeButton onHide={this.modalToggle}>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this product?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.modalToggle}>Close</Button>
                    <Button variant="primary" onClick={this.props.onDelete}>Yes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            
        )
    }
}

export default DeleteButton;