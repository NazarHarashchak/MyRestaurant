import React from 'react';
import logo from '../Site files/products-banner.jpg';
import Title from '../general/Title';
import CategoriesTable from './CategoriesTable';
import ProductTable from './ProductTable';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

class EditProduct extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (!user) {
            window.location.href = '/';
        }
        this.props.getAllCategories().then(() => {
            let items = this.props.categories;
            if (items.success) {
                items = items.items;
                if (items.length > 0) {
                    this.setState({ categories: items });
                }
            }
            else {
                console.log(items.message);
            }
        });
    }
    render() {
        return (
            <div className="editProductPage">
                <Title logo={logo} title={"Редагувати меню"} description={""} />
                <CategoriesTable />
                <ProductTable categories={this.state.categories} />
            </div>
        );
    }
}

export default connect(
    state => state.categories,
    dispatch => bindActionCreators(actions, dispatch)
)(EditProduct);