import React from 'react';
import CategoryModal from './CategoryModal';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

class CategoriesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            showEdit: false,
            showAdd: false,
            category: {
                name: "",
                image: ""
            },
            newCategory: {
                name: null,
                image: null
            }
        }
        this.addRecord = this.addRecord.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.blockCategory = this.blockCategory.bind(this);
        this.editClick = this.editClick.bind(this);
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
            let category = null;
            if (this.state.showAdd)
                category = this.state.newCategory;
            if (this.state.showEdit)
                category = this.state.category

            category.image = result;


            if (this.state.showAdd) {
                this.setState({ newCategory: category });
            }
            if (this.state.showEdit) {
                this.setState({ category: category });
            }
        }

        reader.readAsDataURL(file);;
    }
    changeHandler(event) {
        let category = null;
        if (this.state.showAdd) {
            category = this.state.newCategory;
        }
        if (this.state.showEdit) {
            category = this.state.category;
        }

        category.name = event.target.value;

        if (this.state.showAdd) {
            this.setState({ newCategory: category });
        }
        if (this.state.showEdit) {
            this.setState({ category: category });
        }
    }
    cancel() {
        let nullCategory = {
            name: null,
            image: null
        }
        this.setState({
            category: nullCategory,
            newCategory: nullCategory,
            showAdd: false,
            showEdit: false
        });
    }
    saveChanges() {
        let nullCategory = {
            name: null,
            image: null
        }
        if (this.state.showAdd) {
            this.props.addCategory(this.state.newCategory).then(() => {
                let items = this.props.categories;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ categories: items, showAdd: false, newCategory: nullCategory });
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
        if (this.state.showEdit) {
            this.props.saveCategory(this.state.category).then(() => {
                let items = this.props.categories;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ categories: items, showEdit: false, category: nullCategory });
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
    }
    blockCategory(id) {
        this.props.blockCategory(id).then(() => {
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
    editClick(item) {
        this.setState({
            showEdit: true,
            category: item
        });
    }
    render() {
        return (
            <div className="categoriesTable">
                <div className="title">
                    <h2>
                        Категорії
                    </h2>
                </div>
                {
                    this.state.showAdd ?
                        <CategoryModal imageChanged={this.imageChanged} save={this.saveChanges} isEdit={false} handler={this.changeHandler} cancel={this.cancel} category={this.state.newCategory} />
                        : null
                }
                {
                    this.state.showEdit ?
                        <CategoryModal imageChanged={this.imageChanged} save={this.saveChanges} isEdit={true} handler={this.changeHandler} cancel={this.cancel} category={this.state.category} />
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
                                    Назва категоріїї
                                </td>
                                <td>
                                    Активна
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
                                this.state.categories.length > 0 ?
                                    this.state.categories.map((item, key) =>
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
                                                <button onClick={() => { this.blockCategory(item.id) }} className="btn btn-primary linkButton">
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
    state => state.categories,
    dispatch => bindActionCreators(actions, dispatch)
)(CategoriesTable);