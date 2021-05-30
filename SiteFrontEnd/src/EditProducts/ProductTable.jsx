import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../Products/actions";
import ProductModal from './ProductModal';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            showEdit: false,
            showAdd: false,
            product: {
                name: "",
                image: "",
                id: 0,
                price: 0,
                weight: 0,
                productContent: "",
                isActive: false,
                productTypeID: 0,
                productType: ""
            },
            newProduct: {
                name: "",
                image: "",
                id: 0,
                price: 0,
                weight: 0,
                productContent: "",
                isActive: false,
                productTypeID: 0,
                productType: ""
            }
        }
        this.addRecord = this.addRecord.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.blockProduct = this.blockProduct.bind(this);
        this.editClick = this.editClick.bind(this);
    }
    componentDidMount() {
        this.props.getAllProducts().then(() => {
            let items = this.props.products;
            if (items.success) {
                items = items.items;
                if (items.length > 0) {
                    this.setState({ products: items });
                }
            }
            else {
                console.log(items.message);
            }
        });
    }
    addRecord() {
        this.setState({
            showEdit: false,
            showAdd: true
        });
    }
    imageChanged(event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.onloadend = () => {
            let result = reader.result;
            let product = null;
            if (this.state.showAdd)
                product = this.state.newProduct;
            if (this.state.showEdit)
                product = this.state.product

            product.image = result;


            if (this.state.showAdd) {
                this.setState({ newCategory: product });
            }
            if (this.state.showEdit) {
                this.setState({ product: product });
            }
        }

        reader.readAsDataURL(file);;
    }
    changeHandler(event) {
        let product = null;
        if (this.state.showAdd) {
            product = this.state.newProduct;
        }
        if (this.state.showEdit) {
            product = this.state.product;
        }

        switch (event.target.name) {
            case "name":
                product.name = event.target.value;
                break;
            case "weight":
                product.weight = (event.target.value);
                break;
            case "productContent":
                product.productContent = event.target.value;
                break;
            case "price":
                product.price = parseInt(event.target.value);
                break;
            case "category":
                product.productTypeID = parseInt(event.target.value);
                break;
        }

        if (this.state.showAdd) {
            this.setState({ newProduct: product });
        }
        if (this.state.showEdit) {
            this.setState({ product: product });
        }
    }
    cancel() {
        let nullproduct = {
            name: "",
            image: "",
            id: 0,
            price: 0,
            weight: 0,
            productContent: "",
            isActive: false,
            productTypeID: 0,
            productType: ""
        }
        this.setState({
            product: nullproduct,
            newCategory: nullproduct,
            showAdd: false,
            showEdit: false
        });
    }
    saveChanges() {
        let nullproduct = {
            name: "",
            image: "",
            id: 0,
            price: 0,
            weight: 0,
            productContent: "",
            isActive: false,
            productTypeID: 0,
            productType: ""
        }
        if (this.state.showAdd) {
            this.props.addProduct(this.state.newCategory).then(() => {
                let items = this.props.products;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ products: items, showAdd: false, newProduct: nullproduct });
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
        if (this.state.showEdit) {
            this.props.saveProduct(this.state.product).then(() => {
                let items = this.props.products;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ products: items, showEdit: false, product: nullproduct });
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
    }
    blockProduct(id) {
        this.props.blockProduct(id).then(() => {
            let items = this.props.products;
            if (items.success) {
                items = items.items;
                if (items.length > 0) {
                    this.setState({ products: items });
                }
            }
            else {
                console.log(items.message);
            }
        });
    }
    editClick(item) {
        this.setState({
            showEdit: true,
            product: item
        });
    }
    render() {
        return (
            <div className="productsTable categoriesTable">
                <div className="title">
                    <h2>
                        Продукти
                    </h2>
                </div>
                {
                    this.state.showAdd ?
                        <ProductModal categories={this.props.categories} imageChanged={this.imageChanged} save={this.saveChanges} isEdit={false} handler={this.changeHandler} cancel={this.cancel} product={this.state.newProduct} />
                        : null
                }
                {
                    this.state.showEdit ?
                        <ProductModal categories={this.props.categories} imageChanged={this.imageChanged} save={this.saveChanges} isEdit={true} handler={this.changeHandler} cancel={this.cancel} product={this.state.product} />
                        : null
                }
                <div className="table">
                    {
                        !this.state.showAdd && !this.state.showEdit ?
                            <button className="btn btn-primary linkButton" onClick={this.addRecord}>
                                Додати
                            </button>
                            : null
                    }
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    ID
                                </td>
                                <td>
                                    Назва продукту
                                </td>
                                <td>
                                    Активний
                                </td>
                                <td>
                                    Вага
                                </td>
                                <td>
                                    Склад
                                </td>
                                <td>
                                    Ціна
                                </td>
                                <td>
                                    Категорія
                                </td>
                                <td>
                                    Блокувати
                                </td>
                                <td>
                                    Змінити
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.length > 0 ?
                                    this.state.products.map((item, key) =>
                                        <tr id={key}>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.isActive ? "Так" : "Ні"}
                                            </td>
                                            <td>
                                                {item.weight}
                                            </td>
                                            <td>
                                                {item.productContent}
                                            </td>
                                            <td>
                                                {item.price} грн
                                            </td>
                                            <td>
                                                {item.productType}
                                            </td>
                                            <td>
                                                <button onClick={() => { this.blockProduct(item.id) }} className="btn btn-primary linkButton">
                                                    Змінити
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => { this.editClick(item) }} className="btn btn-primary linkButton">
                                                    Редагувати
                                                </button>
                                            </td>
                                        </tr>)
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actions, dispatch)
)(ProductTable);