import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../../components/Product/Product';
import './ProductList.scss';

import { brandFilter } from '../../pipes/brandFilter';
import { orderByFilter } from '../../pipes/orderByFilter';
import LayoutMode from '../../components/LayoutMode/LayoutMode';
import { paginationPipe } from '../../pipes/paginationFilter';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/commonFeilds/Spinner';

class ProductList extends Component {
  state = {
    colValue: 'col-lg-4',
    perPage: 12,
    currentPage: 1,
    pagesToShow: 3,
    gridValue: 3,
    searchInput: ''
  };

  changeLayout = n => {
    this.setState({ gridValue: n });

    let realGridValue;

    if (n === 4) {
      realGridValue = 3;
    } else {
      realGridValue = 4;
    }

    this.setState({
      colValue: `col-lg-${realGridValue}`
    });
  };

  onPrev = () => {
    const updatedState = { ...this.state };
    updatedState.currentPage = this.state.currentPage - 1;
    this.setState(updatedState);
  };

  onNext = () => {
    this.setState({
      ...this.state,
      currentPage: this.state.currentPage + 1
    });
  };

  goPage = n => {
    this.setState({
      ...this.state,
      currentPage: n
    });
  };

  onSearchInputChange = e => {
    this.setState({
      searchInput: e.target.value.substr(0, 20)
    });
  };

  render() {
    let isActive = this.state.colValue[this.state.colValue.length - 1];

    let contents;

    if (!this.props.products) {
      contents = <Spinner />;
    } else {
      let fileterProductContents = this.props.products.filter(
        product => product.title.indexOf(this.state.searchInput) !== -1
      );
      if (fileterProductContents.length > 0) {
        contents = paginationPipe(fileterProductContents, this.state).map(
          product => {
            let classes = `${this.state.colValue} col-md-6 mb-3`;
            return (
              <div className={classes}>
                <Product key={product._id} product={product} />
              </div>
            );
          }
        );
      } else if (fileterProductContents.length === 0) {
        contents = (
          <div class="error-page">
            <div>
              <h1 data-h1="404">404</h1>
              <p data-p="PRODUCT NOT FOUND">PRODUCT NOT FOUND</p>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="col-lg-9">
        <div className="row mb-3">
          <div className="col-12 d-none d-lg-block d-xl-block">
            <div
              className="card"
              style={{
                backgroundColor: '#fb5555',
                color: 'whitesmoke'
              }}
            >
              <div className="card-header d-flex justify-content-end">
                <div id="styleProductSearchBar">
                  <div className="header-wrap">
                    <div className="search">
                      <input
                        onChange={this.onSearchInputChange}
                        value={this.state.searchInput}
                        type="text"
                        className="searchTerm searchTerm__white"
                        placeholder="Search products here.."
                      />
                      <button
                        type="submit"
                        className="searchButton searchButton__white"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <span className="mr-3" />
                <LayoutMode
                  len={3}
                  isActive={this.state.gridValue === 3}
                  click={this.changeLayout}
                />
                <LayoutMode
                  len={4}
                  isActive={this.state.gridValue === 4}
                  click={this.changeLayout}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row reduce-pad">{contents}</div>
        <div className="d-flex justify-content-end">
          <Pagination
            totalItemsCount={this.props.products.length}
            currentPage={this.state.currentPage}
            perPage={this.state.perPage}
            pagesToShow={this.state.pagesToShow}
            onGoPage={this.goPage}
            onPrevPage={this.onPrev}
            onNextPage={this.onNext}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const brands = state.brandFilter;
  const orderBy = state.orderBy;

  const filterByBrandArr = brandFilter(state.shop.products, brands);
  const filterByOrderArr = orderByFilter(filterByBrandArr, orderBy);

  return { products: filterByOrderArr };
};

export default connect(mapStateToProps, null)(ProductList);
