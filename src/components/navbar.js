import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Menu, Segment } from "semantic-ui-react";

// style={{ left: 0, width: "100%", position: "absolute" }}
class Navbar extends Component {
	render() {
		return (
			<Menu inverted>
				<Menu.Item name="home" as={NavLink} to="/" exact>
					<h4>A P P C E S S L A B S</h4>
				</Menu.Item>

				<Menu.Menu position="right">
					{this.props.loggedIn ? (
						<Menu.Item name="My Account" as={NavLink} to="/my_account" exact />
					) : (
						<Menu.Item name="Sign Up" as={NavLink} to="/sign_up" exact />
					)}
					{this.props.loggedIn ? (
						<Menu.Item
							name="Log Out"
							as={NavLink}
							to="/logout"
							exact
							onClick={e => {
								e.preventDefault();
								this.props.logoutUser();
							}}
						/>
					) : (
						<Menu.Item name="Log In" as={NavLink} to="/login" exact />
					)}
				</Menu.Menu>
			</Menu>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions)(Navbar);
