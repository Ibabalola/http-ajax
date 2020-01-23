import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'; // <Switch /> tells the react to choose the first route if matches 
// and render only this route and to stop analysing thereafter
// Order is important when using <Switch />
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import Posts from './Posts/Posts';

import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* Using <NavLink /> as opposed to <Link /> gives us the ability to style 
                        the anchor tag with the use of added class */}
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                // pathname: this.props.match.url + '/new-post', - Use this.props.match.url for relative pathing 
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home2</h1>}/> */}

                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <div style={{ margin: 'auto', textAlign: 'center'}}><h1>Page Not Found</h1></div>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/"  component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;