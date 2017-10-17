import React, { Component } from 'react'
import { Container, Content, View, Text, Button, Form, Item, Input, Label, CheckBox, Body, ListItem } from 'native-base'
import { Actions, Scene, Router } from 'react-native-router-flux'
import { ActivityIndicator } from 'react-native'

const options = ['Regular', 'Manager', 'Admin']

export default class EditTimezoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timezoneName: '',
            city: '',
            diffToGMT: '',
            timezoneIndex: '',
            timezoneNameRequired: '',
            cityRequired: '',
            diffToGMTRequired: ''
        }
    }

    componentWillMount() {
        this.setState({
            timezoneName: this.props.timezoneName,
            city: this.props.city,
            diffToGMT: this.props.diffToGMT,
            timezoneIndex: this.props.Index
        })
    }
    onSave = () => {
        const timezoneName = this.state.timezoneName;
        const city = this.state.city;
        const diffToGMT = this.state.diffToGMT;
        const timezoneIndex = this.state.timezoneIndex;
        const email = this.props.email

        if (timezoneName === '')
            this.setState({timezoneNameRequired: true});
        if (city === '')
            this.setState({cityRequired: true});
        if (diffToGMT === '')
            this.setState({diffToGMTRequired: true});
        if (timezoneName !== '' &&  city!== '' && diffToGMT != '') {
            this.props.SaveTimezone(timezoneIndex, timezoneName, city, diffToGMT, email);
            this.setState({timezoneName: '', city: '', diffToGMT: ''});
        }
    }

    onNameChange = (timezoneName) => {
        this.setState({timezoneName, timezoneNameRequired: false});
    }

    onCityChange = (city) => {
        this.setState({city, cityRequired: false});
    }

    ondiffToGMTChange = (diffToGMT) => {
        this.setState({diffToGMT, diffToGMTRequired: false});
    }

    render() {
        const isAddingNewTimezone = this.props.isAddingNewTimezone;
        return (
            <View style={style.container}>
                <View style={{height: '20%'}} />
                <View style={{flex: 1}}>
                    <View>
                        <Form style={style.form}>
                            <Item floatingLabel>
                                {this.state.timezoneNameRequired === true ? 
                                    <Label style={{color: 'red'}}>isRequired</Label> :
                                    <Label>Timezone Name</Label>}
                                <Input 
                                    onChangeText={this.onNameChange}
                                    value={this.state.timezoneName} />
                            </Item>
                            <Item floatingLabel>
                                {this.state.cityRequired === true ? 
                                    <Label style={{color: 'red'}}>isRequired</Label> :
                                    <Label>City</Label>}
                                <Input 
                                    onChangeText={this.onCityChange}
                                    value={this.state.city} />
                            </Item>
                            <Item floatingLabel>
                                {this.state.diffToGMTRequired === true ? 
                                    <Label style={{color: 'red'}}>isRequired</Label> :
                                    <Label>Timezone&nbsp;&nbsp;&nbsp;(GMT)</Label>}
                                <Input 
                                    onChangeText={this.ondiffToGMTChange}
                                    value={this.state.diffToGMT} />
                            </Item>
                        </Form>
                    </View>     
                    <View style={style.addButton}>
                        {isAddingNewTimezone === true ? 
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
    }
}
