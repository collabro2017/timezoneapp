import React, { Component } from 'react'
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base'

import { Actions, Scene, Router } from 'react-native-router-flux'
import { ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import firebase, {firebaseDb} from '../../../data/firebaseconf'
import UserList from '../../Manager/UserList'

const options = ['Regular', 'Manager', 'Admin']

export default class TimezoneListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersflag: true,
            timesflag: false,
            tab: ''
        }
    }

    onSelectTab1 = (tab) => {
        if (tab === 'users') 
            this.setState({tab: 'users'})
        else 
            this.setState({tab: 'times'})
    }
    
    onSelectTab = (tab) => {
        if (tab === 'users') {
            if (this.state.usersflag === false) {
                this.setState({usersflag: true, timesflag: false})
                this.props.onSelectTab(tab)
            }
        }
        if (tab === 'times'){
            if (this.state.timesflag === false) {
                this.setState({usersflag: false, timesflag: true})
                this.props.onSelectTab(tab)
            }   
        }
    }

    onAdd = () => {
        Actions.AddTimezone();
    }

    onEdit = (timezoneIndex, timezoneName, city, diffToGMT) => {
        Actions.EditTimezone({Index: timezoneIndex, timezoneName: timezoneName, city: city, diffToGMT: diffToGMT});
    }

    onDelete = (timezoneIndex) => {
        this.props.deleteTimezoneItem(timezoneIndex);
    }

    logOut = () => {
        this.props.logOut();
    }

    calcTime = (offset) => {
        var d= new Date();
        var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*offset));
        return nd.toLocaleString();
    }

    renderTimezonesList(timezoneIndex, index) {
        let timezoneName = this.props.TimezonesList[timezoneIndex].timezone;
        let city = this.props.TimezonesList[timezoneIndex].city;
        let diffToGMT = this.props.TimezonesList[timezoneIndex].diffToGMT;
        let offset = diffToGMT.slice(3);
        let time = this.calcTime(offset);

        return (
            <View key = {timezoneIndex} style={style.timezoneItem}>
                <View style={style.content}>
                    <View style={style.subItem1}>
                        <Text>{timezoneName}</Text>
                        <Text>{city}</Text>
                        <Text>{diffToGMT}</Text>
                    </View>
                    <View style={style.subItem2}>
                        <Text>{time}</Text>
                    </View>
                </View>
                <View style={style.funcButton}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress = {() => this.onEdit(timezoneIndex, timezoneName, city, diffToGMT)}>
                            <Text style = {style.textColor}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '10%'}}>
                        <TouchableOpacity onPress = {() => this.onDelete(timezoneIndex)}>
                            <Text style = {style.textColor}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        // if (this.state.tab === 'users')
        //     return <UserList />
        // if (this.state.tab === 'times') {
            if (this.props.isFetchingTimezones === true) {
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
                            <Button block  style={{marginTop: '15%'}}onPress={() => this.onAdd()}>
                                <Text>Add New Timezone</Text>
                            </Button>
                        </View>  
                        <View style={style.scrollView}>
                            <ScrollView>
                                {this.props.TimezonesList && Object.keys(this.props.TimezonesList).map((timezoneIndex, index) =>
                                    this.renderTimezonesList(timezoneIndex, index)
                                )}
                            </ScrollView>
                        </View>
                        <View style={style.logoutButton}>
                            <TouchableOpacity onPress={() => this.logOut()}>
                                <Text style={{color: 'red'}}>LogOut</Text>
                            </TouchableOpacity>
                        </View>
                        {/* {this.props.flag === 'time' && 
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
                            </View>} */}
                    </View>
                );
            }
        }
    // } 
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

    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '20%',
    },

    scrollView: {
        flex: 1,
        paddingLeft: '5%',
        paddingRight: '5%' 
    },
   
    timezoneItem: {
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


