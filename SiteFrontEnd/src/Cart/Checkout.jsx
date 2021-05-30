import React from 'react';
import Title from '../general/Title';
import logo1 from '../Site files/products-banner.jpg';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../Products/actions";
import ProductItem from './ProductItem';
import OrderForm from './OrderForm';
import Payment from './Payment'

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            price: 0,
            paymentType: 1,
            city: "",
            street: "",
            houseNumber: "",
            isPrivate: false,
            appartmentsNumber: 0,
            message: ""
        }

        this.paymentTypeChange = this.paymentTypeChange.bind(this);
        this.productCountChange = this.productCountChange.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
    }
    changeHandler(event) {
        switch (event.target.name) {
            case "city":
                this.setState({ city: event.target.value });
                break;
            case "street":
                this.setState({ street: event.target.value });
                break;
            case "houseNumber":
                this.setState({ houseNumber: event.target.value });
                break;
            case "checkbox":
                this.setState({ isPrivate: event.target.checked });
                break;
            case "appartmentsNumber":
                this.setState({ appartmentsNumber: parseInt(event.target.value) });
                break;
            case "message":
                this.setState({ message: event.target.value });
                break;
        }
    }
    saveOrder() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        let body = {
            products: this.state.products,
            price: parseInt(this.state.price),
            paymentType: parseInt(this.state.paymentType),
            city: this.state.city,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            isPrivate: this.state.isPrivate,
            appartmentsNumber: this.state.appartmentsNumber,
            message: this.state.message,
            customerID: user.ID
        }
        this.props.sendOrder(body).then(() => {
            if (this.props.result) {
                if (this.props.result.success) {
                    window.alert("Замовлення збережено!");
                    window.location.href = "";
                }
                else {
                    console.log(this.props.result.message);
                }
            }
        });
    }
    componentDidMount() {
        this.props.getFromCart().then(() => {
            let newProducts = [];
            for (let i = 0; i < this.props.cartProducts.length; i++) {
                let propsProduct = this.props.cartProducts[i];
                if (this.state.products.indexOf(propsProduct === -1)) {
                    propsProduct.count = 1;
                    propsProduct.defaultPrice = propsProduct.price;
                    newProducts.push(propsProduct);
                }
                else {
                    for (let j = 0; j < newProducts.length; j++) {
                        if (newProducts[j].id == propsProduct.id) {
                            newProducts[j].count += 1;
                            newProducts[j].price = propsProduct.price * newProducts[j].count;
                        }
                    }
                }
            }
            let totalPrice = 0;
            for (let i = 0; i < newProducts.length; i++) {
                totalPrice += newProducts[i].price;
            }
            this.setState({ products: newProducts, price: totalPrice });
        });
    }
    deleteProduct(product) {
        this.props.removeFromCart(product).then(() => {
            let newProducts = [];
            for (let i = 0; i < this.props.cartProducts.length; i++) {
                let propsProduct = this.props.cartProducts[i];
                if (this.state.products.indexOf(propsProduct === -1)) {
                    propsProduct.count = 1;
                    propsProduct.defaultPrice = propsProduct.price;
                    newProducts.push(propsProduct);
                }
                else {
                    for (let j = 0; j < newProducts.length; j++) {
                        if (newProducts[j].id == propsProduct.id) {
                            newProducts[j].count += 1;
                            newProducts[j].price = propsProduct.price * newProducts[j].count;
                        }
                    }
                }
            }

            let totalPrice = 0;
            for (let i = 0; i < newProducts.length; i++) {
                totalPrice += newProducts[i].price;
            }
            this.setState({ products: newProducts, price: totalPrice });
        });
    }
    productCountChange(product, event) {
        let count = event.target.value;
        let myProducts = this.state.products;

        for (let i = 0; i < myProducts.length; i++) {
            if (myProducts[i].id === product.id) {
                myProducts[i].count = count;
                myProducts[i].price = myProducts[i].defaultPrice * count;
            }
        }

        let totalPrice = 0;
        for (let i = 0; i < myProducts.length; i++) {
            totalPrice += myProducts[i].price;
        }

        this.setState({ products: myProducts, price: totalPrice });
    }
    paymentTypeChange(event) {
        this.setState({ paymentType: parseInt(event.target.value) });
    }
    render() {
        return (
            <div className="checkoutForm">
                <Title logo={logo1} title={"Ваше замовлення"} description={""} />
                <div className="page">
                    <div className="productList">
                        {
                            this.state.products.length > 0 ?
                                this.state.products.map((item) =>
                                    <ProductItem product={item} deleteHandler={this.deleteProduct} countHandler={this.productCountChange} />
                                )
                                : null
                        }
                    </div>
                    <h2>
                        Вкажіть адресу доставки
                    </h2>
                    <OrderForm handler={this.changeHandler} save={this.saveOrder} />
                    <Payment price={this.state.price} handler={this.paymentTypeChange} />
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actions, dispatch)
)(Checkout);