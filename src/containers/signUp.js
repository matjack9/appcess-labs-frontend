// import React, { Component } from "react";
// import { connect } from "react-redux";
//
// class SignUp extends Component {
// 	render() {
// 		return this.props.loggedIn ? (
// 			<h4>You are already signed up!</h4>
// 		) : (
// 			<h4>Testing SignUp</h4>
// 		);
// 	}
// }
//
// const mapStateToProps = state => ({
// 	loggedIn: !!state.auth.currentUser.id
// });
//
// export default connect(mapStateToProps)(SignUp);
//
// ////////////////////////////
// (:email, :first_name, :last_name, :password, :account_type, :account_id, :is_admin)
//
// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import * as actions from "../actions";
//
// class SignUp extends React.Component {
// 	state = {
// 		error: false,
// 		fields: {
// 			account_type: ,
// 			account_id: ,
// 			email: "",
// 			password: "",
// 			passwordConfirmation: "",
// 			first_name: "",
// 			last_name: "",
// 			is_admin: false
// 		}
// 	};
//
// 	handleChange = e => {
// 		const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
// 		this.setState({ fields: newFields });
// 	};
//
// 	handleSubmit = e => {
// 		e.preventDefault();
// 		const { fields: { email, password } } = this.state;
//
//
// 		this.props.loginUser(email, password, this.props.history);
// 	};
//
// 	render() {
// 		const { fields } = this.state;
// 		return this.props.loggedIn ? (
// 			<h4>You are already logged in!</h4>
// 		) : (
// 			<div>
// 				{this.state.error ? <h1>Try Again</h1> : null}
// 				<div className="ui form">
// 					<form onSubmit={this.handleSubmit}>
// 						<div className="ui field">
// 							<label>Email</label>
// 							<input
// 								name="email"
// 								placeholder="email"
// 								value={fields.email}
// 								onChange={this.handleChange}
// 							/>
// 						</div>
// 						<div className="ui field">
// 							<label>Password</label>
// 							<input
// 								name="password"
// 								type="password"
// 								placeholder="password"
// 								value={fields.password}
// 								onChange={this.handleChange}
// 							/>
// 						</div>
// 						<div className="ui field">
// 							<label>Password</label>
// 							<input
// 								name="passwordConfirmation"
// 								type="password"
// 								placeholder="confirm password"
// 								value={fields.password}
// 								onChange={this.handleChange}
// 							/>
// 						</div>
// 						<button type="submit">Login</button>
// 					</form>
// 				</div>
// 			</div>
// 		);
// 	}
// }
//
// const mapStateToProps = state => ({
// 	loggedIn: !!state.auth.currentUser.id
// });
//
// export default withRouter(connect(mapStateToProps, actions)(SignUp));

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";

class SignUp extends React.Component {
	state = {
		error: false,
		fields: {
			account_type: "",
			account_id: 0,
			email: "",
			password: "",
			passwordConfirmation: "",
			first_name: "",
			last_name: "",
			is_admin: false
		}
	};

	handleChange = e => {
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		const newFields = { ...this.state.fields, [name]: value };

		this.setState({
			fields: newFields
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
	};

	render() {
		return (
			<div>
				{this.state.error ? <h4>Try Again</h4> : null}
				<div>
					<form onSubmit={this.handleSubmit}>
						<div>
							<label>Account Type</label>
							<input
								type="radio"
								id="accountChoice1"
								name="account_type"
								value="Company"
								onChange={this.handleChange}
							/>
							<label htmlFor="accountChoice1">Company</label>
							<input
								type="radio"
								id="accountChoice2"
								name="account_type"
								value="School"
								onChange={this.handleChange}
							/>
							<label htmlFor="accountChoice2">School</label>
						</div>

						{this.state.fields.account_type ? (
							<div>{this.state.fields.account_type}</div>
						) : null}

						<div>
							<label>Email</label>
							<input
								name="email"
								placeholder="email"
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label>Password</label>
							<input
								name="password"
								type="password"
								placeholder="password"
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label>Confirm Password</label>
							<input
								name="passwordConfirmation"
								type="password"
								placeholder="confirm password"
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label>First Name</label>
							<input
								name="first_name"
								placeholder="first name"
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label>Last Name</label>
							<input
								name="last_name"
								placeholder="last name"
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label>Admin?</label>
							<input
								name="is_admin"
								type="checkbox"
								checked={this.state.fields.is_admin}
								onChange={this.handleChange}
							/>
						</div>
						<button type="submit">Sign Up</button>
					</form>
				</div>
			</div>
		);
	}
}

// const mapStateToProps = state => ({
//
// });

export default withRouter(connect(null, actions)(SignUp));
