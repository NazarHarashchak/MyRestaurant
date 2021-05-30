import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

class DriverList extends React.Component {
    render() {
        return (
            <div className="listDrivers">

            </div>
        );
    }
}

export default connect(
    state => state.orders,
    dispatch => bindActionCreators(actions, dispatch)
)(DriverList);