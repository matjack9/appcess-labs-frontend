import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import {
	Button,
	Form,
	Radio,
	Checkbox,
	Grid,
	Header,
	Message,
	Input,
	Segment,
	Icon
} from "semantic-ui-react";

class UpdateGroup extends Component {
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
			account_id,
			is_admin
		} = this.props.currentUser;
		this.props.fetchGroup(account_type, account_id);
		this.setState({
			accountType: account_type,
			isAdmin: is_admin,
			userParams: { ...this.state.userParams, email, first_name, last_name }
		});
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	//
	// 	return {}
	// }

	// componentWillUnmount() {
	//
	// }

	handleChange = (e, { name, value }) => {
		console.dir(e.target);
		if (name === "passwordConfirmation") {
			this.setState({ passwordConfirmation: value });
		} else {
			const userParams = { ...this.state.userParams, [name]: value };
			this.setState({ userParams });
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.passwordConfirmation === this.state.userParams.password) {
			console.log("Submitting:", this.state);
			this.setState({ justUpdated: true }); // also clear all controlled fields upon success
		} else {
			alert("New passwords need to match");
		}
	};

	render() {
		console.log(this.state);
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
									<Button color="blue" fluid size="large" inverted>
										Update Account
									</Button>
								</Segment>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	// state.auth.currentUser.account_type & .account_id
	return {
		currentUser: state.auth.currentUser
	};
};

export default withAuth(connect(mapStateToProps, actions)(UpdateGroup));
//
// {this.state.accountType === "School" && this.state.isAdmin ? (
//   <div className="my-school-form">
//     <style>{`
//       body > div,
//       body > div > div,
//       body > div > div > div.my-school-form {
//         height: 100%;
//       }
//     `}</style>
//     <Grid
//       textAlign="center"
//       style={{ height: "100%" }}
//       verticalAlign="middle">
//       <Grid.Column style={{ maxWidth: 600 }}>
//
//       </Grid.Column>
//     </Grid>
//   </div>
// ) : null}
// {this.state.accountType === "Company"  && this.state.isAdmin ? (
//
// ) : null}
