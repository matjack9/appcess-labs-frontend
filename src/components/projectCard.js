import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card } from "semantic-ui-react";

class ProjectCard extends Component {
	state = {
		isFluid: false
	};

	componentDidMount() {
		if (this.props.isFluid) {
			this.setState({ isFluid: true });
		}
	}

	handleClick = () => {
		let cardUrl = `/projects/${this.props.project.id}`;
		if (this.props.history.location.pathname !== cardUrl) {
			this.props.history.push(cardUrl);
		}
	};

	render() {
		const project = this.props.project;
		return (
			<Card color="blue" onClick={this.handleClick} fluid={this.state.isFluid}>
				<Card.Content>
					<Card.Header>{project.attributes.name}</Card.Header>
					<Card.Description>
						<label>
							<strong>Description:</strong>
						</label>
						<div>{project.attributes.description}</div>
						<label>
							<strong>User Stories:</strong>
						</label>
						<div>{project.attributes.user_stories}</div>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<label>
						<strong>Requirements:</strong>
					</label>
					<div>{project.attributes.requirements}</div>
				</Card.Content>
			</Card>
		);
	}
}

export default withRouter(ProjectCard);
