import React from "react";
import { Segment, Grid, Header, Container, List } from "semantic-ui-react";
import "./footer.css";

const Footer = () => {
	return (
		<Segment
			className="footer-container"
			inverted
			vertical
			style={{ padding: "5em 0em" }}
		>
			<Container>
				<Grid divided inverted stackable>
					<Grid.Row>
						<Grid.Column width={3}>
							<Header inverted as="h4" content="About Me" />
							<List link inverted>
								<a target="_blank" href="https://github.com/matjack9">
									<List.Item>Github</List.Item>
								</a>
								<a target="_blank" href="https://www.linkedin.com/in/matjack/">
									<List.Item>LinkedIn</List.Item>
								</a>
							</List>
						</Grid.Column>
						<Grid.Column width={3}>
							<Header inverted as="h4" content="Services" />
							<List link inverted>
								<a href="/">
									<List.Item>Home</List.Item>
								</a>
								<a href="/sign_up">
									<List.Item>Join</List.Item>
								</a>
								<a href="/login">
									<List.Item>Log In</List.Item>
								</a>
								<a href="/my_account">
									<List.Item>My Account</List.Item>
								</a>
							</List>
						</Grid.Column>
						<Grid.Column width={7}>
							<Header as="h4" inverted>
								Appcess Labs
							</Header>
							<p>
								Affordable web development projects and busy bootcamp students.
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Segment>
	);
};

export default Footer;
