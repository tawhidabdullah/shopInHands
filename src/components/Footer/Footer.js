import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { getApi } from '../../utilities/wooApi';
import './Footer.scss';

const Footer = () => {
  const [footerOne, setFooterOne] = useState({});
  const [footerTwo, setFooterTwo] = useState({});
  const [footerThree, setFooterThree] = useState({});
  const [footerFour, setFooterFour] = useState({});
  const [isLoading, setIsLoading] = useState({});
  React.useEffect(() => {
    const getFooterContent = async () => {
      try {
        setIsLoading(true);
        const footerContentOne = await getApi(
          `/wp-json/wp-rest-api-sidebars/v1/sidebars/footer-1`
        );
        const footerContentTwo = await getApi(
          `/wp-json/wp-rest-api-sidebars/v1/sidebars/footer-2`
        );
        const footerContentThree = await getApi(
          `/wp-json/wp-rest-api-sidebars/v1/sidebars/footer-3`
        );
        const footerContentFour = await getApi(
          `/wp-json/wp-rest-api-sidebars/v1/sidebars/footer-4`
        );

        setFooterOne(footerContentOne);
        setFooterTwo(footerContentTwo);
        setFooterThree(footerContentThree);
        setFooterFour(footerContentFour);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getFooterContent();
  }, []);

  return (
    <footer className="footer">
      <div className="row">
        <div className="col-md-3">
          <div className="shopping__info">
            <div
              style={{
                paddingLeft: '30px'
              }}
            >
              {footerOne && ReactHtmlParser(footerOne.rendered)}
            </div>
          </div>
        </div>

        {Object.keys(footerTwo).length > 0 && (
          <div className="col-md-3">
            <div className="our__categories">
              {ReactHtmlParser(footerTwo.rendered)}
            </div>
          </div>
        )}

        {Object.keys(footerThree).length > 0 && (
          <div className="col-md-3">
            <div className="our__categories">
              {ReactHtmlParser(footerThree.rendered)}
            </div>
          </div>
        )}
        {Object.keys(footerFour).length > 0 && (
          <div className="col-md-3">
            <div className="our__categories">
              {footerFour && ReactHtmlParser(footerFour.rendered)}
            </div>
          </div>
        )}
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
