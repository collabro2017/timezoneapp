import React, { Component } from 'react';
import Login from '../../Containers/Login';
import Signup from '../../Containers/Signup';
import { connect } from 'react-redux'; 
export default class Auth extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.mode === 'signup')
            return (
                <Signup />
            )
        else
            return (
                <Login />
            )    
    }
}





