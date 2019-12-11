import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-md-3">
          <div className="shopping__info">
            <div className="shopping__info-item">
              <i className="fa fa-address-card" />
              <h3>
                San Luis Potosis Centro Historico, 78000 San Luis Potosis, SLP,
                Mexico
              </h3>
            </div>
            <div className="shopping__info-item">
              <i className="fa fa-phone" />
              <h3>(+0214)0 315 215 - (+0214)0 315 215</h3>
            </div>
            <div className="shopping__info-item">
              <i className="fa fa-envelope" />
              <h3>Support_emarket@domain.com</h3>
            </div>
            <div className="shopping__info-item">
              <i className="fa fa-plane" />
              <h3>Open time: 8:00AM - 16:PM</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="our__services">
            <div className="footer_section-title">
              <span>Our Services</span>
            </div>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3>Track your Order</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3>Wishlist</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3>Customer Service</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3>Returns / Exchange</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3>Faq?</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3>Support</h3>
            </span>
          </div>
        </div>

        <div className="col-md-2">
          <div className="our__categories">
            <div className="footer_section-title">
              <span>Our Categories</span>
            </div>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Industrial Parts & Tools</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Health & Beauty</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Gifts, Sports & Toys</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Packaging & Office</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Metallurgy, Chemicals</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Arts, Crafts & Sewing</h3>
            </span>
          </div>
        </div>

        <div className="col-md-2">
          <div className="our__categories">
            <div className="footer_section-title">
              <span>Our Categories</span>
            </div>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Industrial Parts & Tools</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Health & Beauty</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Gifts, Sports & Toys</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Packaging & Office</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Metallurgy, Chemicals</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Arts, Crafts & Sewing</h3>
            </span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="our__categories">
            <div className="footer_section-title">
              <span>Our Categories</span>
            </div>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Industrial Parts & Tools</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Health & Beauty</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Gifts, Sports & Toys</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Packaging & Office</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Metallurgy, Chemicals</h3>
            </span>
            <span className="footer_section-item">
              <i className="fa fa-circle"></i>
              <h3> Arts, Crafts & Sewing</h3>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* 

 <footer className="fter ">
      <div className="contain">
        <div className="col">
          <h1>Company</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Products</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Accounts</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Resources</h1>
          <ul>
            <li>Webmail</li>
            <li>Redeem code</li>
            <li>WHOIS lookup</li>
            <li>Site map</li>
            <li>Web templates</li>
            <li>Email templates</li>
          </ul>
        </div>
        <div className="col">
          <h1>Support</h1>
          <ul>
            <li>Contact us</li>
            <li>Web chat</li>
            <li>Open ticket</li>
          </ul>
        </div>
        <div className="col social">
          <h1>Social</h1>
          <ul>
            <li>
              <i className="fa fa-facebook" />
            </li>
            <li>
              <i className="fa fa-instagram" />
            </li>

            <li>
              <i className="fa fa-twiiter" />
            </li>
            <li>
              <i className="fa fa-youtube" />
            </li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
    </footer>



*/
