import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function Home({ handleLogout, user }) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <h2>This is where the page content will go!</h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
