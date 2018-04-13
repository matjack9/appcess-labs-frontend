import React, { Component } from "react";
import withAuth from "../hocs/withAuth";

class MyAccount extends Component {
	render() {
		return <h2>My Account</h2>;
	}
}

export default withAuth(MyAccount);
