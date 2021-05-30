import React from 'react'
import logo from '../Site files/banner-image1.jpg';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "./actions";

let image = "";

class MyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: "",
            secondName: "",
            age: 0,
            phoneNumber: "",
            city: "",
            street: "",
            houseNumber: "",
            isPrivate: false,
            appartmentsNumber: 0,
            image: ""
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (!user) {
            window.location.href = '/';
            return;
        }
        this.props.getUser(user.ID).then(() => {
            var item = this.props.user;
            if (item.success) {
                if (item.item) {
                    var value = item.item;
                    this.setState({
                        id: value.id,
                        name: value.name,
                        secondName: value.secondName,
                        age: value.age,
                        phoneNumber: value.phoneNumber,
                        city: value.city,
                        street: value.street,
                        houseNumber: value.houseNumber,
                        isPrivate: value.isPrivateHouse,
                        appartmentsNumber: value.appartmentsNumber,
                        image: value.image
                    });
                }
            }
            else {
                console.log(item.message);
            }
        });
    }
    changeHandler(event) {
        switch (event.target.name) {
            case "name":
                this.setState({ name: event.target.value });
                break;
            case "secondName":
                this.setState({ secondName: event.target.value });
                break;
            case "age":
                this.setState({ age: event.target.value });
                break;
            case "phoneNumber":
                this.setState({ phoneNumber: event.target.value });
                break;
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
                this.setState({ isPrivate: !this.state.isPrivate });
                break;
            case "appartmentsNumber":
                this.setState({ appartmentsNumber: event.target.value });
                break;
            default: return;
        }
    }
    imageChanged(event) {
        let file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = function () {
            var result = reader.result;
            image = (result);
        }
        reader.readAsDataURL(file);
    }
    saveUser() {
        let body = {
            id: this.state.id,
            name: this.state.name,
            secondName: this.state.secondName,
            age: parseInt(this.state.age ? this.state.age : 0),
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            isPrivateHouse: this.state.isPrivate,
            appartmentsNumber: parseInt(this.state.appartmentsNumber ? this.state.appartmentsNumber : 0),
            image: image === "" ? this.state.image : image
        }
        this.props.saveUser(body).then(() => {
            var item = this.props.user;
            if (item.success) {
                if (item.item) {
                    var value = item.item;
                    this.setState({
                        name: value.name,
                        secondName: value.secondName,
                        age: value.age,
                        phoneNumber: value.phoneNumber,
                        city: value.city,
                        street: value.street,
                        houseNumber: value.houseNumber,
                        isPrivate: value.isPrivateHouse,
                        appartmentsNumber: value.appartmentsNumber,
                        image: value.image
                    });
                }
                window.alert("Дані оновлено!");
            }
            else {
                console.log(item.message);
            }
        });
    }
    render() {
        return (
            <div className="mypage">
                <form>
                    <div className="userImage">
                        <div className="image">
                            <img src={this.state.image} alt="user-image" />
                        </div>
                        <input onChange={this.imageChanged} type="file" accept=".png, .jpg, .jpeg" name="image" placeholder="Завантажити нове фото" />
                    </div>
                    <div className="controls">
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.changeHandler} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="secondName" placeholder="Enter secondname" value={this.state.secondName} onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="number" class="form-control" name="age" placeholder="Enter age" onChange={this.changeHandler} value={this.state.age} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="phoneNumber" placeholder="Enter phonenumber" onChange={this.changeHandler} value={this.state.phoneNumber} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="city" placeholder="Enter city" value={this.state.city} onChange={this.changeHandler} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="street" placeholder="Enter street" value={this.state.street} onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-4">
                                <input type="text" class="form-control" name="houseNumber" placeholder="Enter house number" value={this.state.houseNumber} onChange={this.changeHandler} />
                            </div>
                            <div className="col-sm-4 checkboxrow">
                                <input type="checkbox" class="form-control" id="gridCheck2" name="checkbox" onChange={this.changeHandler} />
                                <label class="form-check-label" for="gridCheck2">Is private house</label>
                            </div>
                            <div className="col-sm-4">
                                <input type="number" class="form-control" name="appartmentsNumber" value={this.state.appartmentsNumber} placeholder="Enter appartments number" onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-12">
                                <input type="button" id="registrateBtn" onClick={this.saveUser} class="btn btn-primary linkButton" value="Зберегти" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    state => state.currentUser,
    dispatch => bindActionCreators(actions, dispatch)
)(MyPage);