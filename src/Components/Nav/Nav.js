import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Nav extends React.Component {
  componentDidMount() {
    this.getAll();
  }

  logout = () => {
    axios.get('/auth/logout').then(res => {
      this.props.logoutUser();
      this.props.history.push('/');
    }).catch(err => console.log(err))
  }

  render() {
    return <div>
      <h1>{this.props.users.username} {this.props.user.profile_pic}</h1>
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
const mapStateToProps = state => state;

export default connect(mapStateToProps(Nav));