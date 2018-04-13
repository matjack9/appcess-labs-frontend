import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ContractCard extends Component {
	handleClick = () => {
		let cardUrl = `/contracts/${this.props.contract.id}`;
		if (this.props.history.location.pathname !== cardUrl) {
			this.props.history.push(cardUrl);
		}
	};

	render() {
		const schoolId = this.props.contract.relationships.school.data.id; // integrate into card somehow?
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
