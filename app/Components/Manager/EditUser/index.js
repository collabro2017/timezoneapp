import React, { Component } from 'react'
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base'
import { Actions, Scene, Router } from 'react-native-router-flux'
import { ActivityIndicator } from 'react-native'

const options = ['Regular', 'Manager', 'Admin']

export default class EditUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userRole: '',
            userIndex: '',
            userEmail: '',
            nameRequired: '',
            roleRequired: '',
            togglechecked : [false, false, false]
        }
    }

    componentWillMount() {
        this.setState({
            userName: this.props.name,
            userRole: this.props.role,
            userIndex: this.props.index,
            userEmail: this.props.email,
        })
        if (this.props.role === 'Regular')
            this.setState({togglechecked: [true, false, false]})
        else  if (this.props.role === 'Manager')
            this.setState({togglechecked: [false, true, false]})
        else
            this.setState({togglechecked: [false, false, true]})
    }

    toggleCheckBox = (index) => {
        var togglechecked = [false, false, false];
        togglechecked[index] = true;
        this.setState({ togglechecked });
    }

    onSave = () => {
        const userName = this.state.userName;
        const userIndex = this.state.userIndex;
        const userEmail = this.state.userEmail;
        let role = '';
        options.map((option, key) => {
            if (this.state.togglechecked[key] === true)
                role = option;
        });
        this.props.SaveUser(userIndex, userName, role, userEmail);
    }

    onNameChange = (userName) => {
        this.setState({userName, nameRequired: false});
    }

    onRoleChange = (userRole) => {
        this.setState({userRole, roleRequired: false});
    }

    render() {
        const isAddingNewUser = this.props.isAddingNewUser;
        return (
            <View style={style.container}>
                <View style={{height: '20%'}} />
                <View style={{flex: 1}}>
                    <View>
                        <Form style={style.form}>
                            <Item floatingLabel>
                                {this.state.nameRequired === true ? 
                                    <Label style={{color: 'red'}}>isRequired</Label> :
                                    <Label>User Name</Label>}
                                <Input 
                                    onChangeText={this.onNameChange}
                                    value={this.state.userName} />
                            </Item>
                        </Form>
                    </View>
                    {this.props.role1 === 'Admin' && 
                        <View style={{marginTop: '5%'}}>
                            <ListItem style={style.listItem}>
                                {options.map((option, index) => {
                                    return (
                                        <View key={index} style={style.checkBox}>
                                            <CheckBox checked={this.state.togglechecked[index]} onPress={() => this.toggleCheckBox(index)}/>
                                            <Body>
                                                <Text onPress={() => this.toggleCheckBox(index)}> {option} </Text>
                                            </Body>
                                        </View>
                                    )
                                })}
                            </ListItem>
                        </View> }   
                    <View style={style.addButton}>
                        {isAddingNewUser === true ? 
                            <ActivityIndicator
                                animating={true}
                                color="#aa00aa"
                                size="large"
                            /> : 
                            <Button block style={{width: '50%'}} onPress={() => this.onSave()}>
                                <Text>Save</Text>
                            </Button>
                        } 
                    </View>
                </View>
                <View style={{height: '20%'}} />
            </View>
        );
    } 
}

const style = {
    container : {
        flex: 1, 
        backgroundColor: 'white'
    },

    addButton: {
        marginTop: '15%',
        height: '45%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    listItem: {
        borderBottomWidth: 0, 
        flexDirection: 'row'
    },

    checkBox: {
        flex: 1, 
        flexDirection: 'row'
    },
}
