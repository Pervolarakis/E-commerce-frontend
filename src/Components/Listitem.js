import { Card} from 'react-bootstrap';
import React from 'react';
import {NavLink} from 'react-router-dom'

const ListItem = (props) => {

    
    return(
        <div>
            <Card style={{ width: '18rem', minHeight: "450px", marginLeft: 10, marginRight: 10, marginBottom: 10}}>

                <Card.Img style={{height: 200, margin: "auto"}}variant="top" src={`http://localhost:5000/uploads/${props.data.photo}`} />
                <Card.Body>

                    <NavLink to={`/product/${props.data._id}`}>
                        <Card.Title style={{flex: 10}}>{props.data.title}</Card.Title> 
                    </NavLink>
                    <Card.Text style={{display: "flex", flexDirection:"column", justifyContent: "space-between"}}>
                    <div >
                    {props.data.description.slice(0,100).concat('...')}
                    </div>
                    {new Date(props.data.createdAt).toISOString().slice(0, 19).split('T').join(":")}
                    </Card.Text>
                    
                    
                </Card.Body>
                <Card.Footer className="text-muted">{props.data.price}</Card.Footer>

            </Card>
        </div>
        
    )

}

export default ListItem;