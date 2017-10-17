import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as regularActions from '../../../actions/regular';
import * as managerActions from '../../../actions/manager';
import EditUserScreen from '../../../Components/Manager/EditUser'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'

let data = {}

class EditUser extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSavedUser === true) {
            if (this.props.role1 === 'Manager') {
                Actions.UserList();
            }
            if (this.props.role1 === 'Admin') {
                Actions.Admin();
            }   
        }              
    }

    render() {
        return (
            <EditUserScreen 
                SaveUser = {this.props.saveUser}
                index = {this.props.userIndex}
                name = {this.props.userName}
                role = {this.props.userRole}
                email = {this.props.userEmail}
                role1 = {this.props.role1}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    isSavedUser: state.manager.isSavedUser,
    role1: state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
   saveUser: (userIndex, userName, userRole, userEmail) => dispatch(managerActions.saveUser(userIndex, userName, userRole, userEmail))
});

export default connect (mapStateToProps, mapDispatchToProps)(EditUser);


