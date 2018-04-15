import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

class SchoolCard extends Component {
	state = {
		isFluid: false
	};

	componentDidMount() {
		if (this.props.isFluid) {
			this.setState({ isFluid: true });
		}
	}

	handleClick = () => {
		let cardUrl = `/schools/${this.props.school.id}`;
		if (this.props.history.location.pathname !== cardUrl) {
			this.props.history.push(cardUrl);
		}
	};

	render() {
		const school = this.props.school.attributes;
		return (
			<Card color="teal" onClick={this.handleClick} fluid={this.state.isFluid}>
				<Image src="" />
				<Card.Content>
					<Card.Header>{school.name}</Card.Header>
					<Card.Meta>
						<a target="_blank" href={"http://" + school.website}>
							{school.website} <Icon name="external" />
						</a>
					</Card.Meta>
					<Card.Description>
						<label>
							<strong>Fee:</strong>
						</label>
						<div>${parseInt(school.fee).toFixed(2)}</div>
						<label>
							<strong>Turn Time:</strong>
						</label>
						<div>
							<Icon name="wait" />
							{school.turntime} days
						</div>
					</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}

export default withRouter(SchoolCard);
