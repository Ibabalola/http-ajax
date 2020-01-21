import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Settings for what is trur for all requests being sent
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// an Interceptor - function defined globally that will be executed for every 
// request leaving your app and every response entering it 
// useful for setting authorisation headers or to 
// handler errors globally 
// it usually receives a config for outgoing requests and incoming responses
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    // Can add headers
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// To remove Interceptors
// axios.interceptors.request.eject(myRequestInterceptor);
// axios.interceptors.response.eject(myRequestInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
