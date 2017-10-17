import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as regularActions from '../../../actions/regular';
import AddTimezoneScreen from '../../../Components/Regular/AddTimezone'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'

class AddTimezone extends Component {
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddedNewTimezone === true) {
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
            <AddTimezoneScreen
                email = {this.props.email}
                AddNewTimezone = {this.props.addNewTimezone} 
                isAddingNewTimezone = {this.props.isAddingNewTimezone} />
        );
    }

}

const mapStateToProps = (state) => ({
    isAddingNewTimezone: state.regular.isAddingNewTimezone,
    isAddedNewTimezone: state.regular.isAddedNewTimezone,
    email: state.auth.email,
    role: state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
   addNewTimezone: (timezoneName, city, diffToGMT, email) => dispatch(regularActions.addNewTimezone(timezoneName, city, diffToGMT, email)),
});

export default connect (mapStateToProps, mapDispatchToProps)(AddTimezone);


