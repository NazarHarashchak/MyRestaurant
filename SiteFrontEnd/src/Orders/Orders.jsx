import React from 'react'
import logo1 from '../Site files/products-banner.jpg';
import Title from '../general/Title';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";
import OrderTable from './OrderTable';

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCouriers: false,
            orderID: 0,
            driverID: 0
        }

        this.addHandler = this.addHandler.bind(this);
        this.discardHandler = this.discardHandler.bind(this);
    }
    discardHandler(order) {
        this.props.discard(order.id).then(() => {
            if (this.props.result.success)
                console.log(this.props.result.items)
            else {
                console.log(this.props.result.message)
            }
        });
    }
    addHandler(order) {

    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (!user && user.roleID !== 2) {
            window.location.href = '/';
            return;
        }
        this.props.getOrders().then(() => {
            if (this.props.result.success)
                console.log(this.props.result.items)
            else {
                console.log(this.props.result.message)
            }
        });
    }
    render() {
        return (
            <div className="ordersPage">
                <Title logo={logo1} title={"Замовлення"} />
                {
                    this.props.result
                        && this.props.result.items
                        && this.props.result.items.length > 0 ?
                        <OrderTable orders={this.props.result.items} discard={this.discardHandler} add={this.addHandler} />
                        :
                        null
                }
            </div>
        );
    }
}

export default connect(
    state => state.orders,
    dispatch => bindActionCreators(actions, dispatch)
)(Orders);