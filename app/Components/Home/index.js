import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base';
import { Actions, Scene, Router } from 'react-native-router-flux';
const options = ['Regular', 'Manager', 'Admin'];
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    toAuth = (mode) => {
        Actions.Auth({mode: mode});
    }
    
    render() {
        return (
            <View style={style.homeContainer}>
                <View style={style.appTitleContainer}>
                    <Text style={style.appTitle}> Timezone App </Text>
                </View>
                <View style={style.emptyView} />
                <View style={style.buttonContainer}>
                    <Button block onPress={() => this.toAuth('signup')}> 
                        <Text>Sign up</Text>
                    </Button>
                    <Button block onPress={() => this.toAuth('login')}>
                        <Text>Login</Text>
                    </Button>             
                </View>
            </View>
        );
    } 
}

const style = {
    homeContainer : {
        flex: 1, 
        backgroundColor: 'white'
    },

    appTitleContainer: {
        height: '50%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    appTitle: {
        fontSize: 30,
        color: 'green',

    },

    emptyView: {
        height: '30%'
    },

    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        height: '20%'
    }
}
