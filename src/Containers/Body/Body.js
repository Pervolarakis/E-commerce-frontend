import React,{Component} from 'react';
import List from './List';
import SideBar from './SideBar';
import SortBy from '../../Components/SortBy'

class Body extends Component{


    render(){
        
        return(
            <div style={{margin: 50}}>
                
                <SortBy/>
                
                <div style={{display: "flex", flexDirection:"row", marginTop: 20}}>
                    <SideBar/>
                    <List style={{flex: 5}}/>
                </div>
            </div>
           
        )
    }
}

export default Body;