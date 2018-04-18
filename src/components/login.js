import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../actions";
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment
} from "semantic-ui-react";

class Login extends Component {
	state = {
		error: false,
		fields: {
			email: "",
			password: ""
		}
	};

	handleSignUpClick = e => {
		e.preventDefault();
		this.props.history.push("/sign_up");
	};

	handleChange = e => {
		const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
		this.setState({ fields: newFields });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { fields: { email, password } } = this.state;
		this.props.loginUser(email, password, this.props.history);
	};

	render() {
		const { fields } = this.state;
		return this.props.loggedIn ? (
			<h4>You are already logged in!</h4>
		) : (
			<div>
				{this.state.error ? <h1>Try Again</h1> : null}
				<div className="login-form">
					<style>{`
			      body > div,
			      body > div > div,
			      body > div > div > div.login-form {
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
								Log in to your account
							</Header>
							<Form size="large" onSubmit={this.handleSubmit}>
								<Segment stacked>
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

									<Button color="black" fluid size="large">
										Login
									</Button>
								</Segment>
							</Form>
							<Message>
								New to us? <Link to={"/sign_up"}>Sign Up</Link>
							</Message>
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

export default withRouter(connect(mapStateToProps, actions)(Login));
