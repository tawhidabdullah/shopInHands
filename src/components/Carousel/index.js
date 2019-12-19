import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactHtmlParser from 'react-html-parser';

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
      {imagesContents &&
        imagesContents.map(imgContent => {
          return (
            <Carousel.Item>
              {ReactHtmlParser(imgContent.rendered)}
            </Carousel.Item>
          );
        })}

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('./item-2.jpg')}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('./item-3.jpg')}
          alt="Third slide"
        />
      </Carousel.Item> */}
    </Carousel>
  );
}

export default ControlledCarousel;
