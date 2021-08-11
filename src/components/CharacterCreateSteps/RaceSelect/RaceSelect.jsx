import React from "react";
import { Card } from "semantic-ui-react";
import RaceCard from "../RaceSelect/RaceCard";

export default function RaceSelect({ state, setState, races }) {

  function handleSelect(raceId) {
    setState({
      ...state,
      race: raceId,
    });
  }

  return (
    <Card.Group itemsPerRow={3} stackable style={{ width: "80vw" }}>
      {races.map((race) => {
        const isSelected = state.race == race._id;
        return (
          <RaceCard
            race={race}
            key={race._id}
            handleSelect={handleSelect}
            isSelected={isSelected}
          />
        );
      })}
    </Card.Group>
  );
}