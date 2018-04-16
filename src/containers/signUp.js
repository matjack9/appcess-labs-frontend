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
			account_type: "",
			account_id: null,
			email: "",
			password: "",
			passwordConfirmation: "",
			first_name: "",
			last_name: "",
			is_admin: false
		}
	};

	handleChange = (e, { name, value, checked }) => {
		const newValue = value ? value : checked;
		const newFields = { ...this.state.fields, [name]: newValue };

		this.setState({
			fields: newFields
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.fields.password === this.state.fields.passwordConfirmation) {
			console.log(this.state.fields);
		} else {
			alert("Passwords need to match");
		}
	};

	render() {
		const { fields } = this.state;
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
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header as="h2" color="black" textAlign="center">
								Sign up with Appcess Labs
							</Header>
							<Form size="large" onSubmit={this.handleSubmit}>
								<Segment stacked>
									<Form.Field>
										Account type: <b>{this.state.fields.account_type}</b>
									</Form.Field>
									<Form.Field>
										<Grid columns="equal">
											<Grid.Row>
												<Grid.Column>
													<Form.Field>
														<Radio
															label="Contractor"
															name="account_type"
															value="Company"
															checked={
																this.state.fields.account_type === "Company"
															}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Grid.Column>
												<Grid.Column>
													<Form.Field>
														<Radio
															label="School"
															name="account_type"
															value="School"
															checked={
																this.state.fields.account_type === "School"
															}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Form.Field>
									<Form.Input
										fluid
										icon="user"
										iconPosition="left"
										placeholder="E-mail address"
										name="email"
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="Password"
										type="password"
										name="password"
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="Password confirmation"
										type="Password"
										name="passwordConfirmation"
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										placeholder="First name"
										name="first_name"
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										placeholder="Last name"
										name="last_name"
										onChange={this.handleChange}
									/>
									<Form.Field>
										<Checkbox
											label="Admin?"
											name="is_admin"
											checked={this.state.fields.is_admin}
											onChange={this.handleChange}
										/>
									</Form.Field>
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

const mapStateToProps = state => ({
	loggedIn: !!state.auth.currentUser.id
});

export default withRouter(connect(mapStateToProps, actions)(SignUp));
