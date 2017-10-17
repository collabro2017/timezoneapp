import React, { Component } from 'react'
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base'
import { Actions, Scene, Router } from 'react-native-router-flux'
import { ActivityIndicator } from 'react-native'

const options = ['Regular', 'Manager', 'Admin']

export default class AddUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userPass: '',
            userPass1: '',
            nameRequired: false,
            passRequired: false,
            pass1Required: false,
            emailRequired: false,
            togglechecked : [true, false, false],
            passNotMatch: false
        }
    }

    Add = () => {
        const name = this.state.userName;
        const email = this.state.userEmail;
        const pass = this.state.userPass;
        const pass1 = this.state.userPass1;
        let role = '';
        if (name === '') {
            this.setState({nameRequired: true});
        }
        if (email === '')
            this.setState({emailRequired: true});
        if (pass === '')
            this.setState({passRequired: true});
        if (pass1 === '')
            this.setState({pass1Required: true});
        if (pass !== pass1) {
            this.setState({passNotMatch: true});
        }
        else
            this.setState({passNotMatch: false});
        options.map((option, key) => {
            if (this.state.togglechecked[key] === true)
                role = option;
        });
        
        if (name !== '' && email !== '' && pass !== '' && pass1 !== '' && pass === pass1) {
            this.props.AddNewUser(email, pass, name, role, 'abnormal');
            this.setState({userName: '', userEmail: '', userPass: '', userPass1: ''});
        }
            
    }

    toggleCheckBox = (index) => {
        var togglechecked = [false, false, false];
        togglechecked[index] = true;
        this.setState({ togglechecked });
    }

    onChangeName = (userName) => {
        this.setState({userName, nameRequired: false});
    }

    onChangeEmail = (userEmail) => {
        this.setState({userEmail, emailRequired: false});
    }

    onChangePass = (userPass) => {
        this.setState({userPass, passRequired: false});
    }

    onChangePass1 = (userPass1) => {
        this.setState({userPass1, pass1Required: false});  
    }

    render() {
        const isAddingNewUser = this.props.isAddingNewUser;
        return (
            <Container style={style.addnewContainer}>
            <Content>
                <Form style={style.form}>
                    <Item floatingLabel>
                        {this.state.nameRequired === true ? 
                            <Label style={{color: 'red'}}>isRequired</Label> : 
                            <Label>First and last name</Label> }
                        <Input 
                            onChangeText={this.onChangeName}
                            value={this.state.userName} />
                    </Item>
                    <Item floatingLabel>
                        {this.state.emailRequired === true ? 
                            <Label style={{color: 'red'}}>isRequired</Label> :
                            <Label>Email</Label>}
                        <Input  
                            onChangeText={this.onChangeEmail}
                            value={this.state.userEmail} 
                            keyboardType="email-address" />
                    </Item>
                    <Item floatingLabel>
                        {this.state.passRequired=== true ? 
                            <Label style={{color: 'red'}}>isRequired</Label> : 
                            <Label>Password</Label> }
                        <Input  
                            password={true}
                            secureTextEntry={true} 
                            onChangeText={this.onChangePass}
                            value={this.state.userPass} />
                    </Item>
                    <Item floatingLabel>
                        {this.state.pass1Required === true &&  
                            <Label style={{color: 'red'}}>isRequired</Label>}
                        {this.state.pass1Required === false && this.state.passNotMatch === true &&   
                            <Label style={{color: 'red'}}>Not Matched</Label>}   
                        {this.state.pass1Required === false && this.state.passNotMatch === false && 
                            <Label>Reenter password</Label> }    
                        <Input  
                            password={true}
                            secureTextEntry={true}
                            onChangeText={this.onChangePass1}
                            value={this.state.userPass1} />
                    </Item>
                </Form>
                <View style={{marginTop: '5%'}}>
                    <ListItem style={style.listItem}>
                        {this.props.role === 'Manager' && options.map((option, index) => {
                            return (
                                <View key={index} style={style.checkBox}>
                                    <CheckBox checked={this.state.togglechecked[index]} />
                                    <Body>
                                        <Text>{option}</Text>
                                    </Body>
                                </View>
                            )
                        })}
                        {this.props.role === 'Admin' && options.map((option, index) => {
                            return (
                                <View key={index} style={style.checkBox}>
                                    <CheckBox checked={this.state.togglechecked[index]} onPress={() => this.toggleCheckBox(index)} />
                                    <Body>
                                        <Text onPress={() => this.toggleCheckBox(index)}>{option}</Text>
                                    </Body>
                                </View>
                            )
                        })}
                    </ListItem>
                    <View style={style.addButton}>
                        {isAddingNewUser === true ?
                            <ActivityIndicator
                                animating={true}
                                color="#aa00aa"
                                size="large"
                            /> : 
                            <Button block style={{width: '50%'}} onPress={() => this.Add()}>
                                <Text>Add</Text>
                            </Button>
                        }
                    </View>
                </View>
            </Content>
        </Container>
        );
    } 
}

const style = {
    container : {
        flex: 1, 
        backgroundColor: 'white'
    },

    addnewContainer : {
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

    listItem: {
        borderBottomWidth: 0, 
        flexDirection: 'row'
    },

    checkBox: {
        flex: 1, 
        flexDirection: 'row'
    },

    addButton: {
        flexDirection: 'row', 
        marginTop: '5%', 
        justifyContent: 'center'
    },
}
