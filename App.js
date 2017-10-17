import React from 'react';
import  { Provider } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import store from './app/store'
import Home from './app/Containers/Home';
import Auth from './app/Containers/Auth';
import TimezoneList from './app/Containers/Regular/TimezoneList';
import AddTimezone from './app/Containers/Regular/AddTimezone';
import EditTimezone from './app/Containers/Regular/EditTimezone';
import UserList from './app/Containers/Manager/UserList';
import AddUser from './app/Containers/Manager/AddUser';
import EditUser from './app/Containers/Manager/EditUser';
import Admin from './app/Containers/Admin';
import { connect } from 'react-redux';
const scenes = Actions.create(
  <Scene key="root">
    <Scene key = "Home" hideNavBar panHandlers = {null} component = {Home} />
    <Scene key = "Auth" hideNavBar panHandlers = {null} component = {Auth} />
    <Scene key = "TimezoneList" hideNavBar panHandlers = {null} component = {TimezoneList} />
    <Scene key = "AddTimezone" panHandlers = {null} component = {AddTimezone} />
    <Scene key = "EditTimezone" panHandlers = {null} component = {EditTimezone} />
    <Scene key = "UserList" hideNavBar panHandlers = {null} component = {UserList} />
    <Scene key = "AddUser" panHandlers = {null} component = {AddUser} />
    <Scene key = "EditUser" panHandlers = {null} component = {EditUser} />
    <Scene key = "Admin" hideNavBar panHandlers = {null} component = {Admin} />
  </Scene>
);

const RouterWithRedux = connect()(Router);

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
      return (
        <Provider store={store}>
          <RouterWithRedux scenes={scenes}>
          </RouterWithRedux>
        </Provider>
      )
  }
}


