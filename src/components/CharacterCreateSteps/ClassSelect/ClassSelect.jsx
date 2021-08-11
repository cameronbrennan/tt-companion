import React from "react";
import { Card } from "semantic-ui-react";
import ClassCard from "../ClassSelect/ClassCard";

export default function ClassSelect({ state, setState, classes }) {
  function handleSelect(classId) {
    setState({
      ...state,
      class: classId,
    });
  }

  return (
    <Card.Group itemsPerRow={3} stackable style={{ width: "90vw" }}>
      {classes.map((classObj) => {
        const isSelected = state.class === classObj._id;
        return (
          <ClassCard
            classObj={classObj}
            key={classObj._id}
            handleSelect={handleSelect}
            isSelected={isSelected}
          />
        );
      })}
    </Card.Group>
  );
}
