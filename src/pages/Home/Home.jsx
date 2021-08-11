import React from "react";
import { Button, Grid } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Link } from "react-router-dom";

export default function Home({ handleLogout, user }) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }} verticalAlign="middle">
          <h2>Welcome! To the Table Top Companion</h2>
          <p>
            Table Top Companion is a site designed to let tabletop Role Playing
            Game players build, save, and share their player character concepts
            and favorites!
            <br />
            <br />
            Sign Up or Login and start building your next adventurer!
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }} verticalAlign="middle">
          <Button.Group size="big">
            <Button>
              <Link to="/create">Create New Character</Link>
            </Button>
            <Button.Or />
            <Button>
              <Link to="/characters">View All Characters</Link>
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
