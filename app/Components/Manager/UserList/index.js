import React, { Component } from 'react'
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base'

import { Actions, Scene, Router } from 'react-native-router-flux'
import { ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import firebase, {firebaseDb} from '../../../data/firebaseconf'

const options = ['Regular', 'Manager', 'Admin']
export default class UserListScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.UsersList != nextProps.UsersList){
            this.props.UsersList = nextProps.UsersList;
        }
    }

    onAdd = () => {
        Actions.AddUser();
    }
    onEdit = (userIndex, userName, userRole, userEmail) => {
        Actions.EditUser({userIndex: userIndex, userName: userName, userRole: userRole, userEmail: userEmail});
    }

    onDelete = (userIndex) => {
        this.props.deleteUserItem(userIndex);
    }

    logOut = () => {
        this.props.logOut();
    }

    renderUsersList(userIndex, index) {
        let userName = this.props.UsersList[userIndex].name;
        let userRole = this.props.UsersList[userIndex].role;
        let userEmail = this.props.UsersList[userIndex].email;
        return (
            <View key = {userIndex} style={style.userItem}>
                <View style={style.content}>
                    <View style={style.subItem1}>
                        <Text>{userName}</Text>
                        <Text>{userRole}</Text>
                    </View>
                    <View style={style.subItem2}>
                        <Text>{userEmail}</Text>
                    </View>
                </View>
                <View style={style.funcButton}>
                    <View style={style.editButton}>
                        <TouchableOpacity onPress = {() => this.onEdit(userIndex, userName, userRole, userEmail)}>
                            <Text style = {style.textColor}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.deleteButton}>
                        <TouchableOpacity onPress = {() => this.onDelete(userIndex)}>
                            <Text style = {style.textColor}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>
        )
    }
    render() {
        if (this.props.isFetchingUsers === true) {
            return (
                <View style={style.indicator}>
                    <ActivityIndicator
                        animating={true}
                        color="#aa00aa"
                        size="large"
                    />
                </View>
            )
        }
        else {
            return (
                <View style={style.container}>
                    <View style={style.buttonStyle}>
                        <Button block  style={{marginTop: '15%'}} onPress={() => this.onAdd()}>
                            <Text>Add New User</Text>
                        </Button>
                    </View>  
                    <View style={style.scrollView}>
                        <ScrollView>
                            {this.props.UsersList && Object.keys(this.props.UsersList).map((userIndex, index) =>
                                this.renderUsersList(userIndex, index)
                            )}
                        </ScrollView>
                    </View>
                    <View style={style.logoutButton}>
                        <TouchableOpacity onPress={() => this.logOut()}>
                            <Text style={{color: 'red'}}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    } 
}

const style = {
    container : {
        flex: 1
    },
    
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textColor: {
        color: 'lightgreen'
    },

    scrollView: {
        flex: 1,
        paddingLeft: '5%',
        paddingRight: '5%' 
    },

    userItem: {
        backgroundColor: 'white',
        marginTop: '5%',
        flexDirection: 'row'
    },

    content: {
        flexDirection: 'column',
        flex: 4
    },

    funcButton: {
        flex: 1,
        flexDirection: 'column',
    },

    editButton: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    
    deleteButton: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: '10%' 
    },
    
    deleteButton1: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: '15%'
    },

    subItem1: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    subItem2: {
        marginTop: '3%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    logoutButton: {
        height: '7%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '20%',
    },
}


