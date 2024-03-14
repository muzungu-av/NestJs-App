import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Helmet>
      <link href="./output.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Federo&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Italiana&display=swap"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

      <script type="text/javascript">
        {`
         document.ondragstart = test;
         document.onselectstart = test;
         document.oncontextmenu = test;
         function test() {
             return false
         }
        `}
      </script>
      <script type="text/javascript">
        {`
        window.addEventListener('keydown', function (e) {
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) || (e.ctrlKey && e.keyCode === 85)) {
                e.preventDefault();
            }
        });
        `}
      </script>
    </Helmet>
    <App />
  </React.StrictMode>
);
