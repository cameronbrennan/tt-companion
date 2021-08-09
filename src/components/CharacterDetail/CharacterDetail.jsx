import React from "react";
import { Image, Grid, Segment } from "semantic-ui-react";

export default function CharacterDetail({ character }) {
  const username =
    character.user && character.user.username
      ? character.user.username
      : "unknown user";
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              character.photoUrl
                ? character.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            } `}
            avatar
            size="medium"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ width: "80vw" }}>
          <Segment vertical>
            <h2>{`${username}'s Character`}</h2>
          </Segment>
          <Segment vertical>
            <h3>{character.name}</h3>
          </Segment>
          <Segment vertical>
            <h3>{character.race.name}</h3>
          </Segment>
          <Segment vertical>
            <h3>{character.class.name}</h3>
          </Segment>
          <Segment>
            <span>
              <h3>Character Bio: {character.charBio}</h3>
            </span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
