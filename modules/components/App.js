import React from 'react'
import { Link } from 'react-router'

import s from './App.css'
import logo from './logo.jpg'

export default class App extends React.Component {
  render() {
    return (
      <div className={s.App}>
        <h1 className={s.Name}>App</h1>
        <p>
          <img src={logo} />
        </p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About (lazy loaded)</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


