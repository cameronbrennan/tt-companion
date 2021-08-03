import React from "react";
import { Image, Grid, Segment } from "semantic-ui-react";

export default function UserBio({ user }) {
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              user.photoUrl
                ? user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            } `}
            avatar
            size="small"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical>
            <h3>{user.username}</h3>
          </Segment>
          <Segment vertical>
            <h3>
              {user.firstname} {user.lastname}
            </h3>
          </Segment>
          <Segment vertical>
            <h3>{user.email}</h3>
          </Segment>
          <Segment>
            <span><h3>Bio: {user.bio}</h3></span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
