import React, { Component } from "react";
import withAuth from "../hocs/withAuth";
import { Header, Icon } from "semantic-ui-react";

class MyAccount extends Component {
	render() {
		return (
			<div>
				<Header as="h2">
					<Icon name="settings" />My Account
				</Header>
			</div>
		);
	}
}

export default withAuth(MyAccount);
