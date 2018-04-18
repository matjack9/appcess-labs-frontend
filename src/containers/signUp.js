import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../actions";
import {
	Button,
	Form,
	Radio,
	Checkbox,
	Grid,
	Header,
	Message,
	Input,
	Segment
} from "semantic-ui-react";

class SignUp extends Component {
	state = {
		error: false,
		fields: {
			passwordConfirmation: "",
			is_in_new_group: false,
			key: "",
			fetchedGroupName: null,
			new_account: {
				account_type: "",
				account_id: null,
				email: "",
				password: "",
				first_name: "",
				last_name: "",
				is_admin: false
			},
			new_school: {
				name: "",
				website: "",
				fee: 0,
				turntime: 0,
				image_url: null,
				key: null,
				admin_key: null
			},
			new_company: {
				name: null,
				website: null,
				description: null,
				key: null,
				admin_key: null
			}
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!prevState.fields.new_account.account_id && nextProps.groups.length) {
			const fetchedGroup = nextProps.groups.find(
				g =>
					g.attributes.admin_key === prevState.fields.key ||
					g.attributes.key === prevState.fields.key
			);
			const fetchedGroupId = fetchedGroup.id;
			const fetchedGroupName = fetchedGroup.attributes.name;
			const is_admin =
				fetchedGroup.attributes.admin_key === prevState.fields.key;

			const new_account = {
				...prevState.fields.new_account,
				account_id: fetchedGroupId,
				is_admin
			};

			return {
				fields: { ...prevState.fields, fetchedGroupName, new_account }
			};
		}
		return null;
	}

	handleFieldsChange = (e, { name, value, checked }) => {
		const newValue = value ? value : checked;
		const newFields = { ...this.state.fields, [name]: newValue };

		this.setState({
			fields: newFields
		});
	};

	handleNewAccountChange = (e, { name, value }) => {
		const new_account = { ...this.state.fields.new_account, [name]: value };

		this.setState({
			fields: { ...this.state.fields, new_account }
		});
	};

	handleNewSchoolChange = (e, { name, value }) => {
		const new_school = { ...this.state.fields.new_school, [name]: value };

		this.setState({
			fields: { ...this.state.fields, new_school }
		});
	};

	handleNewCompanyChange = (e, { name, value }) => {
		const new_company = { ...this.state.fields.new_company, [name]: value };

		this.setState({
			fields: { ...this.state.fields, new_company }
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (
			this.state.fields.new_account.password ===
			this.state.fields.passwordConfirmation
		) {
			if (this.state.fields.new_account.account_id) {
				console.log("creating user", this.state.fields);
				this.props.createUser(
					this.state.fields.new_account,
					this.props.history
				);
			} else if (
				this.state.fields.is_in_new_group &&
				this.state.fields.new_account.account_type === "School"
			) {
				console.log("creating group then user", this.state.fields);
				this.props.createGroupAndUser(
					this.state.fields.new_account.account_type,
					this.state.fields.new_school,
					this.state.fields.new_account,
					this.props.history
				);
			} else if (
				this.state.fields.is_in_new_group &&
				this.state.fields.new_account.account_type === "Company"
			) {
				console.log("creating group then user", this.state.fields);
				this.props.createGroupAndUser(
					this.state.fields.new_account.account_type,
					this.state.fields.new_company,
					this.state.fields.new_account,
					this.props.history
				);
			} else {
				alert("Please complete the form");
			}
		} else {
			alert("Passwords need to match");
		}
	};

	handleKeySubmit = e => {
		e.preventDefault();
		if (this.state.fields.new_account.account_type && this.state.fields.key) {
			this.props.fetchGroup(
				this.state.fields.new_account.account_type,
				this.state.fields.key
			);
		}
	};

	render() {
		return this.props.loggedIn ? (
			<h4>You are already signed up!</h4>
		) : (
			<div>
				{this.state.error ? <h1>Try Again</h1> : null}
				<div className="signup-form">
					<style>{`
			      body > div,
			      body > div > div,
			      body > div > div > div.signup-form {
			        height: 100%;
			      }
			    `}</style>
					<Grid
						textAlign="center"
						style={{ height: "100%" }}
						verticalAlign="middle"
					>
						<Grid.Column style={{ maxWidth: 600 }}>
							<Header as="h2" color="black" textAlign="center">
								Sign up with Appcess Labs
							</Header>
							<Form size="large" onSubmit={this.handleSubmit}>
								<Segment stacked>
									<Segment>
										<Form.Input
											fluid
											icon="user"
											iconPosition="left"
											placeholder="E-mail address"
											name="email"
											onChange={this.handleNewAccountChange}
										/>
										<Form.Input
											fluid
											icon="lock"
											iconPosition="left"
											placeholder="Password"
											type="password"
											name="password"
											onChange={this.handleNewAccountChange}
										/>
										<Form.Input
											fluid
											icon="lock"
											iconPosition="left"
											placeholder="Password confirmation"
											type="Password"
											name="passwordConfirmation"
											onChange={this.handleFieldsChange}
										/>
										<Form.Input
											fluid
											placeholder="First name"
											name="first_name"
											onChange={this.handleNewAccountChange}
										/>
										<Form.Input
											fluid
											placeholder="Last name"
											name="last_name"
											onChange={this.handleNewAccountChange}
										/>
									</Segment>
									<Form.Field>
										<Grid columns="equal">
											<Grid.Row>
												<Grid.Column>
													<Form.Field>
														<Radio
															label="Contractor account"
															name="account_type"
															value="Company"
															checked={
																this.state.fields.new_account.account_type ===
																"Company"
															}
															onChange={this.handleNewAccountChange}
														/>
													</Form.Field>
												</Grid.Column>
												<Grid.Column>
													<Form.Field>
														<Radio
															label="School account"
															name="account_type"
															value="School"
															checked={
																this.state.fields.new_account.account_type ===
																"School"
															}
															onChange={this.handleNewAccountChange}
														/>
													</Form.Field>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Form.Field>
									{this.state.fields.new_account.account_type &&
									!this.state.fields.is_in_new_group ? (
										<Form.Field required>
											{this.state.fields.new_account.account_type ===
											"School" ? (
												<label>
													Please enter the school account key from your
													administrator
												</label>
											) : (
												<label>
													Please enter the group account key from your
													administrator
												</label>
											)}
											<Form.Group>
												<Form.Input
													width={14}
													icon="key"
													iconPosition="left"
													placeholder="account key"
													name="key"
													onChange={this.handleFieldsChange}
												/>
												<Form.Button
													float="right"
													content="Check"
													onClick={this.handleKeySubmit}
												/>
											</Form.Group>
										</Form.Field>
									) : null}
									{this.state.fields.fetchedGroupName ? (
										<Form.Field>
											<strong>
												Welcome to {this.state.fields.fetchedGroupName} on
												AppcessLabs
											</strong>
										</Form.Field>
									) : null}
									{this.state.fields.new_account.account_type ? (
										<Form.Field>
											<Checkbox
												label="This account does not belong to an existing group"
												name="is_in_new_group"
												checked={this.state.fields.is_in_new_group}
												onChange={this.handleFieldsChange}
											/>
										</Form.Field>
									) : null}
									{this.state.fields.is_in_new_group &&
									this.state.fields.new_account.account_type === "School" ? (
										<Segment>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>School name</label>
												<Form.Input
													fluid
													placeholder="name"
													name="name"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>Website</label>
												<Form.Input
													fluid
													placeholder="example: 'abc.com'"
													name="website"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>Fee</label>
												<Form.Input
													fluid
													icon="dollar"
													iconPosition="left"
													placeholder="example: '45.00'"
													name="fee"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>
													Turn Time <i>(in days)</i>
												</label>
												<Form.Input
													fluid
													icon="wait"
													iconPosition="left"
													placeholder="example: '14'"
													name="turntime"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>
													Account key (for new students to join)
												</label>
												<Form.Input
													fluid
													icon="key"
													iconPosition="left"
													placeholder="key"
													name="key"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>
													Admin account key (for new admins to join)
												</label>
												<Form.Input
													fluid
													icon="key"
													iconPosition="left"
													placeholder="admin key"
													name="admin_key"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
											<Form.Field>
												<label style={{ textAlign: "left" }}>
													Image URL <i>(optional)</i>
												</label>
												<Form.Input
													fluid
													icon="image"
													iconPosition="left"
													placeholder="example: 'https://gph.is/1QyjlyU'"
													name="image_url"
													onChange={this.handleNewSchoolChange}
												/>
											</Form.Field>
										</Segment>
									) : null}
									{this.state.fields.is_in_new_group &&
									this.state.fields.new_account.account_type === "Company" ? (
										<Segment>
											<Form.Field>
												<label style={{ textAlign: "left" }}>
													Group name <i>(optional)</i>
												</label>
												<Form.Input
													fluid
													placeholder="name"
													name="name"
													onChange={this.handleNewCompanyChange}
												/>
											</Form.Field>
											<Form.Field>
												<label style={{ textAlign: "left" }}>
													Website <i>(optional)</i>
												</label>
												<Form.Input
													fluid
													placeholder="example: 'abc.com'"
													name="website"
													onChange={this.handleNewCompanyChange}
												/>
											</Form.Field>
											<Form.Field>
												<label style={{ textAlign: "left" }}>
													Description <i>(optional)</i>
												</label>
												<Form.TextArea
													placeholder="group description"
													name="description"
													onChange={this.handleNewCompanyChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>
													Account key (for new users to join)
												</label>
												<Form.Input
													fluid
													icon="key"
													iconPosition="left"
													placeholder="key"
													name="key"
													onChange={this.handleNewCompanyChange}
												/>
											</Form.Field>
											<Form.Field required>
												<label style={{ textAlign: "left" }}>
													Admin account key (for new users to join)
												</label>
												<Form.Input
													fluid
													icon="key"
													iconPosition="left"
													placeholder="admin key"
													name="admin_key"
													onChange={this.handleNewCompanyChange}
												/>
											</Form.Field>
										</Segment>
									) : null}
									<Button color="black" fluid size="large">
										Sign Up
									</Button>
								</Segment>
							</Form>
						</Grid.Column>
					</Grid>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	let groups = [...state.companies.companies, ...state.schools.schools];
	return {
		loggedIn: !!state.auth.currentUser.id,
		groups
	};
};

export default withRouter(connect(mapStateToProps, actions)(SignUp));
