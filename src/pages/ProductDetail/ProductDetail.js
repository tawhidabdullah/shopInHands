import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProductDetailComponent from "../../components/ProductDetail/ProductDetail";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseApiURL } from "../../constants/variable";

import {
	getAProductAction,
	addProductReview,
	getProductAction
} from "../../actions/productAction";
import Spinner from "../../components/commonFeilds/Spinner";

import "./ProductDetail.scss";

class ProductDetail extends Component {
	state = {
		clickedAddReview: false,
		product: {},
		productDetailTabs: {
			isReviews: false,
			isDetails: true,
			isMoreInformation: false,
			relatedProducts: []
		},
		isLoading: false
	};

	toggleTabs = tabName => {
		const tempTabs = { ...this.state.productDetailTabs };
		const tbsMap = Object.keys(tempTabs);
		tbsMap.forEach(tb => {
			if (tb === tabName) {
				tempTabs[tb] = true;
			} else tempTabs[tb] = false;
		});
		this.setState({
			...this.state,
			productDetailTabs: {
				...this.state.productDetailTabs,
				...tempTabs
			}
		});
	};

	getProductsAndRelatedProducts = async id => {
		this.setState({
			...this.state,
			isLoading: true
		});

		try {
			const productRes = await axios.get(
				`${baseApiURL}/api/product/detail/${id}`
			);

			const product = productRes.data;

			const relatedProductsRes = await axios.get(
				`${baseApiURL}/api/category/detail/${product.category &&
					product.category[0]._id}`
			);

			const relatedProducts = relatedProductsRes.data.product.slice(0, 5);

			this.setState({
				...this.state,
				product,
				relatedProducts,
				isLoading: false
			});
		} catch (err) {
			this.setState({
				...this.state,
				isLoading: false
			});
		}
	};

	componentDidMount() {
		const productId = this.props.match.params.id;
		this.getProductsAndRelatedProducts(productId);
	}

	onAddRateButtonClick = () => {
		const { isAuthenticate } = this.props.user;
		if (!isAuthenticate) {
			this.props.history.push("/login");
		} else {
			const clickedAddReview = this.state.clickedAddReview;
			this.setState({
				clickedAddReview: !clickedAddReview
			});
		}
	};

	componentDidUpdate(prevProps, prevState) {
		const newId = this.props.match.params.id;
		const prevProductId = prevProps.match.params.id;
		if (prevProductId !== newId) {
			this.setState({
				...this.state,
				product: {}
			});
			this.getProductsAndRelatedProducts(newId);
		}
	}

	render() {
		const { product, isLoading, relatedProducts } = this.state;

		let ProductDetailContent = <Spinner />;
		if (product && Object.keys(product).length > 0 && !isLoading) {
			ProductDetailContent = (
				<>
					<ProductDetailComponent {...this.props} product={product} />
				</>
			);
		} else if (product && !Object.keys(product).length > 0 && !isLoading) {
			ProductDetailContent = <h1>Product Not Found</h1>;
		}

		return (
			(!isLoading && (
				<>
					<div className='singleProduct'>
						<div className='container-fluid singleProduct__container'>
							<div className='row'>
								<div className='col-md-9'>{ProductDetailContent}</div>
								<div className='col-md-3'>
									{(!isLoading &&
										relatedProducts &&
										relatedProducts.length > 0 && (
											<div className='services-sidebar'>
												<div className='small__filterProducts'>
													<div className='small-products-items'>
														{(!isLoading &&
															relatedProducts &&
															relatedProducts.length > 0 &&
															relatedProducts.map(item => {
																return (
																	<div
																		key={item._id}
																		className='small-product-item'
																	>
																		<div
																			className='small-product-item-box-img'
																			onClick={() => {
																				this.props.history.push(
																					`/products/${item._id}`
																				);
																			}}
																		>
																			<img
																				src={`${baseApiURL}${item.image &&
																					item.image[0]}`}
																				className='product photo product-item-photo'
																				alt=''
																			/>
																		</div>
																		<div className='small-product-info'>
																			<h2 className='small-product-title'>
																				{item.name}
																			</h2>
																			<h2 className='small-product-price'>
																				৳{item.offerPrice}
																			</h2>
																			<h2 className='small-product-offerPrice'>
																				৳{item.price}
																			</h2>
																		</div>
																	</div>
																);
															})) ||
															(isLoading && <Spinner />)}

														{!isLoading &&
															relatedProducts &&
															!relatedProducts.length > 0 && (
																<div
																	style={{
																		marginTop: "200px"
																	}}
																>
																	<h2>No Related Product Has Been Found</h2>
																</div>
															)}
													</div>
												</div>
											</div>
										)) ||
										""}
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</>
			)) ||
			(isLoading && <Spinner />)
		);
	}
}

const mapStateToProps = state => {
	return {
		product: state.product,
		user: state.auth
	};
};

export default connect(mapStateToProps, {
	getAProductAction,
	addProductReview,
	getProductAction
})(withRouter(ProductDetail));

/* 




*/
