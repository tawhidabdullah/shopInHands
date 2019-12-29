import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { baseApiURL } from '../../constants/variable';

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
        imagesContents.map(items => {
          return (
            <Carousel.Item>
              <a href={`${items.a}`}>
                <img
                  className="d-block w-100"
                  style={{
                    height: '70vh',
                    objectFit: 'cover'
                  }}
                  src={`${baseApiURL}${items.img}`}
                  alt="Second slide"
                />
              </a>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

export default ControlledCarousel;
