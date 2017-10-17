import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as homeActions from '../../actions/home'
import * as authActions from '../../actions/auth'
import * as regularActions from '../../actions/regular'
import * as managerActions from '../../actions/manager'
import LoginScreen from '../../Components/Login'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'
import firebase, {firebaseDb} from '../../data/firebaseconf'

class Login extends Component {
    
    componentWillReceiveProps(nextProps) {
    
        if (nextProps.loggedIn === true) {
            if (nextProps.role === 'Regular') {
                this.props.fetchHisTimezonesData(nextProps.email);
                Actions.TimezoneList();
            }
            else if (nextProps.role === 'Manager') {
                this.props.fetchAllUsersData('Manager');
                Actions.UserList(); 
            }
            else {
                this.props.fetchAllTimezonesData();
                this.props.fetchAllUsersData('Admin');
                Actions.Admin();
            }   
           
        }        
            
    }

    render() {
        return (
            <LoginScreen logIn={this.props.logIn} toSignup={this.toSignup} isLoggingIn={this.props.isLoggingIn}/>
        );
    }

    toSignup = () => {
        this.props.changeMode('signup');
    }
    
}

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
    isLoggingIn: state.auth.isLoggingIn,
    uid: state.auth.uid,
    email: state.auth.email,
    role: state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(homeActions.changeMode(mode)),
    logIn: (email, pass) => dispatch(authActions.logIn(email, pass)),
    fetchAllTimezonesData: () => dispatch(regularActions.fetchAllTimezonesData()),
    fetchHisTimezonesData: (email) => dispatch(regularActions.fetchHisTimezonesData(email)),
    fetchAllUsersData: (role) => dispatch(managerActions.fetchAllUsersData(role))
});

export default connect (mapStateToProps, mapDispatchToProps)(Login);

const style={
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

