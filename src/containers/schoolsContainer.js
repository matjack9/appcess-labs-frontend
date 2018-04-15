import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import SchoolCard from "../components/schoolCard";
import Loading from "../components/loading";
import { Card } from "semantic-ui-react";

class SchoolsContainer extends Component {
	state = {
		fetchSchoolsCompleted: false
	};

	componentDidMount() {
		this.props.fetchSchools();
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

		return (
			<div>
				{!this.state.fetchSchoolsCompleted ? (
					<Loading />
				) : (
					<Card.Group centered>{schoolsCards}</Card.Group>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	schools: state.schools.schools
});

export default connect(mapStateToProps, actions)(SchoolsContainer);
