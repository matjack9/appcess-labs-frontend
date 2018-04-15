import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

class NewProjectCard extends Component {
	handleClick = () => {
		this.props.history.push("/projects/new");
	};

	render() {
		return (
			<Card color="green" onClick={this.handleClick}>
				<Card.Content>
					<Card.Header>
						<Icon name="add circle" color="green" /> New Project
					</Card.Header>
				</Card.Content>
			</Card>
		);
	}
}

export default withRouter(NewProjectCard);
