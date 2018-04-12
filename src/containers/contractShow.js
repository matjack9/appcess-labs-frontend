import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import ContractCard from "../components/contractCard";

class ContractShow extends Component {
	state = {
		fetchContractCompleted: false
	};

	componentDidMount() {
		if (!Object.keys(this.props.contract).length) {
			this.props.fetchUserContract(parseInt(this.props.id));
		} else {
			this.setState({ fetchContractCompleted: true });
		}
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
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	let contract = {};
	if (state.userContracts.contracts.length) {
		contract = state.userContracts.contracts.find(p => p.id == id);
	}

	return { id, contract };
};

export default withAuth(connect(mapStateToProps, actions)(ContractShow));
