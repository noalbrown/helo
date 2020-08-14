import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return <div>
      <ul>
        <li>
          <Link to='/dashboard'>Home</Link>
        </li>
        <li>
          <Link to='/new'>New Post</Link>
        </li>
        <li>
          <Link to='/'>Logout</Link>
        </li>
      </ul>
    </div>;
  }
}

export default Nav;