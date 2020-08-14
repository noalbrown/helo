import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      posts: '',
      checkbox: true
    }
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    axios.get('/api/get_posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      }).catch(error => console.log(error))
  }

  render() {
    const { title } = this.state
    const newPosts = this.state.posts.map((e, id) => (
      <Auth key={id} data={e} />))
    return <div>
      <div>
        <input name='title' type='text' value={title} placeholder='Search' />
      </div>
      <div>
        <button>Search</button>
        <button>Reset</button>
      </div>
      <form>
        <input name='posts' type='checkbox' value={newPosts} placeholder='My Posts' />
      </form>
    </div>
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps(Dashboard));