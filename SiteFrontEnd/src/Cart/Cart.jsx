import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../Products/actions";

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getFromCart();
    }
    render() {
        return (
            <div className="cart">
                <div className="count">
                    <i className="fa fa-shopping-cart"></i>
                    <div className="count">
                        {this.props.cartProducts ? this.props.cartProducts.length : 0}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actions, dispatch)
)(Cart);