import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import configureStore from "./store/configureStore";
import Header from "./Header & Footer/Header";
import Footer from "./Header & Footer/Footer";
import Home from "./HomePage/Home";
import Login from './Login/Login';
import Registration from './Login/Registration';
import MyPage from './MyPage/MyPage';
import Contact from './Contact/Contact';
import AdminUsers from './Users/AdminUsers';
import Products from './Products/Products';
import EditProduct from "./EditProducts/EditProducts";
import Checkout from './Cart/Checkout';
import MyOrders from './Orders/MyOrders';
import Orders from './Orders/Orders';
import DriverOrders from './Orders/DriverOrders';

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

class MainComponent extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Header />
          <main>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/mypage" component={MyPage} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/allusers" component={AdminUsers} />
              <Route exact path="/products" component={Products} />
              <Route exact path='/editproducts' component={EditProduct} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/myorders' component={MyOrders} />
              <Route exact path='/orders' component={Orders} />
              <Route exact path='/driverorders' component={DriverOrders} />
              <Route exact path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </main>
        </div>
      </Router>
    );
  }
}
function NoMatch({ location }) {
  return (
    <div>
      <h1>HTTP 404 page not found</h1>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainComponent />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);