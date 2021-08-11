import React from "react";
import { Card, Segment, Button } from "semantic-ui-react";

export default function RaceCard({ race, handleSelect, isSelected }) {
  return (
    <Card key={race._id}>
      <Card.Content textAlign="left">
        <Card.Header floated="left">{race.name}</Card.Header>
        <Button
          onClick={() => {
            handleSelect(race._id);
          }}
          toggle
          active={isSelected}
        >
          <h2>{isSelected ? "Selected" : "Select"}</h2>
        </Button>
      </Card.Content>
      <Card.Content extra textAlign={"left"}>
        <Segment>
          <Card.Description>
            <h3>Alignment: </h3>
            {race.alignment}
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>Age Description: </h3>
            {race.age}
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>Size Description: </h3>
            {race.size_description}
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>Language Description: </h3>
            {race.language_desc}
          </Card.Description>
        </Segment>
      </Card.Content>
    </Card>
  );
}
