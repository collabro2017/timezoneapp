import React, {Component} from 'react';
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native'
const options = ['Regular', 'Manager', 'Admin'];

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPass: '',
            loginEmailRequired: false,
            loginPassRequired: false
        }
    }

    logIn = () => {
        const email = this.state.loginEmail;
        const pass = this.state.loginPass;
        if (email === '')
            this.setState({loginEmailRequired: true});
        if (pass === '')
            this.setState({loginPassRequired: true});
        if (email !== '' && pass !== '') {
            this.props.logIn(email, pass)
            this.setState({loginEmail: '', loginPass: ''})
        }
            
    }

    toSignup = () => {
        Actions.Auth({mode: 'signup'})
    }

    onChangeLoginEmail = (loginEmail) => {
        this.setState({loginEmail, loginEmailRequired: false});
    }

    onChangeLoginPass = (loginPass) => {
        this.setState({loginPass, loginPassRequired: false});
    }

    render() {
        return (
            <View style={style.loginContainer}>
                <View style={{height: '15%'}} />
                <View style={{flex: 1}}>
                    <View>
                        <Form style={style.form}>
                            <Item floatingLabel>
                                {this.state.loginEmailRequired === true ? 
                                    <Label style={{color: 'red'}}>isRequired</Label> :
                                    <Label>Email</Label>}
                                <Input 
                                    onChangeText={this.onChangeLoginEmail}
                                    value={this.state.loginEmail} 
                                    keyboardType="email-address" />
                            </Item>
                            <Item floatingLabel>
                                {this.state.loginPassRequired === true ? 
                                    <Label style={{color: 'red'}}>isRequired</Label> :
                                    <Label>Password</Label>}
                                <Input   
                                    password={true}
                                    secureTextEntry={true} 
                                    onChangeText={this.onChangeLoginPass}
                                    value={this.state.loginPass} />
                            </Item>
                        </Form>
                    </View>     
                    <View style={{marginTop: '5%'}}>
                        <View style={style.loginButton}>
                            {this.props.isLoggingIn === true ? 
                                <ActivityIndicator
                                    animating={true}
                                    color="#aa00aa"
                                    size="large"
                                /> : 
                                <Button block style={{width: '50%'}} onPress={() => this.logIn()}>
                                    <Text>Login</Text>
                                </Button>
                            }
                        </View>
                        <View style={style.toSignupContainer}>
                            <View style={style.textButPosition}>
                                <Text>Do not have an account?</Text>
                            </View>
                            <View style={style.textButPosition}>
                                <Button block transparent onPress={this.toSignup}><Text>Sign up</Text></Button>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height: '15%'}} />
            </View>
        )
    }      
}

const style = {
    loginContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    
    form: {
        margin: '10%',
        marginLeft: '3%'
    },


    loginButton: {
        flexDirection: 'row',  
        justifyContent: 'center'
    },

    toSignupContainer: {
        marginTop: '5%', 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },

    textButPosition: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
}