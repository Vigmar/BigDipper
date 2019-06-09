import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
const NavBar = () => {
    return(
        <div style={{width: 100,height: 650, backgroundColor:'#b6faea'}}>
        
        <img style={{position: 'absolute', top:0, width: 80,paddingLeft:10}} src="../images/0.png"/>
        <img style={{position: 'absolute', top:80,width: 80,paddingLeft:10}} src="../images/1.png"/>
        <img style={{position: 'absolute', top:160,width: 80,paddingLeft:10}} src="../images/2.png"/>
        <img style={{position: 'absolute', top:240,width: 80,paddingLeft:10}} src="../images/3.png"/>
        
        <img style={{position: 'absolute', top: 450,width: 100,paddingLeft:0}} src="../images/logo.png"/>
        </div>
    )
}
export default NavBar;