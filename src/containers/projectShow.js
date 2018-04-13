import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import ProjectCard from "../components/projectCard";
import ContractsContainer from "./contractsContainer";

class ProjectShow extends Component {
	state = {
		fetchProjectCompleted: false
	};

	componentDidMount() {
		if (!Object.keys(this.props.project).length) {
			this.props.fetchUserProject(parseInt(this.props.id));
		} else {
			this.setState({ fetchProjectCompleted: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.project) {
			this.setState({ fetchProjectCompleted: true });
		}
	}

	render() {
		return !Object.keys(this.props.project).length ? (
			<p>Nothing found</p>
		) : (
			<div>
				<ProjectCard
					key={this.props.project.id}
					project={this.props.project}
					isFluid={true}
				/>
				<ContractsContainer projectId={this.props.project.id} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	let project = {};
	if (state.userProjects.projects.length) {
		project = state.userProjects.projects.find(p => p.id == id);
	}

	return { id, project };
};

export default withAuth(connect(mapStateToProps, actions)(ProjectShow));
