import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as authActions from '../../../actions/auth';
import * as regularActions from '../../../actions/regular';
import * as managerActions from '../../../actions/manager';
import AddUserScreen from '../../../Components/Manager/AddUser'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'

class AddUser extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddedNewUser === true) {
            if (this.props.role === 'Manager') {
                Actions.UserList();
            }
            if (this.props.role === 'Admin') {
                Actions.Admin({tab: 'users'});
            }   
        }              
    }

    render() {
        return (
            <AddUserScreen 
                AddNewUser = {this.props.addNewUser} 
                isAddingNewUser = {this.props.isAddingNewUser}
                role = {this.props.role} />
        );
    }

}

const mapStateToProps = (state) => ({
    isAddingNewUser: state.manager.isAddingNewUser,
    isAddedNewUser: state.manager.isAddedNewUser,
    role: state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
   addNewUser: (email, pass, name, role, isNormal) => dispatch(authActions.signUp(email, pass, name, role, isNormal)), 
});

export default connect (mapStateToProps, mapDispatchToProps)(AddUser);


