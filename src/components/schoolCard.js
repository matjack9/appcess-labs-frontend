import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SchoolCard extends Component {
	handleClick = () => {
		// this.props.history.push(`/schools/${this.props.school.id}`);
	};

	render() {
		const school = this.props.school.attributes;
		return (
			<div onClick={this.handleClick}>
				<h4>{school.name}</h4>
				<div>
					<a href={school.website}>{school.website}</a>
				</div>
				<label>Fee:</label>
				<div>${school.fee}</div>
				<label>Turn Time:</label>
				<div>{school.turntime} days</div>
			</div>
		);
	}
}

export default withRouter(SchoolCard);
