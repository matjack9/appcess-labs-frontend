import React, { Component } from "react";
import withAuth from "../hocs/withAuth";
import { connect } from "react-redux";
import * as actions from "../actions";
import ProjectsContainer from "./projectsContainer";

class Dashboard extends Component {
	render() {
		const currentUser = this.props.currentUser;

		return (
			<div>
				<h3>Dashboard: Hello {currentUser.first_name}</h3>
				<label>Here are your projects:</label>
				<ProjectsContainer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
});

export default withAuth(connect(mapStateToProps, actions)(Dashboard));
