import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as regularActions from '../../../actions/regular';
import EditTimezoneScreen from '../../../Components/Regular/EditTimezone'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'

let data = {}

class EditTimezone extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSavedTimezone === true) {
            if (this.props.role === 'Regular') {
                Actions.TimezoneList();
            }
            if (this.props.role === 'Admin') {
                Actions.Admin({tab: 'times'});
            }
        }               
    }

    render() {
        return (
            <EditTimezoneScreen
                SaveTimezone = {this.props.saveTimezone} 
                Index = {this.props.Index}
                timezoneName = {this.props.timezoneName}
                city = {this.props.city}
                diffToGMT = {this.props.diffToGMT}
                email = {this.props.email}
            />
        );
    }

}

const mapStateToProps = (state) => ({
    timezoneIndex: state.regular.timezoneIndex,
    isSavedTimezone: state.regular.isSavedTimezone,
    email: state.auth.email,
    role: state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
   saveTimezone: (timezoneIndex, timezoneName, city, diffToGMT, email) => dispatch(regularActions.saveTimezone(timezoneIndex, timezoneName, city, diffToGMT, email)) 
});

export default connect (mapStateToProps, mapDispatchToProps)(EditTimezone);


