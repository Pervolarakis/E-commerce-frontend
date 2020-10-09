import React, {Component} from 'react';
import NavBar from './Head/NavBar';
import Body from './Body/Body';
import {Switch, Route, Redirect} from 'react-router-dom'
import Register from './Body/Register'
import NewProduct from './Body/NewProduct'
import ProductView from './Body/ProductView'
import Login from './Head/Login'
import Settings from './Body/Settings'
import EditModal from './Body/EditModal';
import Profile from './Body/Profile'

import {connect} from 'react-redux';

class Layout extends Component{
    render(){

        let routes=(<Switch>
            <Route exact path="/products/:category/:sortby/:page" component={Body}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/product/:productid" component={ProductView}/>
            
            
            <Redirect to="/products/all/new/1"/>
        </Switch>)

        if(this.props.isAuth){
            routes=(
                <Switch>
                    <Route exact path="/products/:category/:sortby/:page" component={Body}/>
                    <Route exact path="/settings" component={Settings}/>
                    <Route exact path="/newad" component={NewProduct}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/product/:productid/edit" component={EditModal}/>
                    <Route exact path="/product/:productid" component={ProductView}/>
                    <Redirect to="/products/all/new/1"/>
                </Switch>
            )
        }

        return(
            <div>
                <NavBar/>
                {routes}
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        isAuth: state.token!==null
    }
}

export default connect(mapStateToProps)(Layout);