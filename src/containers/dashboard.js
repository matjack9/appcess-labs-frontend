import React, { Component } from "react";
import withAuth from "../hocs/withAuth";
import { connect } from "react-redux";
import * as actions from "../actions";
import ProjectsContainer from "./projectsContainer";
import NewProjectCard from "../components/newProjectCard";
import { Card, Header } from "semantic-ui-react";

class Dashboard extends Component {
	render() {
		const currentUser = this.props.currentUser;

		return (
			<div>
				<Header as="h2">Hello {currentUser.first_name},</Header>
				<label>
					<Header as="h3" style={{ color: "SteelBlue", marginBottom: "2%" }}>
						Here are your projects:
					</Header>
				</label>
				{currentUser.account_type === "Company" &&
				currentUser.is_admin === true ? (
					<Card.Group centered>
						<NewProjectCard />
					</Card.Group>
				) : null}
				<ProjectsContainer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
});

export default withAuth(connect(mapStateToProps, actions)(Dashboard));
