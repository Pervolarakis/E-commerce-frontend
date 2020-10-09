import React, {Component} from 'react';
import {Image, Card} from 'react-bootstrap';
import axios from 'axios' 
import {TrashFill, PencilFill} from 'react-bootstrap-icons'
import {connect} from 'react-redux';
import ProfileModal from '../../Components/ProfileModal'
import * as colors from '../../Colors'
import DeleteModal from './DeleteModal'
import {Redirect} from 'react-router-dom';
import EditModal from './EditModal';

class ProductView extends Component{

    state={
        data: '',
        loaded: false,
        profile: false,
        product: '',
        deleted: false
    }
    componentDidMount(){
        if(!this.state.loaded){
            let productId= this.props.history.location.pathname.toString().slice(9)
            axios.get(`http://localhost:5000/api/v1/products/${productId}`)
            .then((result)=>{
                this.setState({data: result.data.data, loaded:true, product: productId})
            }).catch((err)=>console.log(err))
        }
        
        
    }

    onItemDelete=()=>{
        console.log(this.props.token)
        axios.delete(`http://localhost:5000/api/v1/products/${this.state.product}`, {headers: {'Authorization': `Bearer ${this.props.token}`}})
            .then((res)=>{
                console.log(res)
                this.setState({deleted: true})
            })
            .catch((err)=>console.log(err));
    }

    onDeleteModalTogle=()=>{
        this.setState(prevState => ({
            togleDelete: !prevState.togleDelete
        }));
    }
    

    render(){
        //control buttons
        let controls = null;
        
        if(this.state.loaded&&this.props.isAuth && this.props.user._id===this.state.data.user._id){
            controls=(
            <div style={{alignSelf: "flex-end"}}>
                <TrashFill color={colors.headerColor} size={25} style={{marginRight: 10}} onClick={()=>this.setState({togleDelete: true})}/>
                <PencilFill color={colors.headerColor} size={25}/>
            </div>)
        }

        //profile modal
        let modal = null;

        if(this.state.profile){
            modal = (
                <ProfileModal userName={this.state.data.user.username} close={()=>this.setState({profile: false})}/>
            )
        }

        //delete modal
        let deleteModal= null;
        if(this.state.togleDelete){
            deleteModal=(
            <DeleteModal toggle={this.onDeleteModalTogle} onDelete={this.onItemDelete}/>
            )
        }

        let redirect=null
        if(this.state.deleted){
            redirect=(<Redirect to='/products/all/new/1'/>)
        }

        return(
            <div>
                
                {redirect}
                {deleteModal}
                {(this.state.loaded)?(
                    
                <Card style={{marginLeft: 150, marginRight: 150, marginTop: 100}}>
                    <Card.Header style={{display: "flex"}}>
                    
                        <div style={{justifySelf: "center",margin:"auto"}}>
                        {this.state.data.title}
                        </div>
                        {controls}
                    </Card.Header>
                    <Card.Body>
                    <div style={{display:"flex", flexDirection: "row"}}>
                        {modal}
                        <Image style={{width: "500px", height: "500px"}}src={`http://localhost:5000/uploads/${this.state.data.photo}`}></Image>
                        <div style={{marginLeft: 150, width: 750}}>
                            <h1>{this.state.data.title}</h1>
                            <div style={{display: "flex", flexDirection:"row", justifyContent: "center", marginTop: 20}}>
                                <p>{`Category: ${this.state.data.category}`}</p>
                                <p>{`Contition: ${this.state.data.condition}`}</p>
                            </div>
                            <p style={{marginTop: 30}}>{this.state.data.description}</p>
                            <p>{`Price: ${this.state.data.price}`}</p>
                            <p style={{alignSelf: "flex-end"}}>Posted By: <button style={{border: "none",color: "blue", backgroundColor: colors.bodyColor}} onClick={()=>this.setState({profile:true})}>{this.state.data.user.username}</button></p>
                            <p>{`Created: ${this.state.data.createdAt}`}</p>
                        </div>
                    </div>
                    </Card.Body>
                
                </Card>
                ):null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.token,
        isAuth: state.token!==null,
        user: state.user
    }
}

export default connect(mapStateToProps)(ProductView);