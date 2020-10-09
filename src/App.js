import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Containers/Layout'
import {BrowserRouter} from 'react-router-dom'
import * as colors from './Colors'


function App() {
  return (
    <div className="App" style={{width: "100%", height: "100%", flex:1,backgroundColor: colors.bodyColor}}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
