import React, { useState } from 'react';
import { baseApiURL } from '../../constants/variable';
import { getElement, isElementExists } from '../../utilities/elementHelpers';
import axios from 'axios';

import './Footer.scss';

const Footer = () => {
  const [addressContent, setAddressContent] = useState({});
  const [accountContent, setAccountContent] = useState({});
  const [servicesContent, setServicesContent] = useState({});
  const [aboutUsContent, setAboutUsContent] = useState({});
  const [isLoading, setIsLoading] = useState({});
  React.useEffect(() => {
    const getFooterContent = async () => {
      try {
        setIsLoading(true);
        const addressRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/address`
        );

        const addressCont = addressRes.data.items;

        setAddressContent(addressCont);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }

      try {
        setIsLoading(true);
        const accountContentRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/Account`
        );

        const accountContent = accountContentRes.data;
        setAccountContent(accountContent);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }

      try {
        setIsLoading(true);
        const aboutUsContentRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/About Us`
        );

        const aboutUsContent = aboutUsContentRes.data;
        setAboutUsContent(aboutUsContent);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }

      try {
        setIsLoading(true);
        const servicesContentRes = await axios.get(
          `${baseApiURL}/api/component/detail/name/Services`
        );

        const servicesContent = servicesContentRes.data;
        setServicesContent(servicesContent);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getFooterContent();
  }, []);

  return (
    <footer className="footer">
      <div className="row">
        {addressContent && addressContent && addressContent.length > 0 && (
          <div className="col-md-3">
            <div className="our__categories">
              {/* {ReactHtmlParser(addressContent.rendered)} */}
              <span className="widget-title">
                {addressContent &&
                  addressContent[0].name &&
                  addressContent[0].name}
              </span>
              <ul className="menu">
                {addressContent &&
                  addressContent.length > 0 &&
                  addressContent.map(item => {
                    return (
                      <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-244">
                        {(item.elements &&
                          isElementExists(item.elements, 'url') && (
                            <a
                              href={`${getElement(item.elements, 'url').value}`}
                            >
                              {`${item.elements &&
                                isElementExists(item.elements, 'text') &&
                                getElement(item.elements, 'text').value}`}
                            </a>
                          )) || (
                          <span
                            style={{
                              fontSize: '15px',
                              fontWeight: '500',
                              color: '#777',
                              lineHeight: '1.6'
                            }}
                          >
                            {' '}
                            {`${item.elements &&
                              isElementExists(item.elements, 'text') &&
                              getElement(item.elements, 'text').value}`}
                          </span>
                        )}
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
                      <li
                        key={item.name}
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-244"
                      >
                        {(item.elements &&
                          isElementExists(item.elements, 'url') && (
                            <a
                              href={`${getElement(item.elements, 'url').value}`}
                            >
                              {`${item.elements &&
                                isElementExists(item.elements, 'text') &&
                                getElement(item.elements, 'text').value}`}
                            </a>
                          )) || (
                          <span>
                            {`{item.elements &&
                              isElementExists(item.elements, 'text') &&
                              getElement(item.elements, 'text').value}`}
                          </span>
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
                      <li
                        key={item.name}
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-244"
                      >
                        {(item.elements &&
                          isElementExists(item.elements, 'url') && (
                            <a
                              href={`${getElement(item.elements, 'url').value}`}
                            >
                              {`${item.elements &&
                                isElementExists(item.elements, 'text') &&
                                getElement(item.elements, 'text').value}`}
                            </a>
                          )) || (
                          <a>
                            {`${item.elements &&
                              isElementExists(item.elements, 'text') &&
                              getElement(item.elements, 'text').value}`}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

        {servicesContent &&
          servicesContent.items &&
          servicesContent.items.length > 0 && (
            <div className="col-md-3">
              <div className="our__categories">
                {/* {ReactHtmlParser(servicesContent.rendered)} */}
                <span className="widget-title">{servicesContent.name}</span>
                <ul className="menu">
                  {servicesContent.items.map(item => {
                    return (
                      <li
                        key={item.name}
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-244"
                      >
                        {(item.elements &&
                          isElementExists(item.elements, 'url') && (
                            <a
                              href={`${getElement(item.elements, 'url').value}`}
                            >
                              {`${item.elements &&
                                isElementExists(item.elements, 'text') &&
                                getElement(item.elements, 'text').value}`}
                            </a>
                          )) || (
                          <a>
                            {`${item.elements &&
                              isElementExists(item.elements, 'text') &&
                              getElement(item.elements, 'text').value}`}
                          </a>
                        )}
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
