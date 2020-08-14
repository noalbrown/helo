import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

class Post extends React.Component {
  create(id, content) {
    axios.post('/api/somename', { id, content }).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(error => console.log(error))
  }

  render() {
    return <div>
      <button>Delete Post</button>
    </div>
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps(Post));