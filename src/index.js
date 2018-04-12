import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import Navbar from "./components/navbar";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<div>
				<Navbar />
				<App />
			</div>
		</Provider>
	</Router>,
	document.getElementById("root")
);
registerServiceWorker();
