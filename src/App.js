import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions";
import About from "./components/about";
import Dashboard from "./containers/dashboard";
import SignUp from "./containers/signUp";
import UpdateGroup from "./containers/updateGroup";
import MyAccount from "./containers/myAccount";
import Login from "./components/login";
import ProjectShow from "./containers/projectShow";
import NewProjectForm from "./components/newProjectForm";
import NewContractForm from "./components/newContractForm";
import ContractShow from "./containers/contractShow";
import UpdateContractForm from "./components/updateContractForm";
import SchoolsContainer from "./containers/schoolsContainer";
import SchoolShow from "./containers/schoolShow";
import Loading from "./components/loading";
import "./App.css";

class App extends Component {
	state = {
		authCompleted: this.props.loggedIn
	};

	componentDidMount() {
		if (localStorage.getItem("token")) {
			this.props.fetchUser();
		} else {
			this.setState({ authCompleted: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loggedIn) {
			this.setState({ authCompleted: true });
		}
	}

	render() {
		return (
			<div className="App">
				{!this.state.authCompleted ? (
					<Loading />
				) : (
					<Switch>
						{this.props.loggedIn ? (
							<Route exact path="/" component={Dashboard} />
						) : (
							<Route exact path="/" component={About} />
						)}
						<Route path="/sign_up" component={SignUp} />
						<Route path="/my_account/group" component={UpdateGroup} />
						<Route path="/my_account" component={MyAccount} />
						<Route path="/login" component={Login} />
						<Route
							exact
							path="/projects"
							render={() => <Redirect to={"/"} />}
						/>
						<Route exact path="/projects/new" component={NewProjectForm} />
						<Route
							path="/projects/:id/new_request"
							component={NewContractForm}
						/>
						<Route path="/projects/:id" component={ProjectShow} />
						<Route
							path="/contracts/:id/update"
							component={UpdateContractForm}
						/>
						<Route path="/contracts/:id" component={ContractShow} />
						<Route path="/schools/:id" component={SchoolShow} />
						<Route path="/schools" component={SchoolsContainer} />
					</Switch>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: !!state.auth.currentUser.id
});

export default withRouter(connect(mapStateToProps, actions)(App));
