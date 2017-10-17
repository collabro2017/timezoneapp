import React, {Component} from 'react';
import {Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
const options = ['Regular', 'Manager', 'Admin'];

export default class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupName: '',
            signupEmail: '',
            userPass1: '',
            userPass2: '',
            togglechecked : [true, false, false],
            signupNameRequired: false,
            signupEmailRequired: false,
            userPass1Required: false,
            userPass2Required: false,
            signupEmailInvalid: false,
            passNotMatch: false, 
        }
    }

    signUp = () => {
        const name = this.state.signupName;
        const email = this.state.signupEmail;
        const pass1 = this.state.userPass1;
        const pass2 = this.state.userPass2;
        let role = '';
        if (name === '') {
            this.setState({signupNameRequired: true});
        }
        if (email === '')
            this.setState({signupEmailRequired: true});
        if (pass1 === '')
            this.setState({userPass1Required: true});
        if (pass2 === '')
            this.setState({userPass2Required: true});
        if (pass1 !== pass2) {
            this.setState({passNotMatch: true});
        }
        else
            this.setState({passNotMatch: false});
        options.map((option, key) => {
            if (this.state.togglechecked[key] === true)
                role = option;
        });
        
        if (name !== '' && email !== '' && pass1 !== '' && pass2 !== '' && pass1 === pass2) {
            this.props.signUp(email, pass1, name, role, 'normal');
            this.setState({signupName: '', signupEmail: '', userPass1: '', userPass2: ''});
        }
            
    }

    toLogin = () => {
        Actions.Auth({mode: 'login'})
    }

    toggleCheckBox = (index) => {
        var togglechecked = [false, false, false];
        togglechecked[index] = true;
        this.setState({ togglechecked });
    }

    onChangeSignupName = (signupName) => {
        this.setState({signupName, signupNameRequired: false});
    }

    onChangeSignupEmail = (signupEmail) => {
        this.setState({signupEmail, signupEmailRequired: false});
    }

    onChangeUserpass1 = (userPass1) => {
        this.setState({userPass1, userPass1Required: false});
    }

    onChangeUserpass2 = (userPass2) => {
        this.setState({userPass2, userPass2Required: false});  
    }

    render() {
        return (
            <Container style={style.signupContainer}>
                <Content>
                    <Form style={style.form}>
                        <Item floatingLabel>
                            {this.state.signupNameRequired === true ? 
                                <Label style={{color: 'red'}}>isRequired</Label> : 
                                <Label>First and last names</Label> }
                            <Input 
                                onChangeText={this.onChangeSignupName}
                                value={this.state.signupName} />
                        </Item>
                        <Item floatingLabel>
                            {this.state.signupEmailRequired === true ? 
                                <Label style={{color: 'red'}}>isRequired</Label> :
                                <Label>Email</Label>}
                            <Input  
                                onChangeText={this.onChangeSignupEmail}
                                value={this.state.signupEmail} 
                                keyboardType="email-address" />
                        </Item>
                        <Item floatingLabel>
                            {this.state.userPass1Required=== true ? 
                                <Label style={{color: 'red'}}>isRequired</Label> : 
                                <Label>Password</Label> }
                            <Input  
                                password={true}
                                secureTextEntry={true} 
                                onChangeText={this.onChangeUserpass1}
                                value={this.state.userPass1} />
                        </Item>
                        <Item floatingLabel>
                            {this.state.userPass2Required === true &&  
                                <Label style={{color: 'red'}}>isRequired</Label>}
                            {this.state.userPass2Required === false && this.state.passNotMatch === true &&   
                                <Label style={{color: 'red'}}>Not Matched</Label>}   
                            {this.state.userPass2Required === false && this.state.passNotMatch === false && 
                                <Label>Reenter password</Label> }    
                            <Input  
                                password={true}
                                secureTextEntry={true}
                                onChangeText={this.onChangeUserpass2}
                                value={this.state.userPass2} />
                        </Item>
                    </Form>
                    <View style={{marginTop: '5%'}}>
                        <ListItem style={style.listItem}>
                            {options.map((option, index) => {
                                return (
                                    <View key={index} style={style.checkBox}>
                                        <CheckBox checked={this.state.togglechecked[index]} onPress={() => this.toggleCheckBox(index)} />
                                        <Body>
                                            <Text onPress={() => this.toggleCheckBox(index)}> {option} </Text>
                                        </Body>
                                    </View>
                                )
                            })}
                        </ListItem>
                        <View style={style.signupButton}>
                            {this.props.isSigningUp === true ?
                                <ActivityIndicator
                                    animating={true}
                                    color="#aa00aa"
                                    size="large"
                                /> : 
                                <Button block style={{width: '50%'}} onPress={this.signUp}>
                                    <Text>Sign up</Text>
                                </Button>
                            }
                        </View>
                        <View style={style.toLoginContainer}>
                            <View style={style.textButPosition}>
                                <Text>Already have an account?</Text>
                            </View>
                            <View style={style.textButPosition}>
                                <Button block transparent onPress={this.toLogin}><Text>Login</Text></Button>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }        
}

const style = {
    signupContainer : {
        backgroundColor: 'white'
    },

    form: {
        margin: '10%',
        marginLeft: '3%'
    },

    listItem: {
        borderBottomWidth: 0, 
        flexDirection: 'row'
    },

    checkBox: {
        flex: 1, 
        flexDirection: 'row'
    },

    textButPosition: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    listItem: {
        borderBottomWidth: 0, 
        flexDirection: 'row'
    },

    checkBox: {
        flex: 1, 
        flexDirection: 'row'
    },

    signupButton: {
        flexDirection: 'row', 
        marginTop: '5%', 
        justifyContent: 'center'
    },

    toLoginContainer: {
        marginTop: '5%', 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },

}
