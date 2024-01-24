import "./App.css";
import React, { useEffect, useRef } from "react";
import ImageCanvas from "./components/ImageCanvas";
import pic from "./assets/images/MobileAppBg.jpg"; // Adjust the path based on your project structure
const App = () => {
  return (
    <div style={{ background: "#fff" }}>
      <ImageCanvas pic={pic} />
    </div>
  );
};

export default App;
