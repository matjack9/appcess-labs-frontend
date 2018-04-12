import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ProjectCard from "../components/projectCard";

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

		return <div>{userProjectsCards}</div>;
	}
}

const mapStateToProps = state => ({
	userProjects: state.userProjects.projects
});

export default connect(mapStateToProps, actions)(ProjectsContainer);
