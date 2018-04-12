import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ContractCard from "../components/contractCard";

class ContractsContainer extends Component {
	state = {
		fetchContractsCompleted: false
	};

	componentDidMount() {
		if (localStorage.getItem("token")) {
			this.props.fetchUserContracts();
		} else {
			this.setState({ fetchContractsCompleted: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.userContracts) {
			this.setState({ fetchContractsCompleted: true });
		}
	}

	render() {
		const userContractsCards = this.props.userContracts.map(c => (
			<ContractCard key={c.id} contract={c} />
		));

		return <div>{userContractsCards}</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	let userContracts = state.userContracts.contracts;
	if (ownProps.projectId) {
		let id = ownProps.projectId;
		userContracts = userContracts.filter(
			c => c.relationships.project.data.id === id
		);
	}

	return { userContracts };
};

export default connect(mapStateToProps, actions)(ContractsContainer);
