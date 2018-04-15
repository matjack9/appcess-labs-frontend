import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

class NewContractCard extends Component {
	handleClick = () => {
		this.props.history.push(`/projects/${this.props.projectId}/new_request`);
	};

	render() {
		return (
			<Card color="orange" onClick={this.handleClick}>
				<Card.Content>
					<Card.Header>
						<Icon name="send" color="orange" /> Request Work
					</Card.Header>
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	projectId: ownProps.match.params.id
});

export default withRouter(connect(mapStateToProps)(NewContractCard));
