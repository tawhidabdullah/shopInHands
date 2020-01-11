import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { baseApiURL } from '../../constants/variable';
import { isElementExists, getElement } from '../../utilities/elementHelpers';

function ControlledCarousel({ imagesContents }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      {imagesContents &&
        imagesContents.length > 0 &&
        imagesContents.map(item => {
          return (
            <Carousel.Item key={item._id}>
              {(item.elements && isElementExists(item.elements, 'url') && (
                <a href={`${getElement(item.elements, 'url').value}`}>
                  <img
                    className="d-block w-100"
                    style={{
                      height: '80vh',
                      objectFit: 'cover'
                    }}
                    src={`${baseApiURL}${item.elements &&
                      isElementExists(item.elements, 'img') &&
                      getElement(item.elements, 'img').value}`}
                    alt="Shopping Hands Slider Image"
                  />
                </a>
              )) || (
                <img
                  className="d-block w-100"
                  style={{
                    height: '80vh',
                    objectFit: 'cover'
                  }}
                  src={`${baseApiURL}${item.elements &&
                    isElementExists(item.elements, 'img') &&
                    getElement(item.elements, 'img').value}`}
                  alt="Second slide"
                />
              )}
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

export default ControlledCarousel;
