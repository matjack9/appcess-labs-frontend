import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { Card, Button, Icon, Segment } from "semantic-ui-react";

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
			if (this.props.currentUser.account_type === "School") {
				this.props.history.push(`/contracts/${this.props.contract.id}/update`);
			} else {
				this.handleDelete();
			}
		} else {
			if (this.props.history.location.pathname !== cardUrl) {
				this.props.history.push(cardUrl);
			}
		}
	};

	handleDelete = () => {
		this.props.deleteContract(
			this.props.contract.id,
			this.props.history,
			this.props.contract.relationships.project.data.id
		);
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
							<span
								style={{
									color: `${this.state.statusInfo.color}`,
									textShadow: "1px 0.5px black"
								}}
							>
								<strong>{this.state.statusInfo.status}</strong>
							</span>
						</Card.Meta>
					) : (
						<Card.Meta>
							<div>
								<strong>{attributes.school.name} Contract</strong>
							</div>
							<span
								style={{
									color: `${this.state.statusInfo.color}`,
									textShadow: "1px 0.5px black"
								}}
							>
								<strong>{this.state.statusInfo.status}</strong>
							</span>
						</Card.Meta>
					)}
					<Card.Description>
						<label>
							<strong>Deadline:</strong>
						</label>
						<div>{convertUTCDateToLocalDate(attributes.deadline)}</div>
						<label>
							<strong>Started:</strong>
						</label>
						<div>{convertUTCDateToLocalDate(attributes.start_time)}</div>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					{attributes.github ? (
						<Card.Description>
							<a target="_blank" href={externalize_link(attributes.github)}>
								{attributes.github} <Icon name="external" />
							</a>
						</Card.Description>
					) : null}
					<Card.Description>
						Fee: ${parseInt(attributes.fee).toFixed(2)}
						{this.props.currentUser.account_type === "School" &&
						this.state.isFluid ? (
							<Card.Description>
								<Button color="blue" onClick={this.handleClick}>
									Update Project
								</Button>
							</Card.Description>
						) : null}
						{this.props.currentUser.account_type === "Company" &&
						this.props.currentUser.is_admin &&
						!attributes.status.is_accepted &&
						this.state.isFluid ? (
							<Card.Description>
								<Button
									onClick={this.handleClick}
									color="red"
									inverted
									fluid
									style={{ margin: "1em" }}
									size="small"
								>
									Cancel Contract
								</Button>
							</Card.Description>
						) : null}
					</Card.Description>
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

function convertUTCDateToLocalDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleString();
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps, actions)(ContractCard));
