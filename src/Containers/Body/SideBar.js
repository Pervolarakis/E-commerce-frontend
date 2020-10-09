import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import * as colors from '../../Colors'

class SideBar extends Component{



    itemStyle={
        backgroundColor: "white",
        border: "2px solid black",
        color: colors.color1
    }

    activeItemStyle={
        backgroundColor: colors.color1,
        color: "white"
    }
    render(){
        return(
            
            <div style={{display: "flex", flexDirection: "column"}}>
                
                <NavLink  to="/products/all/new/1" style={this.itemStyle} activeStyle={this.activeItemStyle}>
                    <h1>All</h1>
                </NavLink>
                <NavLink  to="/products/Pc/new/1" style={this.itemStyle} activeStyle={this.activeItemStyle}>
                    <h1>Pc</h1>
                </NavLink>
                <NavLink  to="/products/Console/new/1" style={this.itemStyle} activeStyle={this.activeItemStyle}>
                    <h1>Console</h1>
                </NavLink>
                <NavLink  to="/products/Electronics/new/1" style={this.itemStyle} activeStyle={this.activeItemStyle}>  
                    <h1>Electronics</h1>
                </NavLink>
                <NavLink  to="/products/Appliances/new/1" style={this.itemStyle} activeStyle={this.activeItemStyle} >
                    <h1>Appliances</h1>
                </NavLink>
                
            </div>
            
        )
    }
}

export default SideBar;