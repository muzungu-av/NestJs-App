import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    {/* <Helmet>
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
    </Helmet> */}
    <App />
  </React.StrictMode>
);
