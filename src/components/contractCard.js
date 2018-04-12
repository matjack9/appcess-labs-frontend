import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ContractCard extends Component {
	handleClick = () => {
		if (
			this.props.history.location.pathname !==
			`/contracts/${this.props.contract.id}`
		) {
			this.props.history.push(`/contracts/${this.props.contract.id}`);
		}
	};

	render() {
		const attributes = this.props.contract.attributes;
		let status;
		switch (attributes.status) {
			case attributes.status.is_completed:
				status = "Complete";
				break;
			case attributes.status.is_in_review:
				status = "In Review";
				break;
			case attributes.status.is_in_progress:
				status = "In Progress";
				break;
			case attributes.status.is_accepted:
				status = "Project Accepted";
				break;
			default:
				status = "Requested";
				break;
		}

		return (
			<div onClick={this.handleClick}>
				<h4>
					Contract Card for Project{" "}
					{this.props.contract.relationships.project.data.id}
				</h4>
				<label>Status:</label>
				<div>{status}</div>
				<label>Fee:</label>
				<div>${attributes.fee}</div>
				<label>Started:</label>
				<div>{attributes.start_time}</div>
				<label>Deadline:</label>
				<div>{attributes.deadline}</div>
			</div>
		);
	}
}

export default withRouter(ContractCard);
