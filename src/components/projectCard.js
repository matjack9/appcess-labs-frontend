import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProjectCard extends Component {
	handleClick = () => {
		this.props.history.push(`/projects/${this.props.project.id}`);
	};

	render() {
		const project = this.props.project;
		return (
			<div onClick={this.handleClick}>
				<h4>{project.attributes.name}</h4>
				<label>Description:</label>
				<div>{project.attributes.description}</div>
				<label>User Stories:</label>
				<div>{project.attributes.user_stories}</div>
				<label>Requirements:</label>
				<div>{project.attributes.requirements}</div>
			</div>
		);
	}
}

export default withRouter(ProjectCard);
