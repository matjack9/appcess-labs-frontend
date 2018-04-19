import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import ProjectCard from "../components/projectCard";
import ContractsContainer from "./contractsContainer";
import NewContractCard from "../components/newContractCard";
import { Card } from "semantic-ui-react";

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
		return (
			<div>
				{this.props.project && !Object.keys(this.props.project).length ? (
					<p>Nothing found</p>
				) : (
					<div>
						<ProjectCard
							key={this.props.project.id}
							project={this.props.project}
							isFluid={true}
						/>
						{this.props.currentUser.account_type === "Company" &&
						this.props.currentUser.is_admin === true ? (
							<Card.Group centered>
								<NewContractCard />
							</Card.Group>
						) : null}
						{this.props.currentUser.account_type === "Company" &&
						this.props.project.id ? (
							<ContractsContainer projectId={this.props.project.id} />
						) : null}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	let project = {};
	if (state.userProjects.projects.length) {
		project = state.userProjects.projects.find(p => p.id == id);
		if (!project) {
			project = {};
		}
	}
	const currentUser = state.auth.currentUser;
	console.log(project);
	return { id, project, currentUser };
};

export default withAuth(connect(mapStateToProps, actions)(ProjectShow));
