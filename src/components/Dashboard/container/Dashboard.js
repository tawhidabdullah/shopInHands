import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import GifSpinner from '../../Spinner/GifSpinner/GifSpinner';
import "../../../stylesSheets/main.scss";
import Order from "../components/Order";

const Dashboard = props => {
	const [tabs, settabs] = React.useState({
		isOrders: true,
		isCart: false,
		isWishList: false,
		Settings: false
	});

	const toggleTabs = tabName => {
		const tempTabs = { ...tabs };
		const tbsMap = Object.keys(tempTabs);
		tbsMap.forEach(tb => {
			if (tb === tabName) {
				tempTabs[tb] = true;
			} else tempTabs[tb] = false;
		});
		settabs({ ...tabs, ...tempTabs });
	};

	// React.useLayoutEffect(() => {
	//   if (!isAuthenticated) {
	//     if (!localStorage['c-access-token']) {
	//       props.history.push('/signin');
	//     }
	//     if (
	//       (localStorage['c-access-token'] && isAuthenticated) ||
	// isAuthenticated => !
	//     ) {
	//       props.getCurrentUser();
	//     }
	//   }
	// }, []);

	// React.useLayoutEffect(() => {
	//   if ((localStorage['c-access-token'] && !isError) || isError) {
	//     props.getAPIKeyDetail();
	//     props.getAPIKey();
	//   }
	// }, []);

	// React.useLayoutEffect(() => {
	//   if (isError && !isAuthenticated) {
	//     props.history.push('/signin');
	//   }
	// }, [isError]);

	return (
		<>
			<div className='container__of-dashboard'>
				<div className='content'>
					<nav className='sidebar'>
						<ul className='side-nav'>
							<li
								className={
									tabs.isOrders
										? "side-nav__item side-nav__item--active"
										: " side-nav__item"
								}
								onClick={() => toggleTabs("isOrders")}
							>
								<a href='##' className='side-nav__link'>
									<i className='fa fa-first-order'></i>
									<span className='side-nav__text'>Orders</span>
								</a>
							</li>
							{/* <li
                  className={
                    tabs.isCart
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isCart')}
                >
                  <a href="#" className="side-nav__link">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="side-nav__text">Cart</span>
                  </a>
                </li> */}
							{/* <li
                  className={
                    tabs.isWishlist
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isWishlist')}
                >
                  <a href="#" className="side-nav__link">
                    <i className="fa fa-heart"></i>
                    <span className="side-nav__text">Wishlist</span>
                  </a>
                </li> */}

							{/* <li
                  className={
                    tabs.isSettings
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isSettings')}
                >
                  <a href="#" className="side-nav__link">
                    <i className="fa fa-cog"></i>
                    <span className="side-nav__text">Settings</span>
                  </a>
                </li> */}
						</ul>
					</nav>
					<main className='dashboard__main-content'>
						{tabs.isOrders ? <Order /> : ""}
					</main>
				</div>
			</div>
		</>
	);
};

const mapStateToProp = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProp, {})(withRouter(Dashboard));
