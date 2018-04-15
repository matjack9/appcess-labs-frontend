import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card } from "semantic-ui-react";

class ContractCard extends Component {
	state = {
		isFluid: false,
		statusInfo: {
			status: "Requested",
			color: "orange"
		}
	};

	componentDidMount() {
		if (this.props.isFluid) {
			this.setState({ isFluid: true });
		}

		const attributes = this.props.contract.attributes;
		switch (attributes.status) {
			case attributes.status.is_completed:
				this.setState({
					statusInfo: {
						...this.state.statusInfo,
						status: "Complete",
						color: "green"
					}
				});
				break;
			case attributes.status.is_in_review:
				this.setState({
					statusInfo: {
						...this.state.statusInfo,
						status: "In Review",
						color: "teal"
					}
				});
				break;
			case attributes.status.is_in_progress:
				this.setState({
					statusInfo: {
						...this.state.statusInfo,
						status: "In Progress",
						color: "yellow"
					}
				});
				break;
			case attributes.status.is_accepted:
				this.setState({
					statusInfo: {
						...this.state.statusInfo,
						status: "Request Accepted",
						color: "grey"
					}
				});
				break;
		}
	}

	handleClick = () => {
		let cardUrl = `/contracts/${this.props.contract.id}`;
		if (this.props.history.location.pathname !== cardUrl) {
			this.props.history.push(cardUrl);
		}
	};

	render() {
		const attributes = this.props.contract.attributes;

		return (
			<Card
				color={this.state.statusInfo.color}
				onClick={this.handleClick}
				fluid={this.state.isFluid}
			>
				<Card.Content>
					<Card.Header>{attributes.school.name} Contract</Card.Header>
					<Card.Meta>
						<span style={{ color: `${this.state.statusInfo.color}` }}>
							<strong>{this.state.statusInfo.status}</strong>
						</span>
					</Card.Meta>
					<Card.Description>
						<label>
							<strong>Deadline:</strong>
						</label>
						<div>{attributes.deadline}</div>
						<label>
							<strong>Started:</strong>
						</label>
						<div>{attributes.start_time}</div>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div>Fee: ${parseInt(attributes.fee).toFixed(2)}</div>
				</Card.Content>
			</Card>
		);
	}
}

export default withRouter(ContractCard);
