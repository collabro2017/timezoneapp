import React, {Component} from 'react';
import * as homeActions from '../../actions/home';
import { connect } from 'react-redux';
import AdminScreen from '../../Components/Admin';

export default class Admin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AdminScreen tab = {this.props.tab} />
        );
    }
}


