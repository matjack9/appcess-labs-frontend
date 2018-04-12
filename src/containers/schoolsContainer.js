import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import SchoolCard from "../components/schoolCard";

class SchoolsContainer extends Component {
	state = {
		fetchSchoolsCompleted: false
	};

	componentDidMount() {
		if (localStorage.getItem("token")) {
			//change
			this.props.fetchSchools();
		} else {
			this.setState({ fetchSchoolsCompleted: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.schools) {
			this.setState({ fetchSchoolsCompleted: true });
		}
	}

	render() {
		const schoolsCards = this.props.schools.map(s => (
			<SchoolCard key={s.id} school={s} />
		));

		return <div>{schoolsCards}</div>;
	}
}

const mapStateToProps = state => ({
	schools: state.schools.schools
});

export default connect(mapStateToProps, actions)(SchoolsContainer);
