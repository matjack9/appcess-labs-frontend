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

	handleClick = e => {
		if (e.target.tagName !== "A") {
			let cardUrl = `/schools/${this.props.school.id}`;
			if (this.props.history.location.pathname !== cardUrl) {
				this.props.history.push(cardUrl);
			}
		}
	};

	render() {
		const school = this.props.school.attributes;
		return (
			<Card color="teal" onClick={this.handleClick} fluid={this.state.isFluid}>
				{school.image_url ? (
					<Image src={externalize_link(school.image_url)} />
				) : null}
				<Card.Content>
					<Card.Header>{school.name}</Card.Header>
					<Card.Meta>
						<a target="_blank" href={externalize_link(school.website)}>
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

function externalize_link(url) {
	if (url.startsWith("http")) {
		return url;
	} else {
		return "http://" + url;
	}
}

export default withRouter(SchoolCard);
