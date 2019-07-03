import React from "react";
import ReactDOM from "react-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//import { configureFakeBackend} from "./helpers/fake-backend";
//configureFakeBackend();

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
registerServiceWorker();
