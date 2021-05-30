import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            remember: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.logIn = this.logIn.bind(this);
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (user) {
            window.location.href = "/";
        }
    }
    changeHandler(event) {
        switch (event.target.name) {
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "password":
                this.setState({ password: event.target.value });
                break;
            case "checkbox":
                this.setState({ remember: event.target.value });
                break;
        }
    }
    logIn() {
        if (this.state.email === "" || this.state.password === "") {
            return;
        }
        let body = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(body)
            .then(() => {
                if (this.props.user) {
                    let user = this.props.user;
                    if (user.success) {
                        let item = {
                            ID: user.item.id,
                            email: user.item.email,
                            roleID: user.item.roleID,
                            fullName: user.item.name + user.item.secondName
                        }
                        if (this.state.remember) {
                            localStorage.setItem("AuthentificateUser", JSON.stringify(item));
                        }
                        else {
                            sessionStorage.setItem("AuthentificateUser", JSON.stringify(item));
                        }
                        window.location.href = "/";
                    }
                    else {
                        window.alert(user.message);
                    }
                }
            });
    }
    render() {
        return (
            <div className="loginPage">
                <div className="loginForm">
                    <form onSubmit="javascript:void(0)">
                        <div className="form-group row">
                            <h2>
                                Введіть свої дані
                            </h2>
                        </div>
                        <div class="form-group row">
                            <input type="email" class="form-control" id="inputEmail3" name="email" placeholder="Email" onChange={this.changeHandler} required />
                        </div>
                        <div class="form-group row">
                            <input type="password" class="form-control" id="inputPassword3" name="password" placeholder="Password" onChange={this.changeHandler} required />
                        </div>
                        <div class="form-group row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck1" onChange={this.changeHandler} name="checkbox" />
                                <label class="form-check-label" for="gridCheck1">
                                    Запам'ятати
                                </label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <input type="button" id="registrateBtn" onClick={this.logIn} class="btn btn-primary linkButton" value="Увійти" />
                            <a href="/registration" class="btn btn-primary linkButton">
                                Зараєструватись
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.authentificateUser,
    dispatch => bindActionCreators(actions, dispatch)
)(Login);