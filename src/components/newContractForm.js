import React, { Component } from "react";
import withAuth from "../hocs/withAuth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import {
	Icon,
	Button,
	Form,
	Grid,
	Card,
	Header,
	Segment
} from "semantic-ui-react";

class NewContractForm extends Component {
	state = {
		error: false,
		selectedSchool: {},
		fields: {
			project_id: this.props.projectId,
			school_id: 0
		}
	};

	componentDidMount() {
		this.props.fetchSchools();
	}

	handleSchoolChange = (e, { value }) => {
		const newFields = { ...this.state.fields, school_id: value };
		const selectedSchool = this.props.schools.find(
			s => parseInt(s.id) === value
		);
		this.setState({ fields: newFields });
		this.setState({ selectedSchool });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { fields: { project_id, school_id } } = this.state;
		this.props.createContract(project_id, school_id, this.props.history);
	};

	render() {
		const { fields } = this.state;

		return (
			<div className="new-contract-form">
				<style>{`
          body > div,
          body > div > div,
          body > div > div > div.new-contract-form {
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
							<Icon name="signup" />New Request
						</Header>
						<Form size="large" onSubmit={this.handleSubmit}>
							<Segment>
								<Form.Field required>
									<label style={{ textAlign: "left" }}>Select a School</label>
									<Form.Dropdown
										onChange={this.handleSchoolChange}
										placeholder="Select School"
										fluid
										search
										selection
										options={this.props.schoolOptions}
										value={fields.school_id}
									/>
								</Form.Field>
								{Object.keys(this.state.selectedSchool).length ? (
									<Card color="blue" fluid>
										<Card.Content>
											<Card.Header>
												{this.state.selectedSchool.attributes.name}
											</Card.Header>
											<Card.Meta>
												<a
													target="_blank"
													href={
														"http://" +
														this.state.selectedSchool.attributes.website
													}
												>
													{this.state.selectedSchool.attributes.website}{" "}
													<Icon name="external" />
												</a>
											</Card.Meta>
											<Card.Description>
												<div>
													<strong>Fee:</strong>{" "}
													<span style={{ color: "red" }}>
														${parseInt(
															this.state.selectedSchool.attributes.fee
														).toFixed(2)}
													</span>
												</div>
												<div>
													<strong>Deadline:</strong>{" "}
													<span style={{ color: "red" }}>
														{calculateDeadline(
															this.state.selectedSchool.attributes.turntime
														)}
													</span>
												</div>
											</Card.Description>
										</Card.Content>
									</Card>
								) : null}
								<Button color="orange" fluid size="large">
									Request
								</Button>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

function calculateDeadline(turntime) {
	let deadline = new Date();
	deadline.setDate(deadline.getDate() + turntime);
	let dd = deadline.getDate();
	let mm = deadline.getMonth() + 1;
	let yyyy = deadline.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}

	deadline = mm + "/" + dd + "/" + yyyy;
	return deadline;
}

const mapStateToProps = (state, ownProps) => {
	let schoolOptions = [];
	if (state.schools.schools.length) {
		schoolOptions = state.schools.schools.map(s => ({
			key: parseInt(s.id),
			value: parseInt(s.id),
			text: s.attributes.name
		}));
	}
	return {
		projectId: ownProps.match.params.id,
		schools: state.schools.schools,
		schoolOptions
	};
};

export default withAuth(
	withRouter(connect(mapStateToProps, actions)(NewContractForm))
);
