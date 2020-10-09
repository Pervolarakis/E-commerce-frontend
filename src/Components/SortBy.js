import React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap'
import * as pathToRegexp from 'path-to-regexp';
import {withRouter } from 'react-router-dom';

const sortBy = (props) =>{

    

    const action = (e) => {

        const { match: { path, params } } = props;
        
        const urlPartToInsert = pathToRegexp.compile(path)({
            ...params,
            sortby: e
          })

          props.history.push(urlPartToInsert)

        }
    return(
        <Nav className="mr-auto" style={{display: "flex",justifyContent: "flex-end", alignItems: "center"}}>
            Sort by: 
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" onSelect={(e)=>action(e)}>
                <NavDropdown.Item eventKey={"createdAt"}>Date: New First</NavDropdown.Item>
                <NavDropdown.Item eventKey={"price"}>Price: Low First</NavDropdown.Item>
                <NavDropdown.Item eventKey={"-price"}>Price: High First</NavDropdown.Item>
                <NavDropdown.Item eventKey={"-createdAt"}>Date: Old First</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
} 

export default withRouter(sortBy);