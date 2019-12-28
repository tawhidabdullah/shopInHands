import React from "react";
import spinner from "./spinner2.gif";

const PageSpinner = ({ bgColor }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: `${bgColor}`,
      position: 'relative'
    }}>
      <img
        src={spinner}
        style={{
          width: "180px", display: "block",
          position: "absolute",
          left: '50%',
          top: '45%',
          transform: 'translate(-50%,-50%)'
        }}
        alt="this is a great spinner"
      />
    </div>
  );
};

const SectionSpinner = ({ bgColor }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `${bgColor}`,
      position: "relative"
    }}>
      <img
        src={spinner}
        style={{
          width: "180px", display: "block",
          position: "absolute",
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)'
        }}
        alt="this is a great spinner"
      />
    </div>
  );
};

const GifSpinner = ({ isAPageSpinner = false, bgColor = "#fff" }) => {
  return isAPageSpinner ? <PageSpinner bgColor={bgColor} /> : <SectionSpinner bgColor={bgColor} />;
};

export default GifSpinner;




/*


testing the windows keyboard shortcuts








 */