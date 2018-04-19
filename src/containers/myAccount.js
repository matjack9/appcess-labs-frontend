import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";

class MyAccount extends Component {
	state = {
		justUpdated: false,
		accountType: "",
		isAdmin: false,
		passwordConfirmation: "",
		userParams: {
			email: "",
			first_name: "",
			last_name: "",
			password: ""
		}
	};

	componentDidMount() {
		const {
			email,
			first_name,
			last_name,
			account_type,
			is_admin
		} = this.props.currentUser;
		this.setState({
			accountType: account_type,
			isAdmin: is_admin,
			userParams: { ...this.state.userParams, email, first_name, last_name }
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.currentUser) {
			const { email, first_name, last_name } = nextProps.currentUser;
			return {
				// justUpdated: true, // does not work this way
				userParams: {
					...prevState.userParams,
					email,
					first_name,
					last_name
				}
			};
		}
	}

	handleChange = (e, { name, value }) => {
		if (name === "passwordConfirmation") {
			this.setState({ passwordConfirmation: value });
		} else {
			const userParams = { ...this.state.userParams, [name]: value };
			this.setState({ userParams });
		}
	};

	handleClick = () => {
		alert("not yet working :(");
		// this.props.history.push("/my_account/group");
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.passwordConfirmation === this.state.userParams.password) {
			this.props.updateUser(this.state.userParams);
		} else {
			alert("New passwords need to match");
		}
	};

	render() {
		return (
			<div className="my-account-form">
				<style>{`
					body > div,
					body > div > div,
					body > div > div > div.my-account-form {
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
							<Icon name="settings" />My Account
						</Header>
						<Form size="large" onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Segment>
									{this.state.justUpdated ? (
										<Form.Field>
											<Header as="h6" color="red" textAlign="center">
												Your account has been updated!
											</Header>
										</Form.Field>
									) : null}
									<Form.Input
										fluid
										icon="user"
										iconPosition="left"
										placeholder="New e-mail address"
										name="email"
										value={this.state.userParams.email}
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="New password"
										type="Password"
										name="password"
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="Confirm new password"
										type="Password"
										name="passwordConfirmation"
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										placeholder="New first name"
										name="first_name"
										value={this.state.userParams.first_name}
										onChange={this.handleChange}
									/>
									<Form.Input
										fluid
										placeholder="New last name"
										name="last_name"
										value={this.state.userParams.last_name}
										onChange={this.handleChange}
									/>
									<Form.Field>
										<Button color="red" fluid size="large" inverted>
											Update Account
										</Button>
									</Form.Field>

									{this.state.accountType === "School" && this.state.isAdmin ? (
										<Form.Field>
											<Button
												color="blue"
												size="tiny"
												onClick={this.handleClick}
											>
												Update School?
											</Button>
										</Form.Field>
									) : null}
									{this.state.accountType === "Company" &&
									this.state.isAdmin ? (
										<Form.Field>
											<Button
												color="black"
												size="tiny"
												onClick={this.handleClick}
											>
												Update Company?
											</Button>
										</Form.Field>
									) : null}
								</Segment>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({ currentUser: state.auth.currentUser });

export default withAuth(
	withRouter(connect(mapStateToProps, actions)(MyAccount))
);
