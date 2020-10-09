import React,{Component} from 'react';
import {ListGroup} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import * as colors from '../../Colors'

class SideBar extends Component{



    itemStyle={
        backgroundColor: "white",
        color: colors.color1
    }

    activeItemStyle={
        border: `1px solid ${colors.color1}`
    
    }
    render(){
        return(

            <ListGroup style={{width: "8%"}}>
                <ListGroup.Item as={NavLink} to="/products/all/new/1" activeStyle={this.activeItemStyle} style={this.itemStyle}>
                All
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/products/Pc/new/1" activeStyle={this.activeItemStyle} style={this.itemStyle}>
                Pc
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/products/Console/new/1" activeStyle={this.activeItemStyle} style={this.itemStyle}>
                Console
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/products/Electronics/new/1" activeStyle={this.activeItemStyle} style={this.itemStyle}>
                Electronics
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/products/Appliances/new/1" activeStyle={this.activeItemStyle} style={this.itemStyle}>
                Appliances
                </ListGroup.Item>
            </ListGroup>
                        
            
        )
    }
}

export default SideBar;