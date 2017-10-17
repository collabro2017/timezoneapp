import React, {Component} from 'react';
import * as homeActions from '../../actions/home';
import { connect } from 'react-redux';
import HomeScreen from '../../Components/Home';

class Home extends Component {

    render() {
        return (
            <HomeScreen changeMode={this.changeMode}/>
        );
    }

    changeMode = (mode) => {
        this.props.changeMode(mode);
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(homeActions.changeMode(mode))
});

export default connect (null, mapDispatchToProps)(Home);

