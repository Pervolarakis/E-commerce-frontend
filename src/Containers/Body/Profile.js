import React, {Component} from 'react';
import {Card} from 'react-bootstrap'
import {connect} from 'react-redux';

class Profile extends Component{
    render(){
        return(
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Card style={{width: "60%", marginTop: "100px", display:"flex", flexDirection: "row"}}>
                    <Card.Img style={{width: "200px", height: "200px", margin: 10}}variant="top" src="https://myselfietime.com/images/profilepic-210x216.jpg" />
                    <Card.Body>
                        <h3>My Profile</h3>
                        <p>{`My Username: ${this.props.user.username}`}</p>
                        <p>{`My Name: ${this.props.user.fname}`}</p>
                        <p>{`My Last Name: ${this.props.user.lname}`}</p>
                        <p>{`My Email: ${this.props.user.email}`}</p>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile);