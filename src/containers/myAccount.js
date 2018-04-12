import React, { Component } from "react";
import withAuth from "../hocs/withAuth";

class MyAccount extends Component {
	render() {
		return <h4>Testing My Account</h4>;
	}
}

export default withAuth(MyAccount);
