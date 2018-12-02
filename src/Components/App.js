import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpPage  from "./MDBLOGINSIGNUP/Signup";
import  traffic from  "./images/traffic.png";


class App extends Component {
  
  
render() {
    return (
      <div style={{position:"relative",top:"15vh",left:"150px"}}>

   

<img src={traffic} width={"600px"} height={"500px"} style={{float:"right", position:"relative" , right:"400px"}}/>
<SignUpPage/>
</div>
    );
  }
}

export default App;
