import React from 'react';
import CategoryItem from './CategoryItem';
import ProductList from './ProductList';
import Loader from './Loader';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../EditProducts/actions";

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategoryID: 0,
            categories: [],
            loaded: false
        }

        this.categoryChoosed = this.categoryChoosed.bind(this);
        this.loadOver = this.loadOver.bind(this);
    }
    componentDidMount() {
        this.props.getAllActiveCategories().then(() => {
            let items = this.props.categories;
            if (items.success) {
                items = items.items;
                if (items.length > 0) {
                    this.setState({ categories: items, loaded: true });
                }
            }
            else {
                console.log(items.message);
            }
        });
    }
    categoryChoosed(category) {
        let elements = document.querySelectorAll(".categoriesLinks");
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
        }
        let element = document.querySelector("#category" + category.id);
        if (element) {
            element.classList.add("active");
        }
        this.setState({ activeCategoryID: category.id, loaded: false });
    }
    loadOver() {
        this.setState({ loaded: true });
    }
    render() {
        return (
            <div className="categoriesList">
                {
                    !this.state.loaded ?
                        <Loader />
                        : null
                }
                <div className="list">
                    {
                        this.state.categories.length > 0 ?
                            this.state.categories.map((item, key) =>
                                <a onClick={() => this.categoryChoosed(item)} id={"category" + item.id} className="categoriesLinks">
                                    <CategoryItem id={key} category={item} />
                                </a>
                            )
                            :
                            null
                    }
                </div>
                { this.state.activeCategoryID > 0 ?
                    <div className="productList">
                        <ProductList categoryID={this.state.activeCategoryID} handler={this.loadOver} loaded={this.state.loaded} />
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default connect(
    state => state.categories,
    dispatch => bindActionCreators(actions, dispatch)
)(CategoriesList);