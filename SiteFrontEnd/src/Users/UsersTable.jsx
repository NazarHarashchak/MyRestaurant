import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";
import UserModal from './UserModal';

class UsersTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            user: {
                age: null,
                appartmentsNumber: null,
                city: null,
                email: null,
                houseNumber: null,
                id: null,
                isPrivateHouse: null,
                name: null,
                phoneNumber: null,
                roleID: null,
                secondName: null,
                street: null,
                userRole: null
            },
            newUser: {
                age: null,
                appartmentsNumber: null,
                city: null,
                email: null,
                password: null,
                houseNumber: null,
                isPrivateHouse: null,
                name: null,
                phoneNumber: null,
                roleID: null,
                secondName: null,
                street: null,
                userRole: null
            },
            showEdit: false,
            showAdd: false
        }

        this.editUser = this.editUser.bind(this);
        this.blockUser = this.blockUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        this.props.getAllUsers(user.ID).then(() => {
            let items = this.props.users;
            if (items.success) {
                items = items.items;
                if (items.length > 0) {
                    this.setState({ users: items });
                }
            }
            else {
                console.log(items.message);
            }
        });
    }
    editUser(userID) {
        let filteredUser = this.state.users.find(item => item.id === userID);
        this.setState({ user: filteredUser, showEdit: true });
    }
    blockUser(userID) {
        this.props.blockUser(parseInt(userID)).then(() => {
            let items = this.props.users;
            if (items.success) {
                items = items.items;
                if (items.length > 0) {
                    this.setState({ users: items });
                }
            }
            else {
                console.log(items.message);
            }
        });
    }
    addUser() {
        this.setState({ showEdit: false, showAdd: true });
    }
    changeHandler(event) {
        let user = null;
        if (this.state.showAdd) {
            user = this.state.newUser;
        }
        if (this.state.showEdit) {
            user = this.state.user;
        }
        switch (event.target.name) {
            case "name":
                user.name = event.target.value;
                break;
            case "secondName":
                user.secondName = event.target.value;
                break;
            case "age":
                user.age = parseInt(event.target.value);
                break;
            case "phoneNumber":
                user.phoneNumber = event.target.value;
                break;
            case "city":
                user.city = event.target.value;
                break;
            case "street":
                user.street = event.target.value;
                break;
            case "houseNumber":
                user.houseNumber = event.target.value;
                break;
            case "appartmentsNumber":
                user.appartmentsNumber = parseInt(event.target.value);
                break;
            case "checkbox":
                user.isPrivateHouse = event.target.checked;
                break;
            case "select":
                user.roleID = parseInt(event.target.value);
                break;
            case "email":
                user.email = event.target.value;
                break;
            case "password":
                user.password = event.target.value;
                break;
            default:
                return;
        }

        if (this.state.showAdd) {
            this.setState({ newUser: user });
        }
        if (this.state.showEdit) {
            this.setState({ user: user });
        }
    }
    saveChanges() {
        if (this.state.showEdit) {
            this.props.saveUser(this.state.user).then(() => {
                let items = this.props.users;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ users: items, showEdit: false });
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
        if (this.state.showAdd) {
            let body = this.state.newUser;
            if (!body.appartmentsNumber) {
                body.appartmentsNumber = 0;
            }
            if (!body.age) {
                body.age = 0;
            }
            if (!body.isPrivateHouse) {
                body.isPrivateHouse = false;
            }
            if (!body.roleID) {
                body.roleID = 1;
            }
            this.props.addUser(body).then(() => {
                let items = this.props.users;
                if (items.success) {
                    items = items.items;
                    if (items.length > 0) {
                        this.setState({ users: items, showEdit: false });
                    }
                }
                else {
                    console.log(items.message);
                }
            });
        }
    }
    cancelChanges() {
        this.setState({
            showAdd: false,
            showEdit: false,
            newUser: null,
            user: null
        });
    }
    render() {
        return (
            <div className="usersTable">
                {
                    this.state.showEdit ?
                        <UserModal cancelHandler={this.cancelChanges} saveHandler={this.saveChanges} handler={this.changeHandler} isEdit={true} user={this.state.user} />
                        : null
                }
                {
                    this.state.showAdd ?
                        <UserModal cancelHandler={this.cancelChanges} saveHandler={this.saveChanges} handler={this.changeHandler} isEdit={false} user={this.state.newUser} />
                        : null
                }
                {
                    this.state.showAdd || this.state.showEdit ?
                        null :
                        <button className="btn btn-primary linkButton" onClick={this.addUser}>
                            Add user
                </button>
                }
                <div className="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    ID
                            </td>
                                <td>
                                    Is Active
                            </td>
                                <td>
                                    Name
                            </td>
                                <td>
                                    Second Name
                            </td>
                                <td>
                                    Email
                            </td>
                                <td>
                                    Phone number
                            </td>
                                <td>
                                    Age
                            </td>
                                <td>
                                    Role
                            </td>
                                <td>
                                    Block
                            </td>
                                <td>
                                    Edit
                            </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.length > 0 ?
                                    this.state.users.map((item) =>
                                        <tr>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                {item.isActive ? "Yes" : "No"}
                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.secondName}
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td>
                                                {item.phoneNumber}
                                            </td>
                                            <td>
                                                {item.age}
                                            </td>
                                            <td>
                                                {item.userRole}
                                            </td>
                                            <td>
                                                {item.isActive ?
                                                    <button onClick={() => { this.blockUser(item.id) }}>
                                                        Block
                                                    </button>
                                                    :

                                                    <button onClick={() => { this.blockUser(item.id) }}>
                                                        Unblock
                                                    </button>
                                                }
                                            </td>
                                            <td>
                                                <button onClick={() => { this.editUser(item.id) }}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.adminUsers,
    dispatch => bindActionCreators(actions, dispatch)
)(UsersTable);