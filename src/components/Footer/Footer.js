import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { baseApiURL } from '../../constants/variable';
import axios from 'axios';

import { getApi } from '../../utilities/wooApi';
import './Footer.scss';

const Footer = () => {
  const [footerOne, setFooterOne] = useState({});
  const [aboutUsContent, setAboutUsContent] = useState({});
  const [policyContent, setPolicyContent] = useState({});
  const [accountContent, setAccountContent] = useState({});
  const [isLoading, setIsLoading] = useState({});
  React.useEffect(() => {
    const getFooterContent = async () => {
      try {
        setIsLoading(true);
        const footerContentOneRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/footer1`
        );

        const footerContentOne = footerContentOneRes.data;

        const aboutUsContentRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/About Us`
        );

        const aboutUsContent = aboutUsContentRes.data;

        const policyContentRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/Policy`
        );

        const policyContent = policyContentRes.data;

        const accountContentRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/Policy`
        );

        const accountContent = accountContentRes.data;

        setFooterOne(footerContentOne);
        setAboutUsContent(aboutUsContent);
        setPolicyContent(policyContent);
        setAccountContent(accountContent);

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
        {footerOne && footerOne.items && footerOne.items.length > 0 && (
          <div className="col-md-3">
            <div className="our__categories">
              {/* {ReactHtmlParser(footerOne.rendered)} */}
              <span className="widget-title">
                {footerOne.items && footerOne.items[0].name}
              </span>
              <ul className="menu">
                {footerOne.items.map(item => {
                  return (
                    <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-244">
                      {(item.a && <a href={`${item.a}`}>{item.text}</a>) || (
                        <span>{item.text}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {aboutUsContent &&
          aboutUsContent.items &&
          aboutUsContent.items.length > 0 && (
            <div className="col-md-3">
              <div className="our__categories">
                {/* {ReactHtmlParser(aboutUsContent.rendered)} */}
                <span className="widget-title">{aboutUsContent.name}</span>
                <ul className="menu">
                  {aboutUsContent.items.map(item => {
                    return (
                      <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-244">
                        <a href={`${item.a}`}>{item.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

        {policyContent &&
          policyContent.items &&
          policyContent.items.length > 0 && (
            <div className="col-md-3">
              <div className="our__categories">
                {/* {ReactHtmlParser(policyContent.rendered)} */}
                <span className="widget-title">{policyContent.name}</span>
                <ul className="menu">
                  {policyContent.items.map(item => {
                    return (
                      <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-244">
                        <a href={`${item.a}`}>{item.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

        {accountContent &&
          accountContent.items &&
          accountContent.items.length > 0 && (
            <div className="col-md-3">
              <div className="our__categories">
                {/* {ReactHtmlParser(accountContent.rendered)} */}
                <span className="widget-title">{accountContent.name}</span>
                <ul className="menu">
                  {accountContent.items.map(item => {
                    return (
                      <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-244">
                        <a href={`${item.a}`}>{item.name}</a>
                      </li>
                    );
                  })}
                </ul>
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
          <ul> word from home, so do you know what the 
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
