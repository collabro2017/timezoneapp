import React, {Component} from 'react'
import { ActivityIndicator, View } from 'react-native'
import * as homeActions from '../../actions/home'
import * as authActions from '../../actions/auth'
import * as regularActions from '../../actions/regular'
import * as managerActions from '../../actions/manager'

import { connect } from 'react-redux'
import SignupScreen from '../../Components/Signup'
import {Actions, Scene, Router} from 'react-native-router-flux'
import firebase, {firebaseDb} from '../../data/firebaseconf'

class Signup extends Component {

    componentWillReceiveProps(nextProps) {
        let path = 'users/' + nextProps.uid;
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
            <SignupScreen 
                signUp = {this.props.signUp} 
                toLogin = {this.toLogin}
                isSigningUp = {this.props.isSigningUp}
            />
        );   
    }

    toLogin = () => {
        this.props.changeMode('login');
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    isSigningUp: state.auth.isSigningUp,
    loggedIn: state.auth.loggedIn,
    email: state.auth.email,
    role: state.auth.role
})
const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(homeActions.changeMode(mode)),
    signUp: (email, pass, name, role, isNormal) => dispatch(authActions.signUp(email, pass, name, role, isNormal)),
    fetchAllTimezonesData: () => dispatch(regularActions.fetchAllTimezonesData()),
    fetchHisTimezonesData: (email) => dispatch(regularActions.fetchHisTimezonesData(email)),
    fetchAllUsersData: (role) => dispatch(managerActions.fetchAllUsersData(role))
});

export default connect (mapStateToProps, mapDispatchToProps)(Signup);

const style = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
}