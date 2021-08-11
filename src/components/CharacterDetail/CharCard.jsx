import React from "react";
import { Image, Card, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function CharCard({ character }) {
  const username =
    character.user && character.user.username
      ? character.user.username
      : "Unknown User";
  return (
    <Card key={character._id} centered>
      <Image
        floated="left"
        size="medium"
        src={`${
          character.photoUrl
            ? character.photoUrl
            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
        }`}
      />
      <Card.Content textAlign="left">
        <Card.Header floated="right">{username}'s Character</Card.Header>
      </Card.Content>
      <Segment>
        <Card.Content>
          <h4>
            Character Name:{" "}
            <Link to={`/characters/${character._id}`} key={character._id}>
              {character.name}
            </Link>
          </h4>
          <h4>Character Race: {character.race.name}</h4>
          <h4>Character Class: {character.class.name}</h4>
        </Card.Content>
        <Segment>
          <Card.Content textAlign="left">
            <h3>Character Ability Scores:</h3>
            <ul>
              <li>Strength: {character.strength}</li>
              <li>Dexterity: {character.dexterity}</li>
              <li>Constitution: {character.constitution}</li>
              <li>Intelligence: {character.intelligence}</li>
              <li>Wisdom: {character.wisdom}</li>
              <li>Charisma: {character.charisma}</li>
            </ul>
          </Card.Content>
        </Segment>
        <Segment>
          <Card.Content>{character.charBio}</Card.Content>
        </Segment>
      </Segment>
    </Card>
  );
}
