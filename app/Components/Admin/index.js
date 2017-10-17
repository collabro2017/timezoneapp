import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import TimezoneList  from '../../Containers/Regular/TimezoneList'
import UserList  from '../../Containers/Manager/UserList'

const options = ['Regular', 'Manager', 'Admin'];

export default class AdminScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersflag: true,
            timesflag: false,
            tab: 'users'
        }
    }

    componentWillMount() {
        if (this.props.tab === 'times')
            this.setState({tab: 'times'})
    }

    onSelectTab = (tab) => {
        if (tab === 'users') {
            if (this.state.usersflag === false) {
                this.setState({usersflag: true, timesflag: false})
                this.setState({tab: 'users'})
            }
        }
        if (tab === 'times'){
            if (this.state.timesflag === false) {
                this.setState({usersflag: false, timesflag: true})
                this.setState({tab: 'times'})
            }   
        }
    }

    render() {
        return (
            <View style={style.adminContainer}>
                <View style= {{flex: 1}}>
                    {this.state.tab === 'times' ? <TimezoneList /> : <UserList />}
                </View>
                <View style={style.tabbarContainer}>   
                    <View style={style.tabbar}>
                        <TouchableOpacity onPress = {() => this.onSelectTab('users')}>
                            {this.state.usersflag === true ? 
                                <Text style={style.tabtext}>users</Text> :
                                <Text>users</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.onSelectTab('times')}>
                            {this.state.timesflag === true ? 
                                <Text style={style.tabtext}>times</Text> :
                                <Text>times</Text>}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    } 
}

const style = {
    adminContainer : {
        flex: 1, 
    },

    tabbarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '7%',
        backgroundColor: 'lightgrey'
    },

    tabbar: {
        width: '50%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    tab: {
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'green'
    },

    tabtext: {
        color: 'red'
    }
}
