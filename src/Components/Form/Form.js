import React from 'react'
import axios from 'axios'

class Form extends React.Component {
  create(title, img, content) {
    axios.post('/api/create_post', { title, img, content }).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(error => console.log(error))
  }

  render() {
    return <div>
      <div>
        <input name='title' type='text' value={title} placeholder='Title' />
        <input name='image' type='text' value={title} placeholder='Image URL' />
        <input name='content' type='form' value={title} placeholder='Content' />
      </div>
      <div>
        <button>Post</button>
      </div>
    </div>
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps(Form));