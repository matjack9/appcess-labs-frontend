import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ProjectCard from "../components/projectCard";
import Loading from "../components/loading";
import { Card } from "semantic-ui-react";

class ProjectsContainer extends Component {
	state = {
		fetchProjectsCompleted: false
	};

	componentDidMount() {
		if (localStorage.getItem("token")) {
			this.props.fetchUserProjects();
		} else {
			this.setState({ fetchProjectsCompleted: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.userProjects) {
			this.setState({ fetchProjectsCompleted: true });
		}
	}

	render() {
		const userProjectsCards = this.props.userProjects.map(p => (
			<ProjectCard key={p.id} project={p} />
		));

		return (
			<div>
				{!this.state.fetchProjectsCompleted ? (
					<Loading />
				) : (
					<Card.Group centered>{userProjectsCards}</Card.Group>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userProjects: state.userProjects.projects
});

export default connect(mapStateToProps, actions)(ProjectsContainer);
