import React,{Component} from 'react';
import ListItem from '../../Components/Listitem'
import {Spinner, Pagination} from 'react-bootstrap'
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom';


class List extends Component{

    state = {
        loaded: false,
        data: null,
        update: false,
        pages: 1,
        activePage: 1,
        category: 'all',
        sortBy: 'new'
    }

    
    async componentDidMount (){
        if(this.state.loaded===false){
            await this.setState({category: this.props.match.params.category, activePage: this.props.match.params.page, sortBy: this.props.match.params.sortby})
            let category=`?`;
            if(this.state.category!=='all'){
                category=`?category=${this.state.category}&`
            }
            console.log(this.state)
            axios.get(`http://localhost:5000/api/v1/products${category}page=${this.state.activePage}?sort=${this.state.sortBy}`)
                .then(async(res)=>{
                    await this.setState({data: res.data.data, pages: res.data.pages, loaded: true, activePage: this.props.match.params.page, sortBy: this.props.match.params.sortby})
                    
                    
                })
                .catch((err)=>console.log(err))
            
        }
    }
          
    
    componentWillReceiveProps(newProps){
        this.setState({category: newProps.match.params.category})
        let sortby = newProps.match.params.sortby
        let category = newProps.match.params.category
        let page = newProps.match.params.page;
        console.log("allagi")
        if(category!=='all'){
            category=`?category=${category}&`
        }else{
            console.log("edo")
            category=`?`;
        }
        
        let url= `http://localhost:5000/api/v1/products${category}page=${page}&sort=${sortby}`
        console.log(url)
        axios.get(url)
            .then(async(res)=>{
                
                await this.setState({data: res.data.data,pages: res.data.pages, loaded: true, activePage: page, sortBy: sortby})
                console.log(this.state)
                
                
            })
            .catch((err)=>console.log(err))
        
    }
    

    render(){
        let items = [];
        if(this.state.loaded){
            let active = parseInt(this.state.activePage);

            for (let number = 1; number <= this.state.pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    <NavLink to={`/products/${this.state.category}/${this.state.sortBy}/${number}`} activeStyle={{color: "white"}}>
                        {number}
                    </NavLink>
                </Pagination.Item>,
            );
            
            }
        }
        return(
            <div style={{width: "100%",display: "flex", flexDirection: "column"}}>
                <div style={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}> 
                {(!this.state.loaded)?
                    (<div><Spinner animation="border" /></div>):(this.state.data.map((value,index)=>{return(<div key={index}><ListItem data={value}/></div>)}))}
                
            </div>
                <Pagination style={{width: "100%",borderTop: "1px solid grey", paddingTop: 15, justifyContent: "flex-end", paddingRight: 50}}>{items}</Pagination>
            </div>
            
        )
    }
}

export default withRouter(List);