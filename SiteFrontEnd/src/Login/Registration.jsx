import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: ""
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
        this.sendValues = this.sendValues.bind(this);
    }
    validatePasswords() {
        let valid = false;
        if (this.state.password.length >= 10) {
            document.querySelector("#inputPassword6 + .invalid-feedback").setAttribute("style", "display: none;");
            document.querySelector("#inputPassword6").classList.add("is-valid");
            document.querySelector("#inputPassword6").classList.remove("is-invalid");
            valid = true;
        }
        else {
            document.querySelector("#inputPassword6 + .invalid-feedback").setAttribute("style", "display: block;");
            document.querySelector("#inputPassword6").classList.remove("is-valid");
            document.querySelector("#inputPassword6").classList.add("is-invalid");
            valid = false;
        }
        if (this.state.password !== "") {
            if (this.state.password === this.state.password2) {
                document.querySelector("#inputPassword5 + .invalid-feedback").setAttribute("style", "display: none;");
                valid = true;
            }
            else {
                document.querySelector("#inputPassword5 + .invalid-feedback").setAttribute("style", "display: block;");
                valid = false;
            }
        }
        return valid;
    }
    changeHandler(event) {
        switch (event.target.name) {
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "password":
                this.setState({ password: event.target.value });
                break;
            case "password2":
                this.setState({ password2: event.target.value });
                break;
        }

        this.validatePasswords();
    }
    sendValues() {
        if (this.state.email === ""
            || this.state.password === ""
            || this.state.password2 === ""
            || !this.validatePasswords()) {
            window.alert("Вам потрібно заповнити всі поля!");
            return;
        }
        else {
            let body = {
                email: this.state.email,
                password: this.state.password
            }

            this.props.registrateUser(body)
                .then(() => {
                    if (this.props.user) {
                        let user = this.props.user;
                        if (user.success) {
                            window.alert("Користувача збережено");
                            let item = {
                                id: user.item.id,
                                email: user.item.email,
                                roleID: user.item.roleID,
                                fullName: user.item.fullName
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
    }

    render() {
        return (
            <div className="loginPage">
                <div className="loginForm">
                    <form onSubmit="javascript:void(0)">
                        <div class="form-group row">
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={this.changeHandler} name="email" required />
                        </div>
                        <div class="form-group row">
                            <input type="password" class="form-control is-invalid" id="inputPassword6" placeholder="Password" name="password" onChange={this.changeHandler} required />
                            <div class="invalid-feedback">
                                Кількість символів мє бути більшою за 10
                            </div>
                        </div>
                        <div class="form-group row">
                            <input type="password" class="form-control is-invalid" id="inputPassword5" placeholder="Repeat Password" name="password2" onChange={this.changeHandler} required />
                            <div class="invalid-feedback">
                                Паролі не збігаються
                            </div>
                        </div>
                        <div class="form-group row">
                            <input type="button" id="registrateBtn" onClick={this.sendValues} class="btn btn-primary linkButton" value="Зареєструватись" />
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
)(Registration);