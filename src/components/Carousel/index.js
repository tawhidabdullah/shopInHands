import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactHtmlParser from 'react-html-parser';
import { baseApiURL } from '../../constants/variable';

function ControlledCarousel({ imagesContents }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  console.log('imagesContents', imagesContents && imagesContents[0]);

  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      {/* {imagesContents &&
        imagesContents.map(imgContent => {
          return (
            <Carousel.Item>
              {ReactHtmlParser(imgContent.rendered)}
            </Carousel.Item>
          );
        })} */}

      {imagesContents &&
        imagesContents.map(items => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${baseApiURL}${items.img}`}
                alt="Second slide"
              />
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

export default ControlledCarousel;
