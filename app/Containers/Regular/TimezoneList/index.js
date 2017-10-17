import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as regularActions from '../../../actions/regular';
import * as authActions from '../../../actions/auth';
import TimezoneListScreen from '../../../Components/Regular/TimezoneList'
import {Actions, Scene, Router} from 'react-native-router-flux'
import { ActivityIndicator, View } from 'react-native'

class TimezoneList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TimezonesList : {},
        }
    }
    
    componentWillMount(){
        this.setState({TimezonesList : this.props.TimezonesList})
    }
    componentWillReceiveProps(nextProps){
        if (this.props.TimezonesList != nextProps.TimezonesList){
            this.setState({TimezonesList: nextProps.TimezonesList});
        }
    }
    
    deleteTimezoneItem = (timezoneIndex) => {
        let _timezoneList = this.state.TimezonesList;
        this.props.deleteTimezone(timezoneIndex);
        delete _timezoneList[timezoneIndex];
        this.setState({TimezonesList : _timezoneList});
    }

    logOut = () => {
       this.props.logOut();
       Actions.Auth('login');
    }

    render() {
        return (
            <TimezoneListScreen
                logOut = {this.logOut}
                TimezonesList = {this.state.TimezonesList}
                deleteTimezone = {this.props.deleteTimezone}
                deleteTimezoneItem = {this.deleteTimezoneItem}
                isFetchingTimezones = {this.props.isFetchingTimezones} 
            />
        );
    }

}

const mapStateToProps = (state) => ({
    TimezonesList: state.regular.TimezonesList,
    isFetchingTimezones: state.regular.isFetchingTimezones,
    loggedIn: state.auth.loggedIn,
})

const mapDispatchToProps = (dispatch) => ({
    deleteTimezone: (timezoneIndex) => dispatch(regularActions.deleteTimezone(timezoneIndex)),
    logOut: () => dispatch(authActions.logOut())
});
export default connect (mapStateToProps, mapDispatchToProps)(TimezoneList);


