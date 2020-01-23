import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    // status 200 indicates that post has been successfully processed
    componentDidMount() {
        this.loadData();
    }

    // Needed for post updates when props changes
    componentDidUpdate() {
        this.loadData();
    }
    
    loadData() {
        const postId = this.props.match.params.id;
        const query = new URLSearchParams(this.props.location.search); // parsing query paramerters
        const fragment = this.props.location.hash // parsing fragment e.g. #start-position

        if (postId) {
            axios.get('/posts/' + postId)
                .then(response => {
                    this.setState({ loadedPost: response.data });
                });
        }

        console.log('[FullPost.js] - Printing Search Param');
        for (let param of query.entries()) {
            console.log('[FullPost.js] - Param', param); // ['queryName', 'queryValue']
        }

        console.log('[FullPost.js] - Fragment', fragment);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== parseInt(this.props.match.params.id));
    }

    // status 200 indicates that post has been successfully processed
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;