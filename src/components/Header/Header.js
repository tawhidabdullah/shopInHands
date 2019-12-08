import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authAction';
import './Header.scss';
import '../styles_components/searchBar.scss';

class Header extends Component {
  state = {
    dropdownToggle: false,
    fosttrapToggle: false,
    searchInput: ''
  };

  toggleDrodown = () => {
    const dt = this.state.dropdownToggle;
    this.setState({
      dropdownToggle: !dt
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(); // firing the action here
  };

  onnavFostrapclick = () => {
    const fosttrapToggle = this.state.fosttrapToggle;
    this.setState({
      fosttrapToggle: !fosttrapToggle
    });
  };

  onSearchInputChange = () => {};
  render() {
    const { isAuthenticate, user } = this.props.auth;
    const cats = this.props.category.categories;
    let categoryNavContents;
    let categories;

    if (cats) {
      categories = cats.map(category => {
        return category.title;
      });
    }

    if (categories) {
      categoryNavContents = categories.map(category => {
        return (
          <li>
            <a>{category}</a>
          </li>
        );
      });
    }

    const logedInUserLinks = (
      <React.Fragment>
        <li>
          <Link to="/dashboard">
            {' '}
            <i className="fa fa-dashboard"> </i> Dashboard
          </Link>
        </li>

        <li className="header__avatar" onClick={this.toggleDrodown}>
          <div className="user-account">
            <img
              className="header__avatar-img"
              src={user.avatar}
              title="you must have a Gravatar connect to your email for displaying image"
            />
            <div
              className={`dropdownx ${
                this.state.dropdownToggle ? 'dropdown--active' : 'deactive'
              }`}
            >
              <div className="dropdown__list">
                <a className="dropdown__list-item">
                  <span className="dropdown__icon">
                    <i className="fa fa-user" />
                  </span>
                  <span className="dropdown__title">my profile</span>
                </a>
                <a className="dropdown__list-item">
                  <span className="dropdown__icon">
                    <i className="fa fa-clipboard" />
                  </span>
                  <span className="dropdown__title">my account</span>
                </a>
                <a className="dropdown__list-item" onClick={this.onLogoutClick}>
                  <span className="dropdown__icon">
                    <i className="fa fa-sign-out" />
                  </span>
                  <span className="dropdown__title">log out</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
    const newUserLinks = (
      <React.Fragment>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </React.Fragment>
    );
    return (
      // <nav className="fixed-top navbarheader">
      //   <div
      //     className={
      //       this.state.fosttrapToggle ? "nav-fostrap visible" : "nav-fostrap"
      //     }
      //   >
      //     <ul>
      //       <li>
      //         <NavLink to="/">
      //           <span className="lead">SharpStore</span>
      //         </NavLink>
      //       </li>

      //       <li>
      //         <a href="javascript:void(0)">
      //           Category
      //           <span className="arrow-down" />
      //         </a>
      //         <ul className="dropdown">{categoryNavContents}</ul>
      //       </li>
      //       <li>
      //         <a href="javascript:void(0)">
      //           Blogger
      //           <span className="arrow-down" />
      //         </a>
      //         <ul className="dropdown">
      //           <li>
      //             <a>Widget</a>
      //           </li>
      //           <li>
      //             <a>Tips</a>
      //           </li>
      //         </ul>
      //       </li>
      //       <li>
      //         <a>Business</a>
      //       </li>
      //       <li>
      //         <NavLink to={"/cart"}>
      //           <i className="fa fa-shopping-cart mr-2" aria-hidden="true" />
      //           <span class="mb-2 badge badge-primary">
      //             {this.props.cartLength ? ` ${this.props.cartLength}` : ""}
      //           </span>
      //         </NavLink>
      //       </li>
      //       {isAuthenticate ? logedInUserLinks : newUserLinks}{" "}
      //     </ul>
      //   </div>
      //   <div className="nav-bg-fostrap">
      //     <div className="navbar-fostrap" onClick={this.onnavFostrapclick}>
      //       {" "}
      //       <span /> <span /> <span />{" "}
      //     </div>
      //     <a className="title-mobile">SharpStore</a>
      //   </div>
      // </nav>
      <>
        <div className="top-head-1">
          <div className="langandcurrency">
            <p>
              ENGLISH <i className="fa fa-angle-down"></i>
            </p>
            <p>
              USD <i className="fa fa-angle-down"></i>
            </p>
          </div>
          <div className="trackorderandauthlinks">
            <p className="trackorderbutton">
              <i className="fa fa-car"></i>Track You Order{' '}
            </p>
            <p>
              <i className="fa fa-user"></i>
              <span>Login</span> or <span>Register</span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartLength: state.shop.cart.length,
    auth: state.auth,
    category: state.category
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);

/*

  <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <span className="lead">SharpStore</span>
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
            
             
              {isAuthenticate ? logedInUserLinks : newUserLinks}{" "}
            </ul>
          </div>
        </div>
      </nav>


*/
