import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import withAuth from "../hocs/withAuth";
import SchoolCard from "../components/schoolCard";
import SchoolsContainer from "./schoolsContainer";

class SchoolShow extends Component {
	state = {
		fetchSchoolCompleted: false
	};

	componentDidMount() {
		if (!Object.keys(this.props.school).length) {
			this.props.fetchSchool(parseInt(this.props.id));
		} else {
			this.setState({ fetchSchoolCompleted: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.school) {
			this.setState({ fetchSchoolCompleted: true });
		}
	}

	render() {
		return !Object.keys(this.props.school).length ? (
			<p>Nothing found</p>
		) : (
			<div>
				<SchoolCard
					key={this.props.school.id}
					school={this.props.school}
					isFluid={true}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	let school = {};
	if (state.schools.schools.length) {
		school = state.schools.schools.find(p => p.id == id);
	}

	return { id, school };
};

export default withAuth(connect(mapStateToProps, actions)(SchoolShow));
