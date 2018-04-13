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
				<h2>Hello {currentUser.first_name},</h2>
				<label>
					<h3 style={{ color: "SteelBlue", "margin-bottom": "2%" }}>
						Here are your projects:
					</h3>
				</label>
				<ProjectsContainer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
});

export default withAuth(connect(mapStateToProps, actions)(Dashboard));
