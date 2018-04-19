import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import ContractCard from "../components/contractCard";
import ProjectCard from "../components/projectCard";

class ContractShow extends Component {
	state = {
		fetchContractCompleted: false
	};

	componentDidMount() {
		this.props.fetchUserContractAndProject(parseInt(this.props.id));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.contract) {
			this.setState({ fetchContractCompleted: true });
		}
	}

	render() {
		return !Object.keys(this.props.contract).length ? (
			<p>Nothing found</p>
		) : (
			<div>
				<ContractCard
					key={this.props.contract.id}
					contract={this.props.contract}
					isFluid={true}
				/>
				{this.props.currentUser.account_type === "School" &&
				Object.keys(this.props.project).length ? (
					<ProjectCard
						key={this.props.contract.relationships.project.data.id}
						project={this.props.project}
						isFluid={true}
					/>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const currentUser = state.auth.currentUser;
	let contract = {};
	if (state.userContracts.contracts.length) {
		contract = state.userContracts.contracts.find(c => c.id == id);
	}
	let project = {};
	if (
		state.userProjects.projects &&
		state.userProjects.projects.length &&
		Object.keys(contract).length
	) {
		project = state.userProjects.projects.find(
			p => p.id == contract.relationships.project.data.id
		);
	}

	return { id, contract, currentUser, project };
};

export default withAuth(connect(mapStateToProps, actions)(ContractShow));
