import React from 'react';
import ProductItem from './ProductItem';
import Loader from './Loader';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            categoryID: 0
        }

        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount() {
        if (this.props.categoryID && this.props.categoryID > 0 && this.props.categoryID !== this.state.categoryID) {
            this.props.getAllActiveProducts(this.props.categoryID).then(() => {
                let items = this.props.products;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ products: items, categoryID: this.props.categoryID });
                        this.props.handler();
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
    }
    componentDidUpdate() {
        if (this.props.categoryID && this.props.categoryID > 0 && this.props.categoryID !== this.state.categoryID) {
            this.props.getAllActiveProducts(this.props.categoryID).then(() => {
                let items = this.props.products;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ products: items, categoryID: this.props.categoryID });
                        this.props.handler();
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
    }
    addToCart(product) {
        this.props.addToCart(product).then(() => {
            window.alert("Додано");
        });
    }
    render() {
        return (
            <div className="list">
                {
                    !this.props.loaded ?
                        <Loader />
                        : null
                }
                {
                    this.state.products.length > 0 ?
                        this.state.products.map((item, key) =>
                            <ProductItem id={key} product={item} addHandle={this.addToCart} />
                        ) :
                        null
                }
            </div>
        );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actions, dispatch)
)(ProductList);