import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ClassList extends Component {
  constructor() {
    super()
    this.state = {
      students: []
    }
  }
  componentDidMount() {
    console.log(this.props) // Console log to see how the drill down looks
    axios.get(`http://localhost:3005/students?class=${this.props.match.params.class}`)
      .then(res => {
        this.setState({ students: res.data })
      })
      .catch(error => (
        alert(error)
      ))
  }

  render() {
    // Use element to make more sense to yourself and spell element out
    const students = this.state.students.map((element, index) => (
      <Link to={`/student/${element.id}`} key={index}>
        <h3 key={index}>{element.first_name} {element.last_name}</h3>
      </Link>
    ))
    return (
      // react-router-dom passes down match, use it
      <div className="box">
        <h1>{this.props.match.params.class}</h1>
        <h2>ClassList:</h2>
        {students}
      </div>
    )
  }
}