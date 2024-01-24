import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Helmet>
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
    </Helmet>
    <App />
  </React.StrictMode>
);
