import React, { Component } from 'react'
import NavBar from './components/NavBar'
import CoursesList from './components/CoursesList'
class App extends Component {
  render() {
    return (
      <div style={{width:600}}>
      <div style={{position:'absolute',width: 100}}>
      <NavBar/>
      </div>
      <div style={{position:'absolute',width: 500,left:100}}>
        <CoursesList />
      </div>  
      </div>
    )
  }
}
export default App