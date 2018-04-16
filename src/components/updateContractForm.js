import React, { Component } from "react";
import withAuth from "../hocs/withAuth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { Icon, Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class UpdateContractForm extends Component {
	state = {
		error: false,
		selectedPhase: null,
		currentPhase: "Requested",
		color: "orange",
		assignedStudentId: this.props.assignedStudentId
	};

	componentDidMount() {
		this.props.fetchUserContract(this.props.id);
		this.props.fetchUsers();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.assignedStudentId) {
			this.setState({ assignedStudentId: nextProps.assignedStudentId });
		}

		const attributes = nextProps.contract.attributes;
		if (attributes) {
			switch (true) {
				case attributes.status.is_completed:
					this.setState({ color: "green", currentPhase: "Complete" });
					break;
				case attributes.status.is_in_review:
					this.setState({ color: "teal", currentPhase: "In Review" });
					break;
				case attributes.status.is_in_progress:
					this.setState({ color: "yellow", currentPhase: "In Progress" });
					break;
				case attributes.status.is_accepted:
					this.setState({ color: "grey", currentPhase: "Request Accepted" });
					break;
			}
		}
	}

	handleChange = (e, { value }) => {
		const selectedPhase = value;
		this.setState({ selectedPhase });
	};

	handleStudentChange = (e, { value }) => {
		const assignedStudentId = value;
		this.setState({ assignedStudentId });
	};

	handleDelete = e => {
		e.preventDefault();
		console.log("deleting");
	};

	handleSubmit = e => {
		e.preventDefault();
		let updateParams = {};
		updateParams["id"] = this.props.id;
		let phaseParams = setProgress(this.state.selectedPhase);
		phaseParams["user_id"] = this.state.assignedStudentId;
		updateParams["phaseParams"] = phaseParams;
		this.props.updateContract(updateParams, this.props.history);
	};

	render() {
		const { selectedPhase, assignedStudentId } = this.state;
		const attributes = this.props.contract.attributes;
		const phases = [
			{
				key: "Requested",
				value: "Requested",
				text: "Requested"
			},
			{
				key: "Request Accepted",
				value: "Request Accepted",
				text: "Request Accepted"
			},
			{
				key: "In Progress",
				value: "In Progress",
				text: "In Progress"
			},
			{
				key: "In Review",
				value: "In Review",
				text: "In Review"
			},
			{ key: "Complete", value: "Complete", text: "Complete" }
		];

		return (
			<div>
				{this.props.currentUser.account_type === "Company" ? (
					<h2>Nothing to see here</h2>
				) : (
					<div className="update-contract-form">
						<style>{`
            body > div,
            body > div > div,
            body > div > div > div.update-contract-form {
              height: 100%;
            }
          `}</style>
						<Grid
							textAlign="center"
							style={{ height: "100%" }}
							verticalAlign="middle"
						>
							<Grid.Column style={{ maxWidth: 450 }}>
								<Header as="h2" color="black" textAlign="center">
									<Icon name="rocket" />Update Contract
								</Header>
								<Form size="large" onSubmit={this.handleSubmit}>
									<Segment>
										<Form.Field>
											<div style={{ color: this.state.color }}>
												<strong>
													Current Phase: {this.state.currentPhase}
												</strong>
											</div>
											<label style={{ textAlign: "left" }}>
												<strong>Update to:</strong>
											</label>
											<Form.Dropdown
												onChange={this.handleChange}
												placeholder="Current progress"
												fluid
												selection
												options={phases}
												value={selectedPhase}
											/>
										</Form.Field>
										{(this.state.selectedPhase !== "Requested" ||
											(this.state.currentPhase !== "Requested" &&
												this.state.selectedPhase !== "Requested")) &&
										this.props.currentUser.is_admin ? (
											<Form.Field>
												<label style={{ textAlign: "left" }}>
													<strong>Assign to new student?</strong>
												</label>
												<Form.Dropdown
													onChange={this.handleStudentChange}
													placeholder="Select student"
													fluid
													search
													selection
													options={this.props.studentOptions}
													value={assignedStudentId}
												/>
											</Form.Field>
										) : null}
										<Button color="blue" fluid size="large">
											Update
										</Button>
									</Segment>
									{this.props.currentUser.is_admin ? (
										<Segment>
											<Button
												onClick={this.handleDelete}
												color="red"
												inverted
												fluid
												size="small"
											>
												Cancel Contract
											</Button>
										</Segment>
									) : null}
								</Form>
							</Grid.Column>
						</Grid>
					</div>
				)}
			</div>
		);
	}
}

function setProgress(phase) {
	switch (phase) {
		case "Complete":
			return {
				is_completed: true,
				is_in_review: true,
				is_in_progress: true,
				is_accepted: true,
				is_requested: true
			};
		case "In Review":
			return {
				is_completed: false,
				is_in_review: true,
				is_in_progress: true,
				is_accepted: true,
				is_requested: true
			};
		case "In Progress":
			return {
				is_completed: false,
				is_in_review: false,
				is_in_progress: true,
				is_accepted: true,
				is_requested: true
			};
		case "Request Accepted":
			return {
				is_completed: false,
				is_in_review: false,
				is_in_progress: false,
				is_accepted: true,
				is_requested: true
			};
		default:
			return {
				is_completed: false,
				is_in_review: false,
				is_in_progress: false,
				is_accepted: false,
				is_requested: true
			};
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	let contract = {};
	let assignedStudentId = null;
	if (state.userContracts.contracts.length) {
		contract = state.userContracts.contracts.find(c => c.id == id);
		if (contract.relationships.user.data.id) {
			assignedStudentId = contract.relationships.user.data.id;
		}
	}
	const currentUser = state.auth.currentUser;
	let studentOptions = [];
	if (state.users.users.length) {
		studentOptions = state.users.users.map(u => ({
			key: parseInt(u.id),
			value: parseInt(u.id),
			text: u.attributes.first_name + " " + u.attributes.last_name
		}));
	}

	return { id, contract, currentUser, assignedStudentId, studentOptions };
};

export default withAuth(
	withRouter(connect(mapStateToProps, actions)(UpdateContractForm))
);
