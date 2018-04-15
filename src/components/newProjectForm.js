import React, { Component } from "react";
import withAuth from "../hocs/withAuth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import {
	Icon,
	Button,
	Form,
	Input,
	TextArea,
	Grid,
	Header,
	Segment
} from "semantic-ui-react";

class NewProjectForm extends Component {
	state = {
		error: false,
		fields: {
			name: "",
			description: "",
			user_stories: "",
			requirements: ""
		}
	};

	handleChange = e => {
		const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
		this.setState({ fields: newFields });
	};

	handleSubmit = e => {
		e.preventDefault();
		const {
			fields: { name, description, user_stories, requirements }
		} = this.state;
		this.props.createProject(
			name,
			description,
			user_stories,
			requirements,
			this.props.history
		);
	};

	render() {
		return (
			<div className="new-project-form">
				<style>{`
          body > div,
          body > div > div,
          body > div > div > div.new-project-form {
            height: 100%;
          }
        `}</style>
				<Grid
					textAlign="center"
					style={{ height: "100%" }}
					verticalAlign="middle"
				>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="black" textAlign="center">
							<Icon name="idea" />New Project
						</Header>
						<Form size="large" onSubmit={this.handleSubmit}>
							<Segment>
								<Form.Field required>
									<label style={{ textAlign: "left" }}>Name</label>
									<Input
										fluid
										placeholder="Project name"
										name="name"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field required>
									<label style={{ textAlign: "left" }}>Description</label>
									<TextArea
										required
										placeholder="Project description"
										name="description"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field required>
									<label style={{ textAlign: "left" }}>User stories</label>
									<TextArea
										required
										placeholder="Stories"
										name="user_stories"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field required>
									<label style={{ textAlign: "left" }}>Requirements</label>
									<TextArea
										required
										placeholder="Requirements"
										name="requirements"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Button color="green" fluid size="large">
									Create
								</Button>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default withAuth(withRouter(connect(null, actions)(NewProjectForm)));
