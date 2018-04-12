import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

const Navbar = props => {
	return (
		<div>
			<NavLink
				to="/"
				exact
				style={link}
				activeStyle={{
					background: "darkblue"
				}}
			>
				Home
			</NavLink>
			{props.loggedIn ? (
				<NavLink
					to="/my_account"
					exact
					style={link}
					activeStyle={{
						background: "darkblue"
					}}
				>
					My Account
				</NavLink>
			) : (
				<NavLink
					to="/sign_up"
					exact
					style={link}
					activeStyle={{
						background: "darkblue"
					}}
				>
					Sign Up
				</NavLink>
			)}
			{props.loggedIn ? (
				<NavLink
					to="/logout"
					exact
					style={link}
					activeStyle={{
						background: "darkblue"
					}}
					onClick={e => {
						e.preventDefault();
						props.logoutUser();
					}}
				>
					Log Out
				</NavLink>
			) : (
				<NavLink
					to="/login"
					exact
					style={link}
					activeStyle={{
						background: "darkblue"
					}}
				>
					Login
				</NavLink>
			)}
		</div>
	);
};

const link = {
	width: "100px",
	padding: "12px",
	margin: "0 6px 6px",
	background: "blue",
	textDecoration: "none",
	color: "white"
};

const mapStateToProps = state => ({
	loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions)(Navbar);
