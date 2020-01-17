import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import setAuthorizationToken from "./utilities/setAuthorizationToken";

import "./App.scss";
import Home from "./pages/Home/Home";
import ProductListing from "./pages/productListing";
import Checkout from "./pages/Checkout";
import Header from "./components/Header/Header";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingCart from "./pages/ShopingCart/ShoppingCart";
import Dashboard from "./components/Dashboard/container/Dashboard";
import ProductSearch from "./pages/productSearch";
import NotFoundPage from "./pages/NotFoundPage";

// AUTH COMPONENTS
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// import private route
import PrivateRoute from "./components/commonFeilds/privateRoute";

// IMPORT REDUX STORE
import { store } from "./store";
// import { setCurrentUser } from "./actions/authAction";

// // CHECK FOR TOKEN
// if (localStorage.jwttoken) {
//   // set auth token to header Authorization
//   setAuthorizationToken(localStorage.jwttoken);
//   // decode token and get user info and expression
//   const decoded = jwt_decode(localStorage.jwttoken);
//   // set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded)); // fired the action and set the user into state

//   /////////// MAKE LOGOUT THE USER BASED on expired  tIme
// }

class App extends Component {
	authenticate() {
		return new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds
	}

	componentDidMount() {
		this.authenticate().then(() => {
			const ele = document.getElementById("ipl-progress-indicator");
			if (ele) {
				// fade out
				ele.classList.add("available");
				setTimeout(() => {
					// remove from DOM
					ele.outerHTML = "";
				}, 2000);
			}
		});
	}
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<React.Fragment>
						<Header />
						<Switch>
							<Route exact path={"/"} component={Home} />

							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path={"/products/:id"} component={ProductDetail} />
							<Route exact path={"/productSearch"} component={ProductSearch} />
							<Route
								exact
								path={"/productsListing/:id"}
								component={ProductListing}
							/>
							<PrivateRoute exact path={"/checkout"} component={Checkout} />

							<Route exact path={"/cart"} component={ShoppingCart} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<Route path='*' component={NotFoundPage} />
						</Switch>
					</React.Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
