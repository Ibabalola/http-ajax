import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Isaac',
        submitted: false
    }

    componentDidMount() {
        // If unauth => this.props.history.replace('/posts');
        console.log('Posts', this.props);
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };

        // status 201 indicates that post has been successfully processed
        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                // this.setState( { submitted: true });
                this.props.history.replace('/posts'); // Does the same as redirecting and replaces the current page on the stack
            });
    }

    render() {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />;
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Isaac">Isaac</option>
                    <option value="Max">Max</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;