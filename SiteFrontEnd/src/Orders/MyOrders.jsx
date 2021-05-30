import React from 'react'
import logo1 from '../Site files/products-banner.jpg';
import Title from '../general/Title';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";
import MyOrderTable from './MyOrderTable';

class MyOrders extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (!user) {
            window.location.href = '/';
            return;
        }
        this.props.getUserOrders(user.ID).then(() => {
            if (this.props.result.success)
                console.log(this.props.result.items)
            else {
                console.log(this.props.result.message)
            }
        });
    }
    render() {
        return (
            <div className="myorders">
                <Title logo={logo1} title={"Мої замовлення"} />
                {
                    this.props.result
                        && this.props.result.items
                        && this.props.result.items.length > 0 ?
                        <MyOrderTable orders={this.props.result.items} />
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
)(MyOrders);