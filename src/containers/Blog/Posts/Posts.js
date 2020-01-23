import React, { Component } from 'react';
import { /* Link */ Route } from 'react-router-dom';
import axios from '../../../axios';

import FullPost from '../../../containers/Blog/FullPost/FullPost';
import Post from '../../../components/Post/Post';

import './Posts.css';

export default class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log('Posts', this.props);

        // React-Router gives use the following within our props objects
        // history - offers us an object to which we can call a method on to link to another page programtically
        // location - information about the location e.g. search, hash fragment
        // match - gives us information about our matched route

        axios.get('/posts')
            .then(response => {
                // To grab the first 4 posts only
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Isaac'
                    }
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                this.setState({ error: true });
            });;
    }

    postSelectedHandler = (id) => {
        // this.setState({ selectedPostId: id });

        // Navigate programatically using history with the PUSH method, which acts on a stack of routes
        // .push() - takes a string or an object
        // Both will work
        // this.props.history.push('/posts/' + id);
        this.props.history.push({
            pathname: '/posts/' + id
        });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id} >
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}
