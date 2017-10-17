import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as regularActions from '../../../actions/regular';
import * as authActions from '../../../actions/auth';
import * as managerActions from '../../../actions/manager';
import UserListScreen from '../../../Components/Manager/UserList'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'
import firebase, {firebaseDb} from '../../../data/firebaseconf'
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UsersList : {}
        }
    }
    
    componentWillMount(){
        this.setState({UsersList : this.props.UsersList})
    }
    componentWillReceiveProps(nextProps){
        if (this.props.UsersList != nextProps.UsersList){
            this.setState({UsersList: nextProps.UsersList})
        }
    }
    
    deleteUserItem = (userIndex) => {
        let _UsersList = this.state.UsersList;
        this.props.deleteUser(userIndex);
        delete _UsersList[userIndex];
        this.setState({UsersList : _UsersList});
    }

    logOut = () => {
       this.props.logOut();
       Actions.Auth('login');
    }

    render() {
        return (
            <UserListScreen
                role = {this.props.role}
                logOut = {this.logOut}
                UsersList = {this.state.UsersList}
                deleteUser = {this.props.deleteUser}
                deleteUserItem = {this.deleteUserItem}
                isFetchingUsers = {this.props.isFetchingUsers} 
            />
        );
    }

}

const mapStateToProps = (state) => ({
    UsersList: state.manager.UsersList,
    isFetchingUsers: state.manager.isFetchingUsers,
    loggedIn: state.auth.loggedIn,
    role: state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
    deleteUser: (userIndex) => dispatch(managerActions.deleteUser(userIndex)),
    logOut: () => dispatch(authActions.logOut())
});
export default connect (mapStateToProps, mapDispatchToProps)(UserList);
