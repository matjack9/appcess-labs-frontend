import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Button, Icon } from "semantic-ui-react";

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
		if (attributes) {
			switch (true) {
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
	}

	handleClick = e => {
		let cardUrl = `/contracts/${this.props.contract.id}`;
		if (e.target.classList.contains("button")) {
			this.props.history.push(`/contracts/${this.props.contract.id}/update`);
		} else {
			if (this.props.history.location.pathname !== cardUrl) {
				this.props.history.push(cardUrl);
			}
		}
	};

	render() {
		const attributes = this.props.contract.attributes;

		return attributes ? (
			<Card
				color={this.state.statusInfo.color}
				onClick={this.handleClick}
				fluid={this.state.isFluid}
			>
				<Card.Content>
					{this.props.currentUser.account_type === "Company" ? (
						<Card.Header>{attributes.school.name} Contract</Card.Header>
					) : (
						<Card.Header>{attributes.project.name} Project</Card.Header>
					)}
					{this.props.currentUser.account_type === "Company" ? (
						<Card.Meta>
							<div>
								<strong>{attributes.project.name} Project</strong>
							</div>
							<span style={{ color: `${this.state.statusInfo.color}` }}>
								<strong>{this.state.statusInfo.status}</strong>
							</span>
						</Card.Meta>
					) : (
						<Card.Meta>
							<div>
								<strong>{attributes.school.name} Contract</strong>
							</div>
							<span style={{ color: `${this.state.statusInfo.color}` }}>
								<strong>{this.state.statusInfo.status}</strong>
							</span>
						</Card.Meta>
					)}
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
					{attributes.github ? (
						<div>
							<a target="_blank" href={externalize_link(attributes.github)}>
								{attributes.github} <Icon name="external" />
							</a>
						</div>
					) : null}
					<div>
						Fee: ${parseInt(attributes.fee).toFixed(2)}
						{this.props.currentUser.account_type === "School" &&
						this.state.isFluid ? (
							<div>
								<Button
									color="blue"
									onClick={this.handleClick}
									style={{ marginTop: ".5em" }}
								>
									Update Project
								</Button>
							</div>
						) : null}
					</div>
				</Card.Content>
			</Card>
		) : null;
	}
}

function externalize_link(url) {
	if (url.startsWith("http")) {
		return url;
	} else {
		return "http://" + url;
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(ContractCard));
